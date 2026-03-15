
// SOCRATECH — Main Router & Global Utilities

let currentPage = 'landing';
let sidebarOpen = false;

// ── Toast System ─────────────────────────────────────────────────────────
const TOAST_ICONS = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
function showToast(type, title, message, duration=4000) {
  const container = document.getElementById('toast-container');
  const id = 'toast-' + Date.now();
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.id = id;
  el.innerHTML = `<div class="toast-icon">${TOAST_ICONS[type]||'ℹ️'}</div>
    <div class="toast-content"><div class="toast-title">${title}</div><div class="toast-message">${message}</div></div>
    <button onclick="removeToast('${id}')" style="color:var(--text-muted);padding:4px;border-radius:8px;height:28px;width:28px;display:flex;align-items:center;justify-content:center;font-size:1rem" class="btn">✕</button>`;
  container.appendChild(el);
  setTimeout(() => el.classList.add('show'), 50);
  setTimeout(() => removeToast(id), duration);
}
function removeToast(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('show');
  setTimeout(() => el.remove(), 400);
}

// ── Confetti ─────────────────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({length:120}, () => ({
    x: Math.random()*canvas.width, y: -20,
    vx: (Math.random()-0.5)*4, vy: Math.random()*3+2,
    color: ['#6C3CE1','#00D4FF','#FFB800','#00E676','#FF4D6D','#8B5CF6','#fff'][Math.floor(Math.random()*7)],
    size: Math.random()*8+4, angle: Math.random()*360, spin: (Math.random()-0.5)*6,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.angle += p.spin;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle*Math.PI/180);
      ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, 1 - p.y/canvas.height);
      if (p.shape === 'rect') { ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6); }
      else { ctx.beginPath(); ctx.arc(0,0,p.size/2,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    frame++;
    if (frame < 180) requestAnimationFrame(draw);
    else { ctx.clearRect(0,0,canvas.width,canvas.height); }
  }
  draw();
}

// ── Modal Helpers ─────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// ── Theme ─────────────────────────────────────────────────────────────────
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next === 'dark' ? '' : 'light');
  localStorage.setItem('socratech_theme', next);
}
function initTheme() {
  const saved = localStorage.getItem('socratech_theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme','light');
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function renderNavbar() {
  const user = getCurrentUser();
  const themeIcon = document.documentElement.getAttribute('data-theme') === 'light' ? '🌙' : '☀️';
  let navLinks = '';
  let navRight = '';
  if (!user) {
    navLinks = `<a class="nav-link" onclick="navigate('landing')">Beranda</a>
      <a class="nav-link" onclick="navigate('landing','features')">Fitur</a>`;
    navRight = `<button class="btn btn-ghost btn-sm" onclick="navigate('auth')">Masuk</button>
      <button class="btn btn-primary btn-sm" onclick="navigate('auth')">Daftar Gratis</button>`;
  } else {
    navRight = `<div style="display:flex;align-items:center;gap:8px;cursor:pointer" onclick="navigate('dashboard')">
        <div class="avatar" style="background:${user.color||'var(--gradient-primary)'};color:#fff">${user.avatar||user.name[0]}</div>
        <div style="display:flex;flex-direction:column;line-height:1.2">
          <span style="font-size:.85rem;font-weight:600">${user.name}</span>
          <span style="font-size:.75rem;color:var(--text-muted)">Level ${user.level} · ${user.xp} XP</span>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm" onclick="doLogout()">Keluar</button>`;
  }
  document.getElementById('navbar').innerHTML = `<div class="container">
    <div class="nav-logo" onclick="navigate(${user?'\'dashboard\'':'\'landing\''})">
      <div class="logo-icon">🦉</div>
      <span class="logo-text">SOCRATECH</span>
    </div>
    <div class="nav-links">${navLinks}</div>
    <div class="nav-actions">
      <button class="btn btn-ghost btn-icon" onclick="toggleTheme()" title="Ganti tema" style="font-size:1.1rem">${themeIcon}</button>
      ${navRight}
      <button class="btn btn-ghost btn-icon" id="sidebar-toggle" style="display:none;font-size:1.2rem" onclick="toggleSidebar()">☰</button>
    </div>
  </div>`;
  // Show hamburger on small screens when logged in
  const btn = document.getElementById('sidebar-toggle');
  if (btn) {
    btn.style.display = (window.innerWidth <= 1024 && user) ? 'flex' : 'none';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebarOpen = !sidebarOpen;
  sidebar.classList.toggle('open', sidebarOpen);
  // Manage backdrop
  let backdrop = document.getElementById('sidebar-backdrop');
  if (sidebarOpen) {
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebar-backdrop';
      backdrop.className = 'sidebar-backdrop';
      backdrop.onclick = () => toggleSidebar();
      document.body.appendChild(backdrop);
    }
    setTimeout(() => backdrop.classList.add('visible'), 10);
  } else {
    if (backdrop) {
      backdrop.classList.remove('visible');
      setTimeout(() => backdrop.remove(), 300);
    }
  }
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function renderSidebar(activePage) {
  const user = getCurrentUser();
  if (!user) return '';
  const isTeacher = user.role === 'teacher';
  const links = [
    { icon:'🏠', label:'Dashboard', page:'dashboard' },
    { icon:'📰', label:'Visual News', page:'news' },
    { icon:'💬', label:'Dialogue Space', page:'dialogue' },
    { icon:'💡', label:'Opinion Wall', page:'opinion' },
    { icon:'📝', label:'Weekly Quiz', page:'quiz' },
    { icon:'🏆', label:'Leaderboard', page:'leaderboard' },
  ];
  const teacherLinks = [
    { icon:'📊', label:'Statistik Kelas', page:'stats' },
  ];
  let linksHtml = `<div class="sidebar-label">Menu Utama</div>`;
  links.forEach(l => {
    linksHtml += `<div class="sidebar-link ${activePage===l.page?'active':''}" onclick="navigate('${l.page}')">
      <span class="sidebar-icon">${l.icon}</span><span>${l.label}</span>
    </div>`;
  });
  if (isTeacher) {
    linksHtml += `<div class="sidebar-label">Manajemen Guru</div>`;
    teacherLinks.forEach(l => {
      linksHtml += `<div class="sidebar-link ${activePage===l.page?'active':''}" onclick="navigate('${l.page}')">
        <span class="sidebar-icon">${l.icon}</span><span>${l.label}</span>
      </div>`;
    });
  }
  linksHtml += `<div style="margin-top:auto;padding-top:16px">
    <div class="sidebar-link" onclick="doLogout()"><span class="sidebar-icon">🚪</span><span>Keluar</span></div>
  </div>`;
  return `<div class="sidebar" id="sidebar">${linksHtml}</div>`;
}

// ── Router ─────────────────────────────────────────────────────────────────
function navigate(page, anchor) {
  currentPage = page;
  sidebarOpen = false;
  // Close sidebar & remove backdrop on navigation
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (backdrop) { backdrop.classList.remove('visible'); setTimeout(() => backdrop.remove(), 300); }
  renderNavbar();
  const app = document.getElementById('app');
  app.className = 'page-enter';
  setTimeout(() => app.className = '', 400);
  switch(page) {
    case 'landing': renderLanding(); break;
    case 'auth': renderAuth(); break;
    case 'dashboard': renderDashboard(); break;
    case 'news': renderNews(); break;
    case 'dialogue': renderDialogue(); break;
    case 'opinion': renderOpinion(); break;
    case 'quiz': renderQuiz(); break;
    case 'leaderboard': renderLeaderboard(); break;
    case 'stats': renderStats(); break;
    default: renderLanding();
  }
  if (anchor) setTimeout(() => { const el = document.getElementById(anchor); if(el) el.scrollIntoView({behavior:'smooth'}); }, 200);
  window.scrollTo(0,0);
}

// ── Init ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderNavbar();
  const user = getCurrentUser();
  if (user) navigate('dashboard');
  else navigate('landing');
  window.addEventListener('resize', renderNavbar);
});
