import { PREP_DATA } from './prep-data.js';

// IndexedDB Helper for Persistent 2,125 MCQ Storage
const IDB_NAME = 'MDCAT_PREP_DB';
const IDB_STORE = 'questions_store';
const IDB_KEY = 'all_questions_v1';

function openIdb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getIdbQuestions() {
  try {
    const db = await openIdb();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const getReq = tx.objectStore(IDB_STORE).get(IDB_KEY);
      getReq.onsuccess = () => resolve(getReq.result || null);
      getReq.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function setIdbQuestions(data) {
  try {
    const db = await openIdb();
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(data, IDB_KEY);
  } catch (e) {
    console.warn('IDB write failed:', e);
  }
}

const state = {
  user: {
    authenticated: false,
    user: null,
    history: [],
  },
  config: {
    subject: 'All',
    year: 'All',
    paper: 'All',
    count: 30,
    timerType: 'none',
    timerTotalMins: 30,
    timerPerQSecs: 45,
    reviewMode: 'after-quiz',
    shuffle: true,
    playerName: '',
  },
  quiz: {
    questions: [],
    current: 0,
    answers: [],
    flags: new Set(),
    startTime: null,
    elapsedSeconds: 0,
    timerRemaining: 0,
    timerInterval: null,
    totalTimerInterval: null,
    totalTimerRemaining: 0,
    breakdown: {},
  },
  lb: {
    scores: [],
    loaded: false,
  },
  admin: {
    key: '',
    data: null,
  },
  prep: {
    currentTab: 'chapters',
    chapterSubject: 'All',
    search: '',
  },
};

let _questions = [];
let _questionsLoaded = false;
let _questionsLoadPromise = null;

const ALL_Q = () => _questions;
function _questionsReady() {
  if (_questions.length === 0 && window.QUESTIONS && window.QUESTIONS.length > 0) {
    _questions = window.QUESTIONS;
  }
  return _questions.length > 0;
}

async function ensureQuestions() {
  if (_questionsReady()) return _questions;
  if (_questionsLoadPromise) return _questionsLoadPromise;

  _questionsLoadPromise = (async () => {
    // 1. Memory Check
    if (window.QUESTIONS && window.QUESTIONS.length > 0) {
      _questions = window.QUESTIONS;
      _questionsLoaded = true;
      return _questions;
    }

    // 2. IndexedDB Check
    const cached = await getIdbQuestions();
    if (cached && Array.isArray(cached) && cached.length > 0) {
      _questions = cached;
      window.QUESTIONS = cached;
      window.MDCAT_QUESTIONS = cached;
      _questionsLoaded = true;
      return cached;
    }

    // 3. Network Fetch
    try {
      const res = await fetch('data/questions.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      _questions = data;
      window.QUESTIONS = data;
      window.MDCAT_QUESTIONS = data;
      _questionsLoaded = true;
      setIdbQuestions(data); // Write to cache
      return data;
    } catch (err) {
      console.error('Failed to load questions.json:', err);
      return [];
    }
  })();

  return _questionsLoadPromise;
}

const VIEWS = ['home', 'config', 'quiz', 'results', 'prep', 'leaderboard', 'admin'];

function showView(name) {
  VIEWS.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (!el) return;
    const isTarget = v === name;
    el.classList.toggle('active', isTarget);
    if (isTarget) {
      el.classList.remove('entering');
      void el.offsetWidth;
      el.classList.add('entering');
    }
  });

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === name);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'leaderboard') loadLeaderboard();
  if (name === 'home') loadMiniLeaderboard();
  if (name === 'prep') renderPrepContent();
  if (name === 'config') updateConfigSummary();
}

let toastTimer = null;
function toast(msg, duration = 3000) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = String(str || '');
  return d.innerHTML;
}

function formatScientific(raw) {
  if (raw === null || raw === undefined) return '';
  let str = String(raw);

  if (window.katex) {
    str = str.replace(/\$\$([\s\S]+?)\$\$/g, (m, expr) => {
      try {
        return `<div class="katex-block">${window.katex.renderToString(expr.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch { return m; }
    });
    str = str.replace(/\$([^\$\n]+?)\$/g, (m, expr) => {
      try {
        return window.katex.renderToString(expr.trim(), { displayMode: false, throwOnError: false });
      } catch { return m; }
    });
  }

  const hasTags = /<[a-z][\s\S]*>/i.test(str);
  if (!hasTags) {
    str = escHtml(str);
  }

  str = str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
           .replace(/\*([^\*]+?)\*/g, '<em>$1</em>')
           .replace(/`([^`]+?)`/g, '<code class="code-badge">$1</code>')
           .replace(/([a-zA-Z0-9\)])\^([0-9\+\-]+)/g, '$1<sup>$2</sup>')
           .replace(/([a-zA-Z0-9\)])\^([a-zA-Z])/g, '$1<sup>$2</sup>')
           .replace(/\b(mol|J|kg|m|s|N|C|K|atm|dm3|cm3)-1\b/g, '$1⁻¹')
           .replace(/\b(mol|J|kg|m|s|N|C|K|atm|dm3|cm3)-2\b/g, '$1⁻²')
           .replace(/\b(mol|J|kg|m|s|N|C|K|atm|dm3|cm3)-3\b/g, '$1⁻³')
           .replace(/\bH2O\b/g, 'H₂O')
           .replace(/\bCO2\b/g, 'CO₂')
           .replace(/\bNH3\b/g, 'NH₃')
           .replace(/\bH2SO4\b/g, 'H₂SO₄')
           .replace(/\bHNO3\b/g, 'HNO₃')
           .replace(/\bKMnO4\b/g, 'KMnO₄')
           .replace(/\bCH4\b/g, 'CH₄')
           .replace(/\bC6H12O6\b/g, 'C₆H₁₂O₆')
           .replace(/\bCaCO3\b/g, 'CaCO₃')
           .replace(/\bO2\b/g, 'O₂')
           .replace(/\bN2\b/g, 'N₂')
           .replace(/\bCl2\b/g, 'Cl₂')
           .replace(/\bH2\b/g, 'H₂')
           .replace(/\bsp3\b/g, 'sp³')
           .replace(/\bsp2\b/g, 'sp²');

  return str;
}

// Debounce helper for inputs
function debounce(fn, delay = 160) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ═══════════════════════════════════════════════════════════════ */
/* AUTHENTICATION CONTROLLER */
/* ═══════════════════════════════════════════════════════════════ */
async function initAuth() {
  const authModal = document.getElementById('auth-modal');
  const profileModal = document.getElementById('profile-modal');

  document.getElementById('btn-open-auth')?.addEventListener('click', () => { authModal.hidden = false; });
  document.getElementById('btn-close-auth')?.addEventListener('click', () => { authModal.hidden = true; });
  document.getElementById('btn-user-profile')?.addEventListener('click', () => {
    renderProfileModal();
    profileModal.hidden = false;
  });
  document.getElementById('btn-close-profile')?.addEventListener('click', () => { profileModal.hidden = true; });

  [authModal, profileModal].forEach(modal => {
    modal?.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });
  });

  document.getElementById('tab-login')?.addEventListener('click', () => {
    document.getElementById('tab-login').classList.add('active');
    document.getElementById('tab-signup').classList.remove('active');
    document.getElementById('form-login').hidden = false;
    document.getElementById('form-signup').hidden = true;
  });

  document.getElementById('tab-signup')?.addEventListener('click', () => {
    document.getElementById('tab-signup').classList.add('active');
    document.getElementById('tab-login').classList.remove('active');
    document.getElementById('form-signup').hidden = false;
    document.getElementById('form-login').hidden = true;
  });

  document.getElementById('btn-guest-login')?.addEventListener('click', () => {
    authModal.hidden = true;
    toast('Guest mode active. Scores save to your local browser history.');
  });

  document.getElementById('form-login')?.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    errEl.textContent = '';
    try {
      const res = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      state.user.authenticated = true;
      state.user.user = data.user;
      authModal.hidden = true;
      updateAuthUI();
      toast(`Welcome back, ${data.user.name}! 👋`);
    } catch (err) {
      errEl.textContent = `❌ ${err.message}`;
    }
  });

  document.getElementById('form-signup')?.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const targetCollege = document.getElementById('signup-target').value;
    const errEl = document.getElementById('signup-error');
    errEl.textContent = '';
    try {
      const res = await fetch('/api/auth?action=signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, targetCollege }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      state.user.authenticated = true;
      state.user.user = data.user;
      authModal.hidden = true;
      updateAuthUI();
      toast(`Account created! Best of luck, ${data.user.name}! 🎯`);
    } catch (err) {
      errEl.textContent = `❌ ${err.message}`;
    }
  });

  document.getElementById('btn-logout')?.addEventListener('click', async () => {
    try { await fetch('/api/auth?action=logout', { method: 'POST' }); } catch {}
    state.user.authenticated = false;
    state.user.user = null;
    state.user.history = [];
    profileModal.hidden = true;
    updateAuthUI();
    toast('Logged out successfully.');
  });

  checkCurrentSession();
}

async function checkCurrentSession() {
  try {
    const res = await fetch('/api/auth?action=me');
    if (!res.ok) return;
    const data = await res.json();
    if (data.authenticated && data.user) {
      state.user.authenticated = true;
      state.user.user = data.user;
      state.user.history = data.history || [];
      updateAuthUI();
    }
  } catch {}
}

function updateAuthUI() {
  const btnAuth = document.getElementById('btn-open-auth');
  const btnProfile = document.getElementById('btn-user-profile');
  const avatarEl = document.getElementById('user-nav-avatar');
  const nameEl = document.getElementById('user-nav-name');
  const playerNameInput = document.getElementById('player-name');

  if (state.user.authenticated && state.user.user) {
    const u = state.user.user;
    btnAuth.hidden = true;
    btnProfile.hidden = false;
    avatarEl.textContent = u.name.charAt(0).toUpperCase();
    nameEl.textContent = u.name.split(' ')[0];
    if (playerNameInput) playerNameInput.value = u.name;
    state.config.playerName = u.name;
  } else {
    btnAuth.hidden = false;
    btnProfile.hidden = true;
    const localSaved = localStorage.getItem('mdcat_player_name') || '';
    if (playerNameInput && !playerNameInput.value) playerNameInput.value = localSaved;
    state.config.playerName = localSaved;
  }
}

function renderProfileModal() {
  const u = state.user.user;
  if (!u) return;
  document.getElementById('prof-avatar').textContent = u.name.charAt(0).toUpperCase();
  document.getElementById('prof-name').textContent = u.name;
  document.getElementById('prof-email').textContent = u.email;
  document.getElementById('prof-college').textContent = u.targetCollege || 'Target Medical College';

  const stats = u.stats || {};
  document.getElementById('prof-quizzes').textContent = stats.quizzes || 0;
  document.getElementById('prof-accuracy').textContent = (stats.avgPct || 0) + '%';
  document.getElementById('prof-total-q').textContent = stats.totalQuestions || 0;

  const masteryContainer = document.getElementById('prof-mastery-bars');
  const subjects = ['Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'];
  const mastery = stats.subjectMastery || {};
  masteryContainer.innerHTML = subjects.map(sub => {
    const data = mastery[sub] || { total: 0, correct: 0 };
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    return `
      <div class="mastery-bar-row">
        <div class="mastery-bar-info">
          <span>${sub}</span>
          <span><strong>${pct}%</strong> (${data.correct}/${data.total})</span>
        </div>
        <div class="mastery-bar-track">
          <div class="mastery-bar-fill" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');

  const historyContainer = document.getElementById('prof-history-list');
  const history = state.user.history || [];
  if (history.length === 0) {
    historyContainer.innerHTML = '<div style="color:var(--text3);font-size:12px;text-align:center;padding:12px;">No quiz history yet. Complete a test to see logs!</div>';
  } else {
    historyContainer.innerHTML = history.slice(0, 10).map(item => {
      const dateStr = new Date(item.createdAt || item.ts || Date.now()).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
      return `
        <div class="profile-history-item">
          <div>
            <strong>${item.subject}</strong> · ${item.paper || item.year || ''}
            <div style="color:var(--text3);font-size:11px;">${dateStr}</div>
          </div>
          <div class="profile-history-score">${item.pct}% (${item.score}/${item.total})</div>
        </div>
      `;
    }).join('');
  }
}

/* ═══════════════════════════════════════════════════════════════ */
/* QUIZ CONFIGURATION CONTROLLER */
/* ═══════════════════════════════════════════════════════════════ */
function initChipGroup(groupId, onChange) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      onChange(chip.dataset.val);
    });
  });
}

function initConfig() {
  initChipGroup('filter-subject', v => { state.config.subject = v; updateConfigSummary(); });
  initChipGroup('filter-year', v => { state.config.year = v; updateConfigSummary(); });
  initChipGroup('filter-paper', v => { state.config.paper = v; updateConfigSummary(); });
  
  initChipGroup('review-mode', v => {
    state.config.reviewMode = v;
    const desc = document.getElementById('review-mode-desc');
    if (desc) {
      desc.textContent = v === 'after-question' 
        ? 'Study mode: get immediate feedback with explanation & citation after choosing each option.'
        : 'Realistic mock test: choices are recorded, results and explanations are revealed upon final submission.';
    }
  });

  initChipGroup('timer-type', v => {
    state.config.timerType = v;
    document.getElementById('sub-timer-total').hidden = (v !== 'total');
    document.getElementById('sub-timer-per-q').hidden = (v !== 'per-question');
    document.getElementById('sub-timer-tiered').hidden = (v !== 'tiered');
    updateConfigSummary();
  });

  document.querySelectorAll('#timer-total-val .chip-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#timer-total-val .chip-sm').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.config.timerTotalMins = parseInt(btn.dataset.mins, 10);
      updateConfigSummary();
    });
  });

  document.querySelectorAll('#timer-per-q-val .chip-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#timer-per-q-val .chip-sm').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.config.timerPerQSecs = parseInt(btn.dataset.secs, 10);
      updateConfigSummary();
    });
  });

  document.querySelectorAll('#count-presets .chip-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#count-presets .chip-sm').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const count = parseInt(btn.dataset.count, 10);
      const slider = document.getElementById('q-count');
      slider.value = count;
      document.getElementById('q-count-val').textContent = count;
      document.getElementById('q-count-badge').textContent = `${count} MCQs`;
      state.config.count = count;
      updateConfigSummary();
    });
  });

  const slider = document.getElementById('q-count');
  const sliderVal = document.getElementById('q-count-val');
  slider?.addEventListener('input', () => {
    state.config.count = parseInt(slider.value, 10);
    sliderVal.textContent = slider.value;
    document.getElementById('q-count-badge').textContent = `${slider.value} MCQs`;
    document.querySelectorAll('#count-presets .chip-sm').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.count, 10) === state.config.count);
    });
    updateConfigSummary();
  });

  document.getElementById('opt-shuffle')?.addEventListener('change', e => {
    state.config.shuffle = e.target.checked;
  });

  document.getElementById('player-name')?.addEventListener('input', e => {
    state.config.playerName = e.target.value.trim();
    localStorage.setItem('mdcat_player_name', state.config.playerName);
  });

  document.getElementById('btn-launch-quiz')?.addEventListener('click', launchQuiz);
  updateConfigSummary();
}

function filteredQuestions(cfg = state.config) {
  const all = ALL_Q();
  if (!all || !all.length) return [];
  return all.filter(q => {
    if (cfg.subject && cfg.subject !== 'All' && q.subject !== cfg.subject) return false;
    if (cfg.year && cfg.year !== 'All') {
      const qYear = String(q.year || (q.shortTitle || q.paperTitle || '').match(/\b(202[0-5])\b/)?.[1] || '');
      if (qYear !== String(cfg.year)) return false;
    }
    if (cfg.paper && cfg.paper !== 'All') {
      const target = cfg.paper.toUpperCase();
      const combined = `${q.shortTitle || ''} ${q.paperTitle || ''} ${q.authority || ''} ${q.province || ''}`.toUpperCase();
      if (!combined.includes(target)) return false;
    }
    return true;
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function updateConfigSummary() {
  const pool = filteredQuestions();
  const available = pool.length;
  const count = Math.min(state.config.count, Math.max(available, 5));

  const sliderEl = document.getElementById('q-count');
  if (sliderEl) {
    sliderEl.max = Math.max(available, 5);
    if (state.config.count > available && available > 0) {
      sliderEl.value = available;
      state.config.count = available;
      document.getElementById('q-count-val').textContent = available;
      document.getElementById('q-count-badge').textContent = `${available} MCQs`;
    }
  }

  const availEl = document.getElementById('q-available');
  if (availEl) {
    availEl.textContent = available > 0
      ? `✨ ${available} authentic questions match — test will present ${count} items`
      : ALL_Q().length === 0
      ? '⏳ Initializing question bank…'
      : '⚠ No questions match these exact filters. Broaden your selections.';
  }

  const loadingBar = document.getElementById('questions-loading-bar');
  if (loadingBar) loadingBar.style.display = _questionsReady() ? 'none' : 'flex';

  const subj = state.config.subject === 'All' ? 'All Subjects' : state.config.subject;
  const yr = state.config.year === 'All' ? 'All Years' : state.config.year;
  const pp = state.config.paper === 'All' ? 'All Boards' : state.config.paper;

  let timerDesc = 'Untimed';
  if (state.config.timerType === 'total') timerDesc = `${state.config.timerTotalMins}m total`;
  if (state.config.timerType === 'per-question') timerDesc = `${state.config.timerPerQSecs}s / MCQ`;
  if (state.config.timerType === 'tiered') timerDesc = 'Tiered speed';

  const summaryText = available > 0
    ? `${count} MCQs · ${subj} · ${yr} · ${pp} · ${timerDesc}`
    : 'Adjust filters to load questions';
  document.getElementById('config-summary').textContent = summaryText;
}

/* ═══════════════════════════════════════════════════════════════ */
/* QUIZ RUNTIME CONTROLLER WITH PERSISTENCE & MATRIX */
/* ═══════════════════════════════════════════════════════════════ */
function persistQuizState() {
  const session = {
    questions: state.quiz.questions,
    current: state.quiz.current,
    answers: state.quiz.answers,
    flags: Array.from(state.quiz.flags),
    startTime: state.quiz.startTime,
    totalTimerRemaining: state.quiz.totalTimerRemaining,
    config: state.config,
  };
  sessionStorage.setItem('mdcat_active_quiz', JSON.stringify(session));
}

function clearPersistedQuiz() {
  sessionStorage.removeItem('mdcat_active_quiz');
}

async function launchQuiz() {
  if (!_questionsReady()) {
    const btn = document.getElementById('btn-launch-quiz');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Loading MCQs…'; }
    await ensureQuestions();
    if (btn) { btn.disabled = false; btn.textContent = 'Launch Practice Test →'; }
  }

  let pool = filteredQuestions();
  if (pool.length === 0) {
    await ensureQuestions();
    pool = filteredQuestions();
  }

  if (pool.length === 0) {
    toast('⚠ No questions match your filters.');
    return;
  }

  const numToPick = Math.min(state.config.count, pool.length);
  const picked = (state.config.shuffle ? shuffle(pool).slice(0, numToPick) : pool.slice(0, numToPick))
    .map(question => {
      if (!state.config.shuffle || !Array.isArray(question.options)) return question;
      const optionOrder = shuffle(question.options.map((_, idx) => idx));
      return {
        ...question,
        options: optionOrder.map(idx => question.options[idx]),
        correctIndex: optionOrder.indexOf(question.correctIndex),
      };
    });

  state.quiz.questions = picked;
  state.quiz.current = 0;
  state.quiz.answers = new Array(picked.length).fill(null);
  state.quiz.flags = new Set();
  state.quiz.startTime = Date.now();
  state.quiz.breakdown = {};

  clearInterval(state.quiz.timerInterval);
  clearInterval(state.quiz.totalTimerInterval);

  if (state.config.timerType === 'total') {
    state.quiz.totalTimerRemaining = state.config.timerTotalMins * 60;
    startTotalTimer();
  }

  persistQuizState();
  showView('quiz');
  renderQuestion();
}

function renderQuestion() {
  const { questions, current } = state.quiz;
  const q = questions[current];
  if (!q) { endQuiz(); return; }

  const pct = Math.round(((current + 1) / questions.length) * 100);
  document.getElementById('quiz-progress-fill').style.width = `${pct}%`;
  document.getElementById('quiz-counter').textContent = `${current + 1} / ${questions.length}`;
  document.getElementById('quiz-subject-badge').textContent = q.subject || 'MDCAT';
  document.getElementById('quiz-paper-badge').textContent = q.shortTitle || `${q.year || '2025'}`;
  document.getElementById('q-number-pill').textContent = `Question ${current + 1} of ${questions.length}`;
  document.getElementById('question-text').innerHTML = formatScientific(q.question);

  // Update Flag Icon
  const flagBtn = document.getElementById('btn-flag-q');
  const isFlagged = state.quiz.flags.has(current);
  flagBtn?.classList.toggle('active', isFlagged);

  const optList = document.getElementById('options-list');
  optList.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D', 'E'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-${i}`;
    btn.type = 'button';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', state.quiz.answers[current] === i ? 'true' : 'false');
    btn.setAttribute('aria-label', `Option ${labels[i]}: ${opt}`);
    btn.innerHTML = `<span class="option-label">${labels[i]}</span><span>${formatScientific(opt)}</span>`;
    btn.addEventListener('click', () => selectOption(i));
    optList.appendChild(btn);
  });

  const rp = document.getElementById('review-panel');
  rp.hidden = true;

  const savedAnswer = state.quiz.answers[current];
  if (savedAnswer !== null && savedAnswer >= 0) {
    document.getElementById(`opt-${savedAnswer}`)?.classList.add('selected');
    if (state.config.reviewMode === 'after-question') {
      showReviewPanel(q, savedAnswer);
    }
  }

  const prevBtn = document.getElementById('btn-prev-q');
  if (prevBtn) prevBtn.disabled = current === 0;

  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = current === questions.length - 1 ? 'Finish Test ✓' : 'Next Question →';

  // Timer Handling
  if (state.config.timerType === 'per-question') {
    startPerQuestionTimer(state.config.timerPerQSecs);
  } else if (state.config.timerType === 'tiered') {
    let secs = 45;
    if (q.subject === 'Biology' || q.subject === 'English') secs = 35;
    else if (q.subject === 'Chemistry') secs = 50;
    else if (q.subject === 'Physics' || q.subject === 'Logical Reasoning') secs = 75;
    startPerQuestionTimer(secs);
  } else if (state.config.timerType !== 'total') {
    document.getElementById('quiz-timer-wrap').hidden = true;
  }

  persistQuizState();
}

function selectOption(idx) {
  const { questions, current } = state.quiz;
  const q = questions[current];
  state.quiz.answers[current] = idx;

  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.classList.remove('selected', 'correct', 'wrong');
    btn.setAttribute('aria-checked', idx === i ? 'true' : 'false');
  });

  const selectedBtn = document.getElementById(`opt-${idx}`);
  const isExamMode = state.config.reviewMode === 'after-quiz';

  if (isExamMode) {
    selectedBtn?.classList.add('selected');
  } else {
    if (idx === q.correctIndex) {
      selectedBtn?.classList.add('correct');
    } else {
      selectedBtn?.classList.add('wrong');
      document.getElementById(`opt-${q.correctIndex}`)?.classList.add('correct');
    }
    showReviewPanel(q, idx);
  }

  if (state.config.timerType === 'per-question' || state.config.timerType === 'tiered') {
    clearInterval(state.quiz.timerInterval);
  }

  persistQuizState();
}

function showReviewPanel(q, chosenIdx) {
  const isCorrect = chosenIdx === q.correctIndex;
  const rp = document.getElementById('review-panel');
  const verdictEl = document.getElementById('review-verdict');
  const expEl = document.getElementById('review-explanation');
  const refEl = document.getElementById('review-ref');

  verdictEl.className = `review-verdict ${isCorrect ? 'correct' : 'wrong'}`;
  verdictEl.textContent = isCorrect ? '✓ Correct Answer!' : `✗ Incorrect. Correct Option: ${['A','B','C','D','E'][q.correctIndex]}`;
  expEl.innerHTML = formatScientific(q.explanation || 'No detailed explanation provided.');
  
  const refStr = q.reference?.citationString || (typeof q.reference === 'string' ? q.reference : null);
  if (refStr) {
    refEl.innerHTML = `📖 <strong>Textbook Citation:</strong> ${formatScientific(refStr)}`;
    refEl.hidden = false;
  } else {
    refEl.hidden = true;
  }
  rp.hidden = false;
}

function startPerQuestionTimer(seconds) {
  clearInterval(state.quiz.timerInterval);
  const wrap = document.getElementById('quiz-timer-wrap');
  const timerEl = document.getElementById('quiz-timer');
  const ringFill = document.getElementById('timer-ring-fill');
  wrap.hidden = false;

  let remaining = seconds;
  const total = seconds;
  const update = () => {
    timerEl.textContent = remaining;
    const progress = remaining / total;
    ringFill.style.strokeDashoffset = `${100 * (1 - progress)}`;
    ringFill.style.stroke = remaining <= 5 ? 'var(--red)' : 'var(--accent)';
    timerEl.style.color = remaining <= 5 ? 'var(--red)' : 'var(--accent)';

    if (remaining <= 0) {
      clearInterval(state.quiz.timerInterval);
      toast("⏰ Question time limit elapsed!");
      advanceQuestion();
    }
    remaining--;
  };
  update();
  state.quiz.timerInterval = setInterval(update, 1000);
}

function startTotalTimer() {
  clearInterval(state.quiz.totalTimerInterval);
  const wrap = document.getElementById('quiz-timer-wrap');
  const timerEl = document.getElementById('quiz-timer');
  const ringFill = document.getElementById('timer-ring-fill');
  wrap.hidden = false;

  const total = state.quiz.totalTimerRemaining;
  const update = () => {
    const mins = Math.floor(state.quiz.totalTimerRemaining / 60);
    const secs = state.quiz.totalTimerRemaining % 60;
    timerEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    const progress = state.quiz.totalTimerRemaining / total;
    ringFill.style.strokeDashoffset = `${100 * (1 - progress)}`;

    if (state.quiz.totalTimerRemaining <= 0) {
      clearInterval(state.quiz.totalTimerInterval);
      toast("⏰ Exam Time Over! Submitting test...");
      endQuiz();
    }
    state.quiz.totalTimerRemaining--;
  };
  update();
  state.quiz.totalTimerInterval = setInterval(update, 1000);
}

function advanceQuestion() {
  clearInterval(state.quiz.timerInterval);
  state.quiz.current++;
  if (state.quiz.current >= state.quiz.questions.length) {
    endQuiz();
  } else {
    renderQuestion();
  }
}

function prevQuestion() {
  if (state.quiz.current > 0) {
    clearInterval(state.quiz.timerInterval);
    state.quiz.current--;
    renderQuestion();
  }
}

function toggleFlag() {
  const cur = state.quiz.current;
  if (state.quiz.flags.has(cur)) {
    state.quiz.flags.delete(cur);
    toast('Unflagged Question');
  } else {
    state.quiz.flags.add(cur);
    toast('Flagged for Review 🚩');
  }
  document.getElementById('btn-flag-q')?.classList.toggle('active', state.quiz.flags.has(cur));
  persistQuizState();
}

function renderPaletteGrid() {
  const grid = document.getElementById('palette-grid');
  if (!grid) return;
  const { questions, current, answers, flags } = state.quiz;

  grid.innerHTML = questions.map((_, i) => {
    let cls = 'palette-btn';
    if (answers[i] !== null && answers[i] >= 0) cls += ' p-answered';
    if (flags.has(i)) cls += ' p-flagged';
    if (i === current) cls += ' p-current';

    return `<button class="${cls}" data-idx="${i}">Q${i + 1}</button>`;
  }).join('');

  grid.querySelectorAll('.palette-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx, 10);
      state.quiz.current = idx;
      document.getElementById('palette-modal').hidden = true;
      renderQuestion();
    });
  });
}

function initQuizControls() {
  document.getElementById('btn-next')?.addEventListener('click', advanceQuestion);
  document.getElementById('btn-prev-q')?.addEventListener('click', prevQuestion);
  document.getElementById('btn-skip')?.addEventListener('click', () => {
    advanceQuestion();
  });
  document.getElementById('btn-flag-q')?.addEventListener('click', toggleFlag);
  
  const paletteModal = document.getElementById('palette-modal');
  document.getElementById('btn-toggle-palette')?.addEventListener('click', () => {
    renderPaletteGrid();
    paletteModal.hidden = false;
  });
  document.getElementById('btn-close-palette')?.addEventListener('click', () => {
    paletteModal.hidden = true;
  });
  paletteModal?.addEventListener('click', e => {
    if (e.target === paletteModal) paletteModal.hidden = true;
  });
  document.getElementById('btn-submit-exam-early')?.addEventListener('click', () => {
    paletteModal.hidden = true;
    endQuiz();
  });

  // Global Keyboard Navigation
  window.addEventListener('keydown', e => {
    if (!document.getElementById('view-quiz').classList.contains('active')) return;
    if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName.toLowerCase())) return;

    if (e.key === '1' || e.key.toLowerCase() === 'a') selectOption(0);
    if (e.key === '2' || e.key.toLowerCase() === 'b') selectOption(1);
    if (e.key === '3' || e.key.toLowerCase() === 'c') selectOption(2);
    if (e.key === '4' || e.key.toLowerCase() === 'd') selectOption(3);
    if (e.key.toLowerCase() === 'f') toggleFlag();
    if (e.key === 'ArrowRight' || e.key === 'Enter') advanceQuestion();
    if (e.key === 'ArrowLeft') prevQuestion();
  });
}

/* ═══════════════════════════════════════════════════════════════ */
/* RESULTS & EVALUATION */
/* ═══════════════════════════════════════════════════════════════ */
function endQuiz() {
  clearInterval(state.quiz.timerInterval);
  clearInterval(state.quiz.totalTimerInterval);
  clearPersistedQuiz();

  const { questions, answers, startTime } = state.quiz;
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  state.quiz.elapsedSeconds = elapsed;

  let correctCount = 0;
  const breakdown = {};

  questions.forEach((q, i) => {
    const sub = q.subject || 'General';
    if (!breakdown[sub]) breakdown[sub] = { total: 0, correct: 0 };
    breakdown[sub].total++;
    if (answers[i] === q.correctIndex) {
      correctCount++;
      breakdown[sub].correct++;
    }
  });

  state.quiz.breakdown = breakdown;
  const total = questions.length;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  showView('results');
  document.getElementById('score-pct').textContent = `${pct}%`;
  document.getElementById('score-fraction').textContent = `${correctCount} / ${total}`;

  const ringFill = document.getElementById('score-ring-fill');
  ringFill.style.strokeDashoffset = `${327 * (1 - pct / 100)}`;

  const gradeEl = document.getElementById('score-grade');
  if (pct >= 85) {
    gradeEl.textContent = '🌟 Outstanding! Open Merit Selection Tier.';
    gradeEl.style.color = 'var(--green)';
  } else if (pct >= 70) {
    gradeEl.textContent = '👍 Very Good! Highly Competitive MDCAT Score.';
    gradeEl.style.color = 'var(--accent)';
  } else if (pct >= 55) {
    gradeEl.textContent = '📖 Passing Tier! Target weak topics to secure admission.';
    gradeEl.style.color = 'var(--amber)';
  } else {
    gradeEl.textContent = '⚡ Revise Fundamentals! Study Prep Hub formula sheets.';
    gradeEl.style.color = 'var(--red)';
  }

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  document.getElementById('score-time').textContent = `⏱ Time: ${mins > 0 ? `${mins}m ` : ''}${secs}s · Speed: ${(elapsed / Math.max(1, total)).toFixed(1)}s / MCQ`;

  // Render Subject Breakdown
  const bdCard = document.getElementById('breakdown-card');
  bdCard.innerHTML = `
    <h3 class="breakdown-title">Subject Accuracy Matrix</h3>
    ${Object.entries(breakdown).map(([subj, data]) => {
      const subPct = Math.round((data.correct / data.total) * 100);
      return `
        <div class="breakdown-row">
          <span class="breakdown-name">${subj}</span>
          <div class="breakdown-bar-wrap">
            <div class="breakdown-bar" style="width:${subPct}%"></div>
          </div>
          <span class="breakdown-pct">${subPct}% (${data.correct}/${data.total})</span>
        </div>`;
    }).join('')}
  `;

  // Handle Autologged User
  const resultNameInput = document.getElementById('result-name');
  if (state.user.authenticated && state.user.user) {
    resultNameInput.value = state.user.user.name;
    document.getElementById('save-sub-text').textContent = `Submitting under account: ${state.user.user.name}`;
    saveScoreToBackend(correctCount, total, pct, elapsed);
  } else {
    resultNameInput.value = state.config.playerName || localStorage.getItem('mdcat_player_name') || '';
  }

  renderFullReview(questions, answers);
}

function renderFullReview(questions, answers) {
  const container = document.getElementById('full-review');
  const labels = ['A', 'B', 'C', 'D', 'E'];

  container.innerHTML = questions.map((q, i) => {
    const chosen = answers[i];
    const isCorrect = chosen === q.correctIndex;
    const isSkipped = chosen === null || chosen === -1;

    return `
      <div class="review-item">
        <div class="review-item-header">
          <span><strong>Q${i + 1}.</strong> ${q.subject || ''} · ${q.shortTitle || ''}</span>
          <span class="${isCorrect ? 'status-correct' : 'status-wrong'}">
            ${isCorrect ? '✓ Correct' : isSkipped ? '⏭ Skipped' : '✗ Incorrect'}
          </span>
        </div>
        <p class="question-text" style="font-size:15px; margin-bottom:12px;">${formatScientific(q.question)}</p>
        <div class="review-options">
          ${q.options.map((opt, optIdx) => {
            let cls = 'rev-opt';
            if (optIdx === q.correctIndex) cls += ' rev-opt-correct';
            if (optIdx === chosen && !isCorrect) cls += ' rev-opt-wrong';
            return `
              <div class="${cls}">
                <span class="option-label">${labels[optIdx]}</span>
                <span>${formatScientific(opt)}</span>
                ${optIdx === q.correctIndex ? ' <strong style="color:var(--green); margin-left:auto;">(Correct)</strong>' : ''}
                ${optIdx === chosen && !isCorrect ? ' <strong style="color:var(--red); margin-left:auto;">(Your Choice)</strong>' : ''}
              </div>`;
          }).join('')}
        </div>
        ${q.explanation ? `<div class="review-explanation-box">💡 <strong>Solution:</strong> ${formatScientific(q.explanation)}</div>` : ''}
        ${(() => {
          const ref = q.reference?.citationString || (typeof q.reference === 'string' ? q.reference : null);
          return ref ? `<div class="review-ref-box">📖 <strong>Citation:</strong> ${formatScientific(ref)}</div>` : '';
        })()}
      </div>
    `;
  }).join('');
}

async function saveScoreToBackend(score, total, pct, timeSeconds) {
  const name = document.getElementById('result-name').value.trim() || state.config.playerName || 'Anonymous Student';
  const statusEl = document.getElementById('save-status');
  statusEl.textContent = 'Syncing score with national merit leaderboard…';

  try {
    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        score,
        total,
        pct,
        subject: state.config.subject,
        year: state.config.year,
        paper: state.config.paper,
        timeSeconds,
        mode: state.config.reviewMode,
        breakdown: state.quiz.breakdown,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save');
    statusEl.innerHTML = `🏆 Recorded! National Rank: <strong>#${data.rank}</strong> of ${data.totalParticipants} aspirants.`;
    statusEl.style.color = 'var(--green)';

    const pctBanner = document.getElementById('score-percentile-banner');
    if (pctBanner) {
      pctBanner.hidden = false;
      pctBanner.textContent = `🎯 National Percentile: ${data.percentile}% (Top ${Math.max(1, 100 - data.percentile)}%)`;
    }

    if (state.user.authenticated) checkCurrentSession();
  } catch {
    statusEl.textContent = 'Saved to offline history (cloud sync paused).';
    statusEl.style.color = 'var(--amber)';
    saveScoreLocally({ name, score, total, pct, subject: state.config.subject, year: state.config.year, timeSeconds, createdAt: Date.now() });
  }
}

function saveScoreLocally(entry) {
  const cur = JSON.parse(localStorage.getItem('mdcat_offline_scores') || '[]');
  cur.unshift(entry);
  localStorage.setItem('mdcat_offline_scores', JSON.stringify(cur.slice(0, 100)));
}

/* ═══════════════════════════════════════════════════════════════ */
/* PREP HUB CONTROLLER */
/* ═══════════════════════════════════════════════════════════════ */
function initPrep() {
  document.querySelectorAll('.prep-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.prep-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.prep.currentTab = tab.dataset.tab;
      renderPrepContent();
    });
  });

  const searchInput = document.getElementById('prep-search');
  searchInput?.addEventListener('input', debounce((e) => {
    state.prep.search = e.target.value.trim().toLowerCase();
    renderPrepContent();
  }, 160));
}

function renderPrepContent() {
  const container = document.getElementById('prep-content');
  if (!container) return;
  const tab = state.prep.currentTab;
  const q = state.prep.search;

  if (tab === 'chapters') {
    const chapters = PREP_DATA.chapters || [];
    const subjects = ['All', 'Biology', 'Chemistry', 'Physics', 'English', 'Logical Reasoning'];
    const activeSubj = state.prep.chapterSubject || 'All';

    const filtered = chapters.filter(ch => {
      const matchSubj = activeSubj === 'All' || ch.subject === activeSubj;
      const matchQ = !q || ch.name.toLowerCase().includes(q) || ch.subject.toLowerCase().includes(q) || (ch.topics && ch.topics.some(t => t.toLowerCase().includes(q)));
      return matchSubj && matchQ;
    });

    container.innerHTML = `
      <div style="grid-column: 1 / -1; margin-bottom: 8px;">
        <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:space-between;">
          <div class="chip-group" id="chapter-subj-filters">
            ${subjects.map(s => `
              <button class="chip-sm ${s === activeSubj ? 'active' : ''}" data-subj="${s}">
                ${s === 'All' ? 'All (54 Chapters)' : s}
              </button>
            `).join('')}
          </div>
          <span style="font-size:12px; color:var(--text3);">Showing ${filtered.length} Modules</span>
        </div>
      </div>
      ${filtered.length === 0 ? `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text3);">No chapters match "${escHtml(q)}".</div>` : ''}
      ${filtered.map(ch => `
        <div class="prep-card">
          <div class="prep-tag ${ch.badgeClass}">${ch.classLevel} · ${ch.subject}</div>
          <h3 class="prep-card-title">${ch.name}</h3>
          <ul class="prep-details-list" style="margin-bottom:14px;">
            ${ch.topics.map(t => `<li>• ${formatScientific(t)}</li>`).join('')}
          </ul>
          <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:var(--text3);">~${ch.numMcqs} MCQs in Exam</span>
            <button class="chip-sm" onclick="window.quickLaunchSubject('${ch.subject}')">Practice →</button>
          </div>
        </div>
      `).join('')}
    `;

    document.querySelectorAll('#chapter-subj-filters button').forEach(btn => {
      btn.addEventListener('click', () => {
        state.prep.chapterSubject = btn.dataset.subj;
        renderPrepContent();
      });
    });
    return;
  }

  if (tab === 'diagrams') {
    const diagrams = (PREP_DATA.diagrams || []).filter(d => !q || d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
    container.innerHTML = diagrams.map(d => `
      <div class="prep-card" style="grid-column: 1 / -1;">
        <div class="prep-tag ${d.subject === 'Biology' ? 'tag-bio' : d.subject === 'Chemistry' ? 'tag-chem' : 'tag-phys'}">${d.subject} High-Yield Visual</div>
        <h3 class="prep-card-title">${d.title}</h3>
        <p class="prep-card-desc">${formatScientific(d.desc)}</p>
        <div class="prep-diagram-box">
          ${d.svg}
          <div class="diagram-caption">${d.caption}</div>
        </div>
      </div>
    `).join('');
    return;
  }

  if (tab === 'vocab') {
    const vocab = (PREP_DATA.vocab || []).filter(v => !q || v.word.toLowerCase().includes(q) || v.def.toLowerCase().includes(q) || v.syn.toLowerCase().includes(q));
    container.innerHTML = vocab.map(v => `
      <div class="prep-card">
        <div class="prep-tag tag-eng">PMDC High-Yield Vocab</div>
        <h3 class="prep-card-title">${v.word} <span style="font-size:12px; font-weight:normal; color:var(--amber);">(${v.pos})</span></h3>
        <p class="prep-card-desc"><strong>Definition:</strong> ${v.def}</p>
        <p class="prep-card-desc" style="color:var(--accent);"><strong>Synonyms:</strong> ${v.syn}</p>
        <div style="background:var(--amber-glow); padding:8px 12px; border-radius:6px; font-size:12px; margin-top:8px;">💡 <strong>Mnemonic:</strong> ${v.mnemonic}</div>
      </div>
    `).join('');
    return;
  }

  if (tab === 'syllabus') {
    container.innerHTML = `
      <div class="prep-card" style="grid-column: 1 / -1;">
        <h3 class="prep-card-title">Official PMDC MDCAT Blueprint</h3>
        <p class="prep-card-desc">Total MCQs: 180 (or 200) · Time: 3.5 Hours · No Negative Marking · MBBS Passing: 55%.</p>
        ${(PREP_DATA.syllabus || []).map(s => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg3); border-radius:8px; margin-bottom:8px;">
            <div>
              <strong style="font-size:15px;">${s.subject}</strong>
              <div style="font-size:12px; color:var(--text2); margin-top:2px;">${s.desc}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:18px; font-weight:800; color:var(--accent);">${s.mcqs} MCQs</div>
              <div style="font-size:11px; color:var(--text3);">${s.share} Weight</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return;
  }

  let items = [];
  if (tab === 'formulas') items = PREP_DATA.formulas || [];
  else if (tab === 'biology') items = PREP_DATA.biology || [];
  else if (tab === 'chemistry') items = PREP_DATA.chemistry || [];
  else if (tab === 'physics') items = PREP_DATA.physics || [];

  const filtered = items.filter(i => !q || i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q) || (i.formula && i.formula.toLowerCase().includes(q)));
  container.innerHTML = filtered.map(item => `
    <div class="prep-card" style="${item.table ? 'grid-column: 1 / -1;' : ''}">
      <div class="prep-tag ${item.tag}">${item.subject}</div>
      <h3 class="prep-card-title">${item.title}</h3>
      ${item.formula ? `<div class="prep-formula-box">${formatScientific(item.formula)}</div>` : ''}
      <p class="prep-card-desc">${formatScientific(item.desc)}</p>
      ${item.details ? `<ul class="prep-details-list">${item.details.map(d => `<li>• ${formatScientific(d)}</li>`).join('')}</ul>` : ''}
      ${item.table ? `
        <div class="prep-table-wrap">
          <table class="prep-table">
            <thead><tr>${item.table.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${item.table.rows.map(r => `<tr>${r.map(c => `<td>${formatScientific(c)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>` : ''}
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════ */
/* LEADERBOARD & ADMIN CONTROLLERS */
/* ═══════════════════════════════════════════════════════════════ */
async function loadLeaderboard() {
  const tbody = document.getElementById('lb-tbody');
  tbody.innerHTML = '<tr><td colspan="7" class="loading-cell">Loading live merit standings…</td></tr>';
  try {
    const res = await fetch('/api/scores?limit=200');
    if (!res.ok) throw new Error();
    const data = await res.json();
    state.lb.scores = data.scores || [];
    document.getElementById('lb-total-attempts').textContent = data.totalAttempts || state.lb.scores.length;
    document.getElementById('lb-unique-candidates').textContent = data.uniqueStudents || new Set(state.lb.scores.map(s => s.name.toLowerCase())).size;
    document.getElementById('lb-avg-score').textContent = `${data.avgPercentage || 0}%`;
    renderLeaderboard();
  } catch {
    const local = JSON.parse(localStorage.getItem('mdcat_offline_scores') || '[]');
    state.lb.scores = local;
    renderLeaderboard();
  }
}

function renderLeaderboard() {
  const tbody = document.getElementById('lb-tbody');
  const search = (document.getElementById('lb-search')?.value || '').toLowerCase();
  const subj = document.getElementById('lb-subject-filter')?.value || 'All';
  const year = document.getElementById('lb-year-filter')?.value || 'All';

  const filtered = state.lb.scores.filter(s => {
    const nameMatch = !search || (s.name || s.userName || '').toLowerCase().includes(search);
    const subjMatch = subj === 'All' || s.subject === subj;
    const yearMatch = year === 'All' || String(s.year || '') === year || String(s.paper || '').includes(year);
    return nameMatch && subjMatch && yearMatch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="loading-cell">No candidate scores found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map((s, i) => {
    const rank = i + 1;
    const badgeCls = rank <= 3 ? `rank-${rank}` : 'rank-other';
    const date = new Date(s.createdAt || s.ts || Date.now()).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
    const mins = Math.floor((s.timeSeconds || 0) / 60);
    const secs = (s.timeSeconds || 0) % 60;

    return `
      <tr>
        <td><span class="lb-rank-badge ${badgeCls}">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</span></td>
        <td><strong>${escHtml(s.name || s.userName || 'Student')}</strong></td>
        <td><strong style="color:var(--accent)">${s.pct}%</strong> <span style="color:var(--text3); font-size:11px;">(${s.score}/${s.total})</span></td>
        <td>${s.subject || 'All'}</td>
        <td>${s.paper || s.year || '–'}</td>
        <td>${mins}m ${secs}s</td>
        <td>${date}</td>
      </tr>`;
  }).join('');
}

async function loadMiniLeaderboard() {
  const el = document.getElementById('mini-leader-list');
  try {
    const res = await fetch('/api/scores?limit=5');
    if (!res.ok) throw new Error();
    const data = await res.json();
    renderMiniLeaderboard(data.scores || [], el);
  } catch {
    const local = JSON.parse(localStorage.getItem('mdcat_offline_scores') || '[]');
    renderMiniLeaderboard(local.slice(0, 5), el);
  }
}

function renderMiniLeaderboard(scores, el) {
  if (!scores.length) {
    el.innerHTML = '<p style="color:var(--text3);font-size:13px;text-align:center;padding:16px">No mock scores recorded yet. Be the first!</p>';
    return;
  }
  el.innerHTML = scores.slice(0, 5).map((s, i) => {
    const rank = i + 1;
    const badgeCls = rank <= 3 ? `rank-${rank}` : 'rank-other';
    return `
      <div class="leader-row">
        <div class="leader-rank ${badgeCls}">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</div>
        <div class="leader-name">${escHtml(s.name || s.userName)}</div>
        <div class="leader-meta">${s.subject || 'All'} · ${s.paper || s.year || 'Exam'}</div>
        <div class="leader-score">${s.pct}%</div>
      </div>`;
  }).join('');
}

function renderQuickGrid() {
  const grid = document.getElementById('quick-grid');
  if (!grid) return;
  const subjects = [
    { name: 'Biology', icon: '🧬', count: 720 },
    { name: 'Chemistry', icon: '🧪', count: 580 },
    { name: 'Physics', icon: '⚡', count: 540 },
    { name: 'English', icon: '📖', count: 215 },
    { name: 'Logical Reasoning', icon: '🧩', count: 70 },
    { name: 'Full Mock Exam', icon: '🎯', count: 2125 },
  ];
  grid.innerHTML = subjects.map(s => `
    <div class="quick-card" onclick="window.quickLaunchSubject('${s.name}')">
      <div class="quick-icon">${s.icon}</div>
      <div class="quick-name">${s.name}</div>
      <div class="quick-count">${s.count} Questions</div>
    </div>
  `).join('');
}

window.quickLaunchSubject = function (subj) {
  if (subj === 'Full Mock Exam') {
    state.config.subject = 'All';
    state.config.count = 200;
  } else {
    state.config.subject = subj;
    state.config.count = 30;
  }
  showView('config');
  document.querySelectorAll('#filter-subject .chip').forEach(c => {
    c.classList.toggle('active', c.dataset.val === state.config.subject);
  });
  updateConfigSummary();
};

async function initAdmin() {
  document.getElementById('btn-admin-login')?.addEventListener('click', async () => {
    const key = document.getElementById('admin-key-input').value.trim();
    if (!key) return;
    await fetchAdminData(key);
  });

  document.getElementById('admin-key-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-admin-login').click();
  });

  document.getElementById('btn-admin-refresh')?.addEventListener('click', () => {
    fetchAdminData(state.admin.key);
  });
}

async function fetchAdminData(key) {
  const errEl = document.getElementById('admin-error');
  errEl.textContent = '';
  try {
    const res = await fetch(`/api/admin?key=${encodeURIComponent(key)}`);
    if (!res.ok) {
      errEl.textContent = '❌ Invalid administrator credentials.';
      return;
    }
    const data = await res.json();
    state.admin.key = key;
    state.admin.data = data;
    document.getElementById('admin-gate').hidden = true;
    document.getElementById('admin-dashboard').hidden = false;
    renderAdminDashboard(data);
  } catch (err) {
    errEl.textContent = '❌ Failed to reach admin endpoint: ' + err.message;
  }
}

function renderAdminDashboard(data) {
  const { summary, bySubject, activity, users, topPerformers, recentScores } = data;
  document.getElementById('adm-attempts').textContent = summary.totalAttempts || 0;
  document.getElementById('adm-users').textContent = summary.uniqueUsers || 0;
  document.getElementById('adm-registered').textContent = summary.registeredStudents || 0;
  document.getElementById('adm-avg').textContent = (summary.avgPct || 0) + '%';

  const actCtx = document.getElementById('chart-activity');
  if (window.Chart && actCtx && activity) {
    if (actCtx._chart) actCtx._chart.destroy();
    actCtx._chart = new Chart(actCtx, {
      type: 'bar',
      data: {
        labels: activity.map(a => a.date.slice(5)),
        datasets: [{
          label: 'Attempts',
          data: activity.map(a => a.count),
          backgroundColor: 'hsl(262, 84%, 66%, 0.75)',
          borderRadius: 6,
        }],
      },
      options: { responsive: true, plugins: { legend: { display: false } } },
    });
  }

  const subjCtx = document.getElementById('chart-subjects');
  if (window.Chart && subjCtx && bySubject) {
    if (subjCtx._chart) subjCtx._chart.destroy();
    subjCtx._chart = new Chart(subjCtx, {
      type: 'bar',
      data: {
        labels: bySubject.map(s => s.subject),
        datasets: [{
          label: 'Average %',
          data: bySubject.map(s => s.avgPct),
          backgroundColor: ['#10b981', '#8b5cf6', '#38bdf8', '#f59e0b', '#f43f5e'],
          borderRadius: 6,
        }],
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 100 } } },
    });
  }

  const usersTbody = document.getElementById('adm-users-tbody');
  if (usersTbody) {
    usersTbody.innerHTML = (users || []).map(u => `
      <tr>
        <td><strong>${escHtml(u.name)}</strong></td>
        <td>${escHtml(u.email)}</td>
        <td><span class="profile-college-pill">${escHtml(u.targetCollege || '–')}</span></td>
        <td>${u.quizzes}</td>
        <td><strong>${u.avgPct}%</strong></td>
      </tr>
    `).join('') || '<tr><td colspan="5" class="loading-cell">No registered candidates.</td></tr>';
  }

  const topTbody = document.getElementById('adm-top-tbody');
  if (topTbody) {
    topTbody.innerHTML = (topPerformers || []).slice(0, 15).map((s, i) => `
      <tr>
        <td>#${i + 1}</td>
        <td><strong>${escHtml(s.name)}</strong></td>
        <td><strong style="color:var(--accent)">${s.pct}%</strong></td>
        <td>${s.subject || 'All'}</td>
        <td>${s.year || s.paper || '–'}</td>
      </tr>
    `).join('');
  }

  const recentTbody = document.getElementById('adm-recent-tbody');
  if (recentTbody) {
    recentTbody.innerHTML = (recentScores || []).slice(0, 25).map(s => `
      <tr>
        <td><strong>${escHtml(s.name)}</strong></td>
        <td><strong style="color:var(--green)">${s.score}/${s.total}</strong></td>
        <td>${s.subject || '–'}</td>
        <td>${s.paper || '–'}</td>
        <td>${s.timeSeconds}s</td>
        <td>${s.date}</td>
      </tr>
    `).join('');
  }
}

function initTheme() {
  const saved = localStorage.getItem('mdcat_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('btn-theme');
  if (btn) btn.textContent = saved === 'dark' ? '☀️' : '🌙';

  btn?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mdcat_theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

function initFullscreen() {
  const button = document.getElementById('btn-fullscreen');
  if (!button || !document.fullscreenEnabled) return;

  const updateLabel = () => {
    const active = Boolean(document.fullscreenElement);
    button.textContent = active ? 'X' : 'FS';
    button.setAttribute('aria-label', active ? 'Exit Fullscreen' : 'Enter Fullscreen');
    button.title = active ? 'Exit Fullscreen' : 'Enter Fullscreen';
  };

  button.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      toast('Fullscreen is not available in this browser.');
    }
  });
  document.addEventListener('fullscreenchange', updateLabel);
  updateLabel();
}

function initShareAndPrint() {
  document.getElementById('btn-share-result')?.addEventListener('click', async () => {
    const { questions, answers } = state.quiz;
    const correct = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
    const total = questions.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const text = `🎯 I scored ${pct}% (${correct}/${total}) on MDCAT PrepMaster Pakistan Past Papers (2020-2025)! Test yourself at: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My MDCAT PrepMaster Score', text, url: window.location.origin });
      } catch {}
    } else {
      navigator.clipboard.writeText(text);
      toast('📋 Score details copied to clipboard!');
    }
  });

  document.getElementById('btn-print-results')?.addEventListener('click', () => {
    window.print();
  });
}

// Session Recovery Check
function checkActiveQuizSession() {
  const saved = sessionStorage.getItem('mdcat_active_quiz');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data && data.questions && data.questions.length > 0) {
        state.quiz.questions = data.questions;
        state.quiz.current = data.current || 0;
        state.quiz.answers = data.answers || [];
        state.quiz.flags = new Set(data.flags || []);
        state.quiz.startTime = data.startTime || Date.now();
        state.quiz.totalTimerRemaining = data.totalTimerRemaining || 0;
        state.config = data.config || state.config;

        showView('quiz');
        renderQuestion();
        if (state.config.timerType === 'total' && state.quiz.totalTimerRemaining > 0) {
          startTotalTimer();
        }
        toast('Restored active exam progress 🔄');
      }
    } catch {}
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFullscreen();
  initAuth();
  initConfig();
  initQuizControls();
  initPrep();
  initAdmin();
  initShareAndPrint();

  document.getElementById('lb-search')?.addEventListener('input', debounce(renderLeaderboard, 160));
  document.getElementById('lb-subject-filter')?.addEventListener('change', renderLeaderboard);
  document.getElementById('lb-year-filter')?.addEventListener('change', renderLeaderboard);

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  document.getElementById('btn-home')?.addEventListener('click', () => showView('home'));
  document.getElementById('btn-start-practice')?.addEventListener('click', () => showView('config'));
  document.getElementById('btn-go-prep')?.addEventListener('click', () => showView('prep'));
  document.getElementById('btn-banner-prep')?.addEventListener('click', () => showView('prep'));
  document.getElementById('btn-view-rankings')?.addEventListener('click', () => showView('leaderboard'));
  document.getElementById('btn-all-rankings')?.addEventListener('click', () => showView('leaderboard'));
  document.getElementById('btn-retake')?.addEventListener('click', () => launchQuiz());
  document.getElementById('btn-new-quiz')?.addEventListener('click', () => showView('config'));

  document.getElementById('btn-save-score')?.addEventListener('click', () => {
    const { questions, answers, elapsedSeconds } = state.quiz;
    const correct = answers.filter((a, i) => a === questions[i]?.correctIndex).length;
    const total = questions.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    saveScoreToBackend(correct, total, pct, elapsedSeconds);
  });

  document.getElementById('btn-review-answers')?.addEventListener('click', () => {
    const fr = document.getElementById('full-review');
    fr.hidden = !fr.hidden;
  });

  renderQuickGrid();
  loadMiniLeaderboard();

  ensureQuestions().then(() => {
    updateConfigSummary();
    const statQ = document.getElementById('stat-questions');
    if (statQ && ALL_Q().length > 0) statQ.textContent = ALL_Q().length.toLocaleString();
    checkActiveQuizSession();
  });
});