import { getDb, saveDb } from './_db.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key',
  'Access-Control-Allow-Credentials': 'true',
};

const DEFAULT_ADMIN_KEY = process.env.ADMIN_KEY || 'mdcat2025admin';

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = req.headers['x-admin-key'] || req.query.key || (req.body && req.body.key);
  if (!key || key !== DEFAULT_ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin key' });
  }

  try {
    const db = await getDb();

    if (req.method === 'POST') {
      const action = req.body?.action;
      if (action === 'clear-scores') {
        db.scores = [];
        await saveDb(db);
        return res.status(200).json({ ok: true, message: 'All scores cleared.' });
      }
      if (action === 'delete-user' && req.body?.userId) {
        delete db.users[req.body.userId];
        await saveDb(db);
        return res.status(200).json({ ok: true, message: 'User deleted.' });
      }
    }

    const scores = db.scores || [];
    const usersList = Object.values(db.users || {}).map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      targetCollege: u.targetCollege,
      createdAt: u.createdAt,
      lastLogin: u.lastLogin,
      quizzes: u.stats?.quizzes || 0,
      avgPct: u.stats?.avgPct || 0,
      correctAnswers: u.stats?.correctAnswers || 0,
      totalQuestions: u.stats?.totalQuestions || 0,
    }));

    const totalAttempts = scores.length;
    const avgPct = totalAttempts > 0
      ? Math.round(scores.reduce((sum, s) => sum + (s.pct || 0), 0) / totalAttempts)
      : 0;

    const subjects = ['Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'];
    const bySubject = subjects.map(sub => {
      const subScores = scores.filter(s => s.subject === sub);
      const subAvg = subScores.length > 0
        ? Math.round(subScores.reduce((acc, s) => acc + s.pct, 0) / subScores.length)
        : 0;
      return { subject: sub, attempts: subScores.length, avgPct: subAvg };
    });

    const days = 7;
    const activityMap = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      activityMap[d.toISOString().slice(0, 10)] = 0;
    }
    scores.forEach(s => {
      const d = new Date(s.createdAt || s.ts || Date.now());
      const iso = d.toISOString().slice(0, 10);
      if (activityMap[iso] !== undefined) activityMap[iso]++;
    });
    const activity = Object.entries(activityMap).map(([date, count]) => ({ date, count }));

    const sorted = [...scores].sort((a, b) => b.pct - a.pct || a.timeSeconds - b.timeSeconds);
    const topPerformers = sorted.slice(0, 25).map(s => ({
      name: s.userName || s.name,
      pct: s.pct,
      subject: s.subject || 'All',
      year: s.paper || s.year || 'All',
    }));

    const recentScores = [...scores].sort((a, b) => (b.createdAt || b.ts || 0) - (a.createdAt || a.ts || 0)).slice(0, 50).map(s => ({
      name: s.userName || s.name,
      score: s.score,
      total: s.total,
      subject: s.subject || 'All',
      paper: s.paper || s.year || 'All',
      timeSeconds: s.timeSeconds || 0,
      date: new Date(s.createdAt || s.ts || Date.now()).toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    return res.status(200).json({
      summary: {
        totalAttempts,
        uniqueUsers: usersList.length || new Set(scores.map(s => (s.userName || s.name).toLowerCase())).size,
        registeredStudents: usersList.length,
        avgPct,
      },
      bySubject,
      activity,
      users: usersList,
      topPerformers,
      recentScores,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Admin error: ' + err.message });
  }
}