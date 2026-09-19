import { promisify } from 'node:util';
import { createCipheriv, createDecipheriv, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { list, put } from '@vercel/blob';

const scrypt = promisify(scryptCallback);
const TMP_DB_FILE = '/tmp/mdcat-db.json';
const BLOB_PATH = 'mdcat-prep/db.json';
const JWT_SECRET = process.env.JWT_SECRET || 'mdcat-prep-local-secret';
const DB_KEY = createHmac('sha256', JWT_SECRET).update('mdcat-prep-db').digest();

function emptyDb() {
  return { users: {}, scores: [] };
}

function encodeDb(db) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', DB_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(db), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64');
}

function decodeDb(value) {
  const payload = Buffer.from(value, 'base64');
  const decipher = createDecipheriv('aes-256-gcm', DB_KEY, payload.subarray(0, 12));
  decipher.setAuthTag(payload.subarray(12, 28));
  return JSON.parse(Buffer.concat([decipher.update(payload.subarray(28)), decipher.final()]).toString('utf8'));
}

async function loadBlobDb() {
  const result = await list({ prefix: BLOB_PATH, limit: 1 });
  const blob = result.blobs[0];
  if (!blob) return null;
  const response = await fetch(`${blob.url}?t=${Date.now()}`);
  if (!response.ok) throw new Error(`Blob read failed with HTTP ${response.status}`);
  return decodeDb(await response.text());
}

export async function getDb() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      return (await loadBlobDb()) || emptyDb();
    } catch (error) {
      console.error('Vercel Blob read failed:', error.message);
    }
  }

  try {
    return JSON.parse(await readFile(TMP_DB_FILE, 'utf8'));
  } catch {
    return emptyDb();
  }
}

export async function saveDb(db) {
  const encoded = encodeDb(db);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_PATH, encoded, { access: 'public', addRandomSuffix: false, allowOverwrite: true });
    return;
  }

  await mkdir('/tmp', { recursive: true });
  await writeFile(TMP_DB_FILE, JSON.stringify(db), 'utf8');
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = (await scrypt(password, salt, 64)).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export async function comparePassword(password, stored) {
  try {
    const [, salt, expectedHex] = stored.split('$');
    const actual = await scrypt(password, salt, 64);
    const expected = Buffer.from(expectedHex, 'hex');
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

function base64Url(value) {
  return Buffer.from(value).toString('base64url');
}

export function createToken(user) {
  const header = base64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64Url(JSON.stringify({ sub: user.id, name: user.name, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 }));
  const signature = createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

function verifyToken(token) {
  try {
    const [header, payload, signature] = token.split('.');
    const expected = createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return claims.exp > Math.floor(Date.now() / 1000) ? claims : null;
  } catch {
    return null;
  }
}

function getToken(req) {
  const auth = req.headers.authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : req.headers.cookie?.match(/mdcat_session=([^;]+)/)?.[1];
}

export async function getAuthUser(req) {
  const claims = verifyToken(getToken(req) || '');
  if (!claims) return null;
  const db = await getDb();
  return db.users?.[claims.sub] || null;
}

export function setSessionCookie(res, token) {
  res.setHeader('Set-Cookie', `mdcat_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'mdcat_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
}
