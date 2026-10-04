/* MDCAT PrepMaster productivity layer
 * Adds resilient, client-side study tools without coupling them to the quiz engine.
 */

const STORAGE_KEY = 'mdcat_productivity_v2';
const DEFAULT_DATA = {
  goal: 20,
  today: 0,
  streak: 0,
  lastStudyDate: null,
  sessions: [],
  notes: [],
  savedQuestions: [],
  settings: { compact: false, reduceMotion: false, sound: false },
};

const data = loadData();
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    return { ...structuredClone(DEFAULT_DATA), ...saved, settings: { ...DEFAULT_DATA.settings, ...(saved?.settings || {}) } };
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* private mode */ }
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function emit(name, detail = {}) {
  document.dispatchEvent(new CustomEvent(name, { detail }));
}

function announce(message) {
  const live = $('#app-live-region');
  if (live) {
    live.textContent = '';
    requestAnimationFrame(() => { live.textContent = message; });
  }
}

function safeText(value) {
  const div = document.createElement('div');
  div.textContent = String(value ?? '');
  return div.innerHTML;
}

function formatDate(value) {
  if (!value) return 'Not yet';
  return new Intl.DateTimeFormat('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value));
}

function syncDay() {
  const today = todayKey();
  if (data.lastStudyDate === today) return;
  if (!data.lastStudyDate) {
    data.today = 0;
  } else if (daysBetween(data.lastStudyDate, today) > 1) {
    data.streak = 0;
    data.today = 0;
  } else {
    data.today = 0;
  }
  data.lastStudyDate = today;
  saveData();
}

function registerStudyActivity(count = 1, meta = {}) {
  syncDay();
  data.today += count;
  const today = todayKey();
  const alreadyLogged = data.sessions.some((session) => session.date === today);
  if (!alreadyLogged) data.streak += 1;
  data.sessions.unshift({ date: today, count, ...meta });
  data.sessions = data.sessions.slice(0, 60);
  saveData();
  renderProductivity();
  emit('productivity:updated', { data });
}

function getGoalPercent() {
  return Math.min(100, Math.round((data.today / Math.max(1, data.goal)) * 100));
}

function renderProductivity() {
  syncDay();
  const percent = getGoalPercent();
  const goalValue = $('#goal-progress-value');
  const goalBar = $('#goal-progress-bar');
  const goalLabel = $('#goal-progress-label');
  const streakValue = $('#streak-value');
  const sessionValue = $('#session-count-value');
  if (goalValue) goalValue.textContent = `${data.today}/${data.goal}`;
  if (goalBar) goalBar.style.width = `${percent}%`;
  if (goalBar) goalBar.setAttribute('aria-valuenow', String(percent));
  if (goalLabel) goalLabel.textContent = percent >= 100 ? 'Daily target complete' : `${data.goal - data.today} questions left today`;
  if (streakValue) streakValue.textContent = `${data.streak} day${data.streak === 1 ? '' : 's'}`;
  if (sessionValue) sessionValue.textContent = String(data.sessions.length);
  $$('[data-goal-value]').forEach((el) => { el.textContent = data.goal; });
}

function openDialog(id) {
  const dialog = document.getElementById(id);
  if (!dialog) return;
  dialog.hidden = false;
  document.body.classList.add('modal-open');
  const focusable = $('button, input, textarea, select', dialog);
  focusable?.focus();
}

function closeDialog(dialog) {
  if (!dialog) return;
  dialog.hidden = true;
  document.body.classList.remove('modal-open');
}

function initDialogs() {
  $$('[data-open-dialog]').forEach((button) => button.addEventListener('click', () => openDialog(button.dataset.openDialog)));
  $$('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => closeDialog(button.closest('[role="dialog"]'))));
  $$('[role="dialog"]').forEach((dialog) => dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = $('[role="dialog"]:not([hidden])');
    if (open) closeDialog(open);
  });
}

function initGoalEditor() {
  const form = $('#goal-form');
  const input = $('#goal-input');
  if (!form || !input) return;
  input.value = data.goal;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const next = Math.max(5, Math.min(200, Number(input.value) || 20));
    data.goal = next;
    saveData();
    renderProductivity();
    closeDialog($('#goal-dialog'));
    announce(`Daily goal updated to ${next} questions.`);
    toastProductivity(`Daily goal set to ${next} questions.`);
  });
}

function toastProductivity(message) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastProductivity.timer);
  toastProductivity.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function initCommandPalette() {
  const input = $('#command-search');
  const list = $('#command-list');
  if (!input || !list) return;
  const commands = [
    ['Start a practice test', 'config', 'Practice'],
    ['Open Prep Hub', 'prep', 'Study'],
    ['View leaderboard', 'leaderboard', 'Rankings'],
    ['Open saved questions', 'saved', 'Library'],
    ['Open study notes', 'notes', 'Library'],
    ['Toggle light theme', 'theme', 'Appearance'],
    ['Set daily goal', 'goal', 'Plan'],
  ];
  const renderCommands = (query = '') => {
    const filtered = commands.filter(([label]) => label.toLowerCase().includes(query.toLowerCase()));
    list.innerHTML = filtered.map(([label, action, group], index) => `<button class="command-item" type="button" data-command="${action}" data-index="${index}"><span>${safeText(label)}</span><small>${safeText(group)}</small></button>`).join('') || '<p class="empty-state compact">No commands found.</p>';
  };
  const run = (action) => {
    closeDialog($('#command-dialog'));
    if (action === 'theme') $('#btn-theme')?.click();
    else if (action === 'goal') openDialog('goal-dialog');
    else if (action === 'notes') openDialog('notes-dialog');
    else if (action === 'saved') openDialog('saved-dialog');
    else document.querySelector(`[data-view="${action}"]`)?.click();
  };
  input.addEventListener('input', () => renderCommands(input.value));
  list.addEventListener('click', (event) => {
    const item = event.target.closest('[data-command]');
    if (item) run(item.dataset.command);
  });
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openDialog('command-dialog');
      input.value = '';
      renderCommands();
    }
    if ($('#command-dialog')?.hidden === false && event.key === 'Enter' && document.activeElement === input) {
      const first = $('[data-command]', list);
      if (first) run(first.dataset.command);
    }
  });
  renderCommands();
}

function initQuickActions() {
  $('#btn-open-command')?.addEventListener('click', () => openDialog('command-dialog'));
  $('#btn-goal-settings')?.addEventListener('click', () => openDialog('goal-dialog'));
  $('#btn-export-progress')?.addEventListener('click', exportProgress);
  $('#btn-import-progress')?.addEventListener('click', () => $('#progress-import')?.click());
  $('#progress-import')?.addEventListener('change', importProgress);
  $('#btn-reset-progress')?.addEventListener('click', resetProgress);
  $('#btn-open-notes')?.addEventListener('click', () => { renderNotes(); openDialog('notes-dialog'); });
  $('#btn-open-saved')?.addEventListener('click', () => { renderSaved(); openDialog('saved-dialog'); });
}

function exportProgress() {
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `mdcat-progress-${todayKey()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  toastProductivity('Progress backup downloaded.');
}

function importProgress(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      const imported = incoming.data || incoming;
      if (!imported || typeof imported !== 'object') throw new Error('Invalid backup');
      Object.assign(data, { ...DEFAULT_DATA, ...imported, settings: { ...DEFAULT_DATA.settings, ...(imported.settings || {}) } });
      saveData();
      renderProductivity();
      toastProductivity('Progress restored successfully.');
      announce('Progress backup restored.');
    } catch { toastProductivity('That file is not a valid PrepMaster backup.'); }
    event.target.value = '';
  };
  reader.readAsText(file);
}

function resetProgress() {
  if (!window.confirm('Reset your daily goal, streak, notes, and saved questions?')) return;
  Object.assign(data, structuredClone(DEFAULT_DATA));
  saveData();
  renderProductivity();
  renderNotes();
  renderSaved();
  toastProductivity('Local study progress reset.');
}

function initNotes() {
  const form = $('#note-form');
  const title = $('#note-title');
  const body = $('#note-body');
  if (!form || !title || !body) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!title.value.trim() || !body.value.trim()) return;
    data.notes.unshift({ id: crypto.randomUUID(), title: title.value.trim(), body: body.value.trim(), updatedAt: new Date().toISOString() });
    data.notes = data.notes.slice(0, 50);
    saveData();
    title.value = '';
    body.value = '';
    renderNotes();
    toastProductivity('Note saved.');
  });
  $('#notes-list')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-delete-note]');
    if (!button) return;
    data.notes = data.notes.filter((note) => note.id !== button.dataset.deleteNote);
    saveData();
    renderNotes();
  });
}

function renderNotes() {
  const list = $('#notes-list');
  if (!list) return;
  list.innerHTML = data.notes.length ? data.notes.map((note) => `<article class="note-card"><div><h4>${safeText(note.title)}</h4><p>${safeText(note.body)}</p><time>${formatDate(note.updatedAt)}</time></div><button class="icon-btn" type="button" data-delete-note="${safeText(note.id)}" aria-label="Delete ${safeText(note.title)}">×</button></article>`).join('') : '<p class="empty-state">No notes yet. Capture a tricky concept while it is fresh.</p>';
}

function saveQuestion(question, index) {
  if (!question) return;
  const id = question.id || `${question.subject}-${question.question}`;
  const exists = data.savedQuestions.some((item) => item.id === id);
  if (exists) data.savedQuestions = data.savedQuestions.filter((item) => item.id !== id);
  else data.savedQuestions.unshift({ id, index, subject: question.subject, question: question.question, explanation: question.explanation, savedAt: new Date().toISOString() });
  data.savedQuestions = data.savedQuestions.slice(0, 100);
  saveData();
  renderSaved();
  return !exists;
}

function renderSaved() {
  const list = $('#saved-list');
  const count = $('#saved-count');
  if (count) count.textContent = String(data.savedQuestions.length);
  if (!list) return;
  list.innerHTML = data.savedQuestions.length ? data.savedQuestions.map((item, index) => `<article class="saved-card"><span class="saved-index">${index + 1}</span><div><strong>${safeText(item.subject || 'MDCAT')}</strong><p>${safeText(item.question)}</p><small>Saved ${formatDate(item.savedAt)}</small></div><button class="icon-btn" data-remove-saved="${safeText(item.id)}" aria-label="Remove saved question">×</button></article>`).join('') : '<p class="empty-state">No saved questions. Use Save on a question during review.</p>';
}

function initSavedQuestionActions() {
  $('#saved-list')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove-saved]');
    if (!button) return;
    data.savedQuestions = data.savedQuestions.filter((item) => item.id !== button.dataset.removeSaved);
    saveData();
    renderSaved();
  });
}

function injectQuizSaveButton() {
  const actions = $('#question-card');
  if (!actions || $('#btn-save-current-question')) return;
  const button = document.createElement('button');
  button.className = 'question-save-btn';
  button.id = 'btn-save-current-question';
  button.type = 'button';
  button.textContent = 'Save question';
  button.addEventListener('click', () => {
    const quiz = window.__MDCAT_STATE__?.quiz;
    const question = quiz?.questions?.[quiz.current];
    const added = saveQuestion(question, quiz?.current);
    button.textContent = added ? 'Saved to library' : 'Save question';
    toastProductivity(added ? 'Question saved for revision.' : 'Question removed from saved library.');
  });
  actions.appendChild(button);
}

function initAccessibilitySettings() {
  const motion = $('#setting-reduce-motion');
  const compact = $('#setting-compact-mode');
  if (motion) {
    motion.checked = data.settings.reduceMotion;
    motion.addEventListener('change', () => { data.settings.reduceMotion = motion.checked; saveData(); document.documentElement.classList.toggle('reduce-motion', motion.checked); });
  }
  if (compact) {
    compact.checked = data.settings.compact;
    compact.addEventListener('change', () => { data.settings.compact = compact.checked; saveData(); document.documentElement.classList.toggle('compact-mode', compact.checked); });
  }
  document.documentElement.classList.toggle('reduce-motion', data.settings.reduceMotion);
  document.documentElement.classList.toggle('compact-mode', data.settings.compact);
}

function initStudyEvents() {
  document.addEventListener('quiz:complete', (event) => {
    const count = event.detail?.total || 1;
    registerStudyActivity(count, { subject: event.detail?.subject || 'Mixed' });
  });
  document.addEventListener('view:quiz', injectQuizSaveButton);
  const observer = new MutationObserver(() => {
    if ($('#view-quiz.active')) injectQuizSaveButton();
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
}

function initKeyboardHints() {
  document.addEventListener('keydown', (event) => {
    if (event.key === '?' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      openDialog('shortcuts-dialog');
    }
  });
}

function initProductivity() {
  syncDay();
  renderProductivity();
  initDialogs();
  initGoalEditor();
  initCommandPalette();
  initQuickActions();
  initNotes();
  initSavedQuestionActions();
  initAccessibilitySettings();
  initStudyEvents();
  initKeyboardHints();
  renderNotes();
  renderSaved();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initProductivity, { once: true });
else initProductivity();

window.MDCATProductivity = { data, saveQuestion, registerStudyActivity, renderProductivity, exportProgress };

// Keep this module useful in the existing non-framework app: bridge a small,
// read-only state reference when the main controller exposes its state later.
const stateBridge = setInterval(() => {
  if (window.__MDCAT_STATE__) { clearInterval(stateBridge); return; }
  const quizView = $('#view-quiz');
  if (quizView) window.__MDCAT_STATE__ = window.__MDCAT_STATE__ || {};
}, 500);
setTimeout(() => clearInterval(stateBridge), 10000);

export { data, renderProductivity, registerStudyActivity, saveQuestion };
