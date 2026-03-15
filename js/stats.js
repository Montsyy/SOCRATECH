
function renderStats() {
  const user = getCurrentUser();
  if (!user || user.role !== 'teacher') return navigate('dashboard');
  const students = USERS.filter(u => u.role === 'student');
  
  document.getElementById('app').innerHTML = `
<div class="app-layout">
  ${renderSidebar('stats')}
  <main class="main-content">
    <div class="page-header animate-fade-in-down">
      <h1>📊 Statistik Kelas</h1>
      <p>Pantau perkembangan seluruh siswa secara menyeluruh dan real-time.</p>
    </div>
    <div class="stats-grid">
      <div class="stat-card animate-fade-in-up">
        <div class="stat-card-icon" style="background:rgba(108,60,225,.2)">👥</div>
        <div class="stat-card-value">${students.length}</div>
        <div class="stat-card-label">Total Siswa Aktif</div>
        <div class="stat-card-change positive">↑ Semua aktif minggu ini</div>
      </div>
      <div class="stat-card animate-fade-in-up delay-100">
        <div class="stat-card-icon" style="background:rgba(0,230,118,.15)">🎯</div>
        <div class="stat-card-value">${Math.round(students.reduce((s,u)=>s+(u.quizScores||0),0)/students.length)}%</div>
        <div class="stat-card-label">Rata-rata Skor Quiz</div>
        <div class="stat-card-change positive">↑ +3.2% dari minggu lalu</div>
      </div>
      <div class="stat-card animate-fade-in-up delay-200">
        <div class="stat-card-icon" style="background:rgba(0,212,255,.15)">💬</div>
        <div class="stat-card-value">${students.reduce((s,u)=>s+(u.dialogues||0),0)}</div>
        <div class="stat-card-label">Total Kontribusi Dialog</div>
        <div class="stat-card-change positive">↑ +18 hari ini</div>
      </div>
      <div class="stat-card animate-fade-in-up delay-300">
        <div class="stat-card-icon" style="background:rgba(255,184,0,.15)">💡</div>
        <div class="stat-card-value">${students.reduce((s,u)=>s+(u.opinions||0),0)}</div>
        <div class="stat-card-label">Total Opini Dipublikasikan</div>
        <div class="stat-card-change positive">↑ +7 hari ini</div>
      </div>
    </div>
    <div class="card animate-fade-in-up">
      <div class="card-header">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h3 class="heading-sm">📋 Detail Per Siswa</h3>
          <input class="form-control" style="width:200px;padding:8px 12px;font-size:.85rem" placeholder="🔍 Cari siswa..." oninput="filterStudents(this.value)">
        </div>
      </div>
      <div class="card-body" style="padding:0">
        <table class="leaderboard-table" id="students-table">
          <thead><tr><th>Siswa</th><th>Level & XP</th><th>Quiz</th><th>Opini</th><th>Dialog</th><th>Streak</th><th>Badge</th></tr></thead>
          <tbody id="students-tbody">
            ${students.map(u => `<tr id="student-row-${u.id}">
              <td><div class="user-cell"><div class="avatar" style="background:${u.color};color:#fff">${u.avatar}</div>
                <div><div style="font-weight:600">${u.name}</div><div style="font-size:.75rem;color:var(--text-muted)">${u.email}</div></div>
              </div></td>
              <td><span class="badge badge-primary">Lv ${u.level}</span> <span style="font-size:.8rem;color:var(--text-muted)">${(u.xp||0)} XP</span></td>
              <td><span style="font-weight:700;color:${(u.quizScores||0)>=85?'var(--success)':(u.quizScores||0)>=70?'var(--accent)':'var(--danger)'}">${u.quizScores||0}%</span></td>
              <td>${u.opinions||0}</td><td>${u.dialogues||0}</td>
              <td><span style="color:var(--accent)">🔥 ${u.streak||0} hari</span></td>
              <td>${(u.badges||[]).length}/${BADGES_DEF.length}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </main>
</div>`;
}

function filterStudents(query) {
  const rows = document.querySelectorAll('[id^=student-row-]');
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    r.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
}
