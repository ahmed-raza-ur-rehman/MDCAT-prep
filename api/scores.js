import { getDb, saveDb, getAuthUser } from './_db.js';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const db = await getDb();

    if (req.method === 'POST') {
      const body = req.body ?? {};
      const { name, score, total, subject, year, paper, timeSeconds, mode, breakdown } = body;
      if (score == null || total == null) return res.status(400).json({ error: 'score and total required' });

      const authUser = await getAuthUser(req);
      const studentName = (authUser ? authUser.name : (name || 'Anonymous Student')).trim().slice(0, 40);
      const studentId = authUser ? authUser.id : null;
      const numScore = Number(score);
      const numTotal = Number(total);
      const pct = numTotal > 0 ? Math.round((numScore / numTotal) * 100) : 0;

      const entry = {
        id: `sc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        userId: studentId,
        userName: studentName,
        name: studentName,
        score: numScore,
        total: numTotal,
        pct,
        subject: subject || 'All',
        year: year || 'All',
        paper: paper || 'All',
        timeSeconds: Number(timeSeconds) || 0,
        mode: mode || 'standard',
        createdAt: Date.now(),
        ts: Date.now(),
      };

      db.scores = db.scores || [];
      db.scores.push(entry);

      if (studentId && db.users[studentId]) {
        const u = db.users[studentId];
        u.stats = u.stats || { quizzes: 0, totalQuestions: 0, correctAnswers: 0, avgPct: 0, subjectMastery: {} };
        u.stats.quizzes = (u.stats.quizzes || 0) + 1;
        u.stats.totalQuestions = (u.stats.totalQuestions || 0) + numTotal;
        u.stats.correctAnswers = (u.stats.correctAnswers || 0) + numScore;
        u.stats.avgPct = Math.round((u.stats.correctAnswers / Math.max(1, u.stats.totalQuestions)) * 100);

        if (breakdown && typeof breakdown === 'object') {
          u.stats.subjectMastery = u.stats.subjectMastery || {};
          Object.entries(breakdown).forEach(([subj, data]) => {
            if (!u.stats.subjectMastery[subj]) u.stats.subjectMastery[subj] = { total: 0, correct: 0 };
            u.stats.subjectMastery[subj].total += (data.total || 0);
            u.stats.subjectMastery[subj].correct += (data.correct || 0);
          });
        }
      }

      await saveDb(db);

      const sorted = [...db.scores].sort((a, b) => b.pct - a.pct || a.timeSeconds - b.timeSeconds);
      const rankIndex = sorted.findIndex(s => s.id === entry.id);
      const rank = rankIndex !== -1 ? rankIndex + 1 : sorted.length;
      const percentile = sorted.length > 1 ? Math.round(((sorted.length - rank) / sorted.length) * 100) : 100;

      return res.status(201).json({
        ok: true,
        entry,
        rank,
        percentile,
        totalParticipants: sorted.length,
      });
    }

    if (req.method === 'GET') {
      const { user, subject, year, limit = '200' } = req.query;
      let scores = [...(db.scores || [])];

      if (subject && subject !== 'All') scores = scores.filter(s => s.subject === subject);
      if (year && year !== 'All') scores = scores.filter(s => String(s.year) === String(year));
      if (user) {
        const u = String(user).toLowerCase();
        scores = scores.filter(s => (s.userName || s.name || '').toLowerCase() === u || s.userId === user);
      }

      scores.sort((a, b) => b.pct - a.pct || a.timeSeconds - b.timeSeconds);
      const maxLimit = Math.min(parseInt(limit, 10) || 200, 500);
      const paginated = scores.slice(0, maxLimit).map(s => ({
        ...s,
        name: s.userName || s.name || 'Anonymous',
        userName: s.userName || s.name || 'Anonymous',
      }));

      const totalAttempts = db.scores?.length || 0;
      const uniqueNames = new Set((db.scores || []).map(s => (s.userName || s.name || '').toLowerCase()));
      const avgPercentage = totalAttempts > 0 ? Math.round(db.scores.reduce((acc, s) => acc + (s.pct || 0), 0) / totalAttempts) : 0;

      return res.status(200).json({
        scores: paginated,
        totalAttempts,
        uniqueStudents: uniqueNames.size,
        avgPercentage,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: 'Scores API error: ' + err.message });
  }
}