import { getDb, saveDb, hashPassword, comparePassword, createToken, setSessionCookie, clearSessionCookie, getAuthUser } from './_db.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

function sanitizeUser(u) {
  if (!u) return null;
  const { passwordHash, ...safe } = u;
  return safe;
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  const action = req.query.action || (req.body && req.body.action);

  try {
    if (req.method === 'GET' || action === 'me') {
      const user = await getAuthUser(req);
      if (!user) return res.status(200).json({ authenticated: false, user: null });
      const db = await getDb();
      const userScores = (db.scores || [])
        .filter(s => s.userId === user.id || s.userName.toLowerCase() === user.name.toLowerCase())
        .sort((a, b) => (b.createdAt || b.ts || 0) - (a.createdAt || a.ts || 0));

      return res.status(200).json({
        authenticated: true,
        user: sanitizeUser(user),
        history: userScores.slice(0, 30),
      });
    }

    if (action === 'signup') {
      const { name, email, password, targetCollege } = req.body || {};
      if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required.' });
      const cleanEmail = String(email).trim().toLowerCase();
      if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

      const db = await getDb();
      const existing = Object.values(db.users || {}).find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) return res.status(409).json({ error: 'Email is already registered. Please log in.' });

      const userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const passwordHash = await hashPassword(password);
      const newUser = {
        id: userId,
        name: String(name).trim().slice(0, 50),
        email: cleanEmail,
        passwordHash,
        targetCollege: String(targetCollege || 'King Edward Medical University').trim().slice(0, 80),
        createdAt: Date.now(),
        lastLogin: Date.now(),
        stats: { quizzes: 0, totalQuestions: 0, correctAnswers: 0, avgPct: 0, subjectMastery: {} },
      };

      db.users[userId] = newUser;
      await saveDb(db);
      const token = createToken(newUser);
      setSessionCookie(res, token);
      return res.status(201).json({ ok: true, user: sanitizeUser(newUser), token });
    }

    if (action === 'login') {
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
      const cleanEmail = String(email).trim().toLowerCase();
      const db = await getDb();
      const user = Object.values(db.users || {}).find(u => u.email.toLowerCase() === cleanEmail);
      if (!user) return res.status(401).json({ error: 'No account found with this email.' });

      const match = await comparePassword(password, user.passwordHash);
      if (!match) return res.status(401).json({ error: 'Incorrect password.' });

      user.lastLogin = Date.now();
      await saveDb(db);
      const token = createToken(user);
      setSessionCookie(res, token);
      return res.status(200).json({ ok: true, user: sanitizeUser(user), token });
    }

    if (action === 'logout') {
      clearSessionCookie(res);
      return res.status(200).json({ ok: true, message: 'Logged out successfully.' });
    }

    return res.status(400).json({ error: 'Invalid auth request.' });
  } catch (err) {
    return res.status(500).json({ error: 'Auth error: ' + err.message });
  }
}