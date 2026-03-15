
function renderAuth() {
  let activeTab = 'login';
  let selectedRole = 'student';
  document.getElementById('app').innerHTML = `
<div id="page-auth">
  <div class="auth-card animate-scale-in">
    <div class="auth-header">
      <div class="auth-logo">🦉</div>
      <h2 class="heading-md">SOCRATECH</h2>
      <p class="text-secondary" style="font-size:.9rem;margin-top:6px">Platform Literasi Digital Gamifikasi</p>
    </div>
    <div class="auth-body">
      <div class="auth-tabs">
        <div class="auth-tab active" id="tab-login" onclick="switchAuthTab('login')">Masuk</div>
        <div class="auth-tab" id="tab-register" onclick="switchAuthTab('register')">Daftar</div>
      </div>
      <div id="auth-form-container"></div>
    </div>
  </div>
</div>`;
  renderLoginForm();
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  if (tab === 'login') renderLoginForm();
  else renderRegisterForm();
}

function renderLoginForm() {
  const demoAccounts = [
    { id:1, name:'Budi Santoso', role:'student', email:'budi@student.sch' },
    { id:6, name:'Pak Ahmad', role:'teacher', email:'ahmad@guru.sch' },
  ];
  let html = `<p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:16px">Login cepat sebagai:</p>
  <div style="display:grid;gap:10px;margin-bottom:20px">`;
  demoAccounts.forEach(u => {
    html += `<button class="btn btn-ghost w-full" style="justify-content:flex-start;gap:12px" onclick="quickLogin(${u.id})">
      <span style="width:32px;height:32px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.8rem;color:white">${u.avatar||u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</span>
      <span><strong>${u.name}</strong> <span class="badge badge-${u.role==='teacher'?'accent':'primary'}" style="margin-left:6px">${u.role==='teacher'?'Guru':'Siswa'}</span></span>
    </button>`;
  });
  html += `</div>
  <div class="divider"></div>
  <div style="display:flex;flex-direction:column;gap:14px">
    <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="login-email" type="email" placeholder="email@sekolah.sch"></div>
    <div class="form-group"><label class="form-label">Password</label><input class="form-control" id="login-pass" type="password" placeholder="••••••••"></div>
    <button class="btn btn-primary w-full" style="margin-top:4px" onclick="doLogin()">Masuk ke Platform</button>
  </div>`;
  document.getElementById('auth-form-container').innerHTML = html;
}

function renderRegisterForm() {
  let html = `<div style="display:flex;flex-direction:column;gap:14px">
    <div class="form-group"><label class="form-label">Nama Lengkap</label><input class="form-control" id="reg-name" placeholder="Nama Lengkap" type="text"></div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="reg-email" type="email" placeholder="email@sekolah.sch"></div>
    <div class="form-group"><label class="form-label">Daftar Sebagai</label>
      <div class="auth-role-select">
        <div class="role-option active" id="role-student" onclick="selectRole('student')"><div class="role-option-icon">🎓</div><div class="role-option-label">Siswa</div></div>
        <div class="role-option" id="role-teacher" onclick="selectRole('teacher')"><div class="role-option-icon">👨‍🏫</div><div class="role-option-label">Guru</div></div>
      </div>
    </div>
    <div class="form-group"><label class="form-label">Password</label><input class="form-control" id="reg-pass" type="password" placeholder="••••••••"></div>
    <button class="btn btn-primary w-full" onclick="doRegister()">Buat Akun</button>
  </div>`;
  document.getElementById('auth-form-container').innerHTML = html;
}

function selectRole(role) {
  document.querySelectorAll('.role-option').forEach(r => r.classList.remove('active'));
  document.getElementById('role-'+role).classList.add('active');
  window._selectedRole = role;
}

function quickLogin(userId) {
  const user = USERS.find(u => u.id === userId);
  if (!user) return;
  setCurrentUser(user);
  showToast('success','Berhasil Masuk!',`Selamat datang, ${user.name}! 🎉`);
  setTimeout(() => { navigate('dashboard'); }, 500);
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const user = USERS.find(u => u.email === email);
  if (!user) return showToast('error','Login Gagal','Email tidak ditemukan.');
  setCurrentUser(user);
  showToast('success','Berhasil Masuk!',`Selamat datang kembali, ${user.name}!`);
  setTimeout(() => navigate('dashboard'), 500);
}

function doRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const role = window._selectedRole || 'student';
  if (!name || !email) return showToast('error','Error','Lengkapi semua field.');
  const initials = name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  const colors = ['#6C3CE1','#00D4FF','#FFB800','#00E676','#FF4D6D','#8B5CF6'];
  const newUser = { id: Date.now(), name, role, email, avatar: initials, color: colors[Math.floor(Math.random()*colors.length)], level:1, xp:0, xpNext:500, badges:[], streak:0, quizScores:0, opinions:0, dialogues:0 };
  USERS.push(newUser);
  setCurrentUser(newUser);
  showToast('success','Akun Dibuat!',`Selamat bergabung, ${name}! 🚀`);
  setTimeout(() => navigate('dashboard'), 500);
}

function doLogout() {
  clearCurrentUser();
  showToast('info','Sampai Jumpa!','Kamu telah keluar dari platform.');
  setTimeout(() => navigate('landing'), 500);
}
