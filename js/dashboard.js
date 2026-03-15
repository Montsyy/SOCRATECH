
function renderDashboard() {
  const user = getCurrentUser();
  if (!user) return navigate('auth');
  const isTeacher = user.role === 'teacher';
  const ud = getUserData(user.id) || user;
  const xpPct = Math.min(100, Math.round((ud.xp / ud.xpNext) * 100));
  let statsHtml = '';
  if (isTeacher) {
    const stats = [
      { icon:'👥', color:'rgba(108,60,225,.2)', val:'32', label:'Total Siswa', change:'+5.2%', pos:true },
      { icon:'📝', color:'rgba(0,212,255,.15)', val:'4', label:'Quiz Aktif', change:'2 selesai minggu ini', pos:true },
      { icon:'💬', color:'rgba(255,184,0,.15)', val:'186', label:'Pesan Dialog', change:'+23%', pos:true },
      { icon:'⭐', color:'rgba(0,230,118,.15)', val:'84%', label:'Rata-rata Skor', change:'+3.1%', pos:true },
    ];
    statsHtml = stats.map(s => `<div class="stat-card animate-fade-in-up">
      <div class="stat-card-icon" style="background:${s.color}">${s.icon}</div>
      <div class="stat-card-value">${s.val}</div>
      <div class="stat-card-label">${s.label}</div>
      <div class="stat-card-change ${s.pos?'positive':'negative'}">${s.pos?'↑':'↓'} ${s.change}</div>
    </div>`).join('');
  } else {
    const stats = [
      { icon:'🎯', color:'rgba(108,60,225,.2)', val:`${ud.quizScores||0}%`, label:'Skor Quiz Rata-rata', change:'+5%', pos:true },
      { icon:'💡', color:'rgba(255,184,0,.15)', val:`${ud.opinions||0}`, label:'Opini Dipublikasikan', change:'+3 minggu ini', pos:true },
      { icon:'💬', color:'rgba(0,212,255,.15)', val:`${ud.dialogues||0}`, label:'Kontribusi Dialog', change:'+8', pos:true },
      { icon:'🔥', color:'rgba(255,77,109,.15)', val:`${ud.streak||0}`, label:'Hari Streak Aktif', change:'Pertahankan!', pos:true },
    ];
    statsHtml = stats.map(s => `<div class="stat-card animate-fade-in-up">
      <div class="stat-card-icon" style="background:${s.color}">${s.icon}</div>
      <div class="stat-card-value">${s.val}</div>
      <div class="stat-card-label">${s.label}</div>
      <div class="stat-card-change positive">↑ ${s.change}</div>
    </div>`).join('');
  }
  const unlockedBadges = BADGES_DEF.filter(b => (ud.badges||[]).includes(b.id));
  const badgesHtml = unlockedBadges.slice(0,4).map(b => `
    <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,184,0,.05);border:1px solid rgba(255,184,0,.2);border-radius:var(--radius-md)">
      <span style="font-size:1.8rem">${b.emoji}</span>
      <div><div style="font-weight:700;font-size:.9rem">${b.name}</div><div style="font-size:.78rem;color:var(--text-muted)">${b.desc}</div></div>
    </div>`).join('');
  const quickActions = isTeacher ? [
    { icon:'📝', label:'Buat Quiz Baru', page:'quiz', color:'var(--primary)' },
    { icon:'📰', label:'Buat Berita Visual', page:'news', color:'var(--secondary)' },
    { icon:'💬', label:'Buka Ruang Dialog', page:'dialogue', color:'var(--accent)' },
    { icon:'📊', label:'Lihat Statistik', page:'stats', color:'var(--success)' },
  ] : [
    { icon:'📰', label:'Buat Berita Visual', page:'news', color:'var(--primary)' },
    { icon:'💬', label:'Ikuti Dialog', page:'dialogue', color:'var(--secondary)' },
    { icon:'💡', label:'Post Opini', page:'opinion', color:'var(--accent)' },
    { icon:'📝', label:'Ambil Quiz', page:'quiz', color:'var(--success)' },
  ];
  const qactHtml = quickActions.map(a => `<button class="btn btn-ghost" style="flex-direction:column;gap:8px;padding:20px;height:auto;border-radius:var(--radius-lg)" onclick="navigate('${a.page}')">
    <span style="font-size:1.8rem;filter:drop-shadow(0 0 8px ${a.color}30)">${a.icon}</span>
    <span style="font-size:.82rem;color:var(--text-secondary)">${a.label}</span>
  </button>`).join('');

  document.getElementById('app').innerHTML = `
<div class="app-layout">
  ${renderSidebar('dashboard')}
  <main class="main-content">
    <div class="page-header animate-fade-in-down">
      <h1>👋 Halo, ${user.name.split(' ')[0]}!</h1>
      <p>${isTeacher ? 'Selamat datang di dashboard guru. Pantau perkembangan siswa Anda.' : 'Lanjutkan perjalanan belajarmu hari ini!'}</p>
    </div>
    ${!isTeacher ? `
    <div class="xp-bar-container animate-fade-in-up mb-6">
      <div class="xp-bar-header">
        <div>
          <span class="xp-level-badge">⚡ Level ${ud.level}</span>
          <span style="font-size:.85rem;color:var(--text-secondary);margin-left:10px">${ud.xp} / ${ud.xpNext} XP</span>
        </div>
        <span class="badge badge-primary">${xpPct}% menuju Level ${(ud.level||1)+1}</span>
      </div>
      <div class="xp-progress-bar"><div class="xp-progress-fill" style="width:${xpPct}%"></div></div>
      <div class="xp-labels"><span>Level ${ud.level}</span><span>Level ${(ud.level||1)+1}</span></div>
    </div>` : ''}
    <div class="stats-grid">${statsHtml}</div>
    <div style="display:grid;grid-template-columns:${isTeacher?'1fr':'1fr 1fr'};gap:24px;margin-bottom:32px">
      <div class="card animate-fade-in-up">
        <div class="card-header"><h3 class="heading-sm">⚡ Aksi Cepat</h3></div>
        <div class="card-body" style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">${qactHtml}</div>
      </div>
      ${!isTeacher ? `<div class="card animate-fade-in-up delay-200">
        <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
          <h3 class="heading-sm">🏅 Badge Diraih</h3>
          <button class="btn btn-ghost btn-sm" onclick="navigate('leaderboard')">Lihat Semua</button>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          ${unlockedBadges.length > 0 ? badgesHtml : '<div class="empty-state" style="padding:30px;"><div class="empty-state-icon">🏅</div><p class="empty-state-desc">Selesaikan aktivitas untuk unlock badge!</p><button class="btn btn-primary btn-sm" onclick="navigate(\'quiz\')">Mulai Quiz</button></div>'}
        </div>
      </div>` : ''}
    </div>
    ${isTeacher ? `
    <div class="card animate-fade-in-up">
      <div class="card-header"><h3 class="heading-sm">👥 Aktivitas Siswa Terbaru</h3></div>
      <div class="card-body">
        <table class="leaderboard-table">
          <thead><tr><th>Siswa</th><th>Level</th><th>Quiz</th><th>Opini</th><th>Streak</th></tr></thead>
          <tbody>
            ${USERS.filter(u=>u.role==='student').map(u => `<tr>
              <td><div class="user-cell"><div class="avatar" style="background:${u.color};color:#fff">${u.avatar}</div>${u.name}</div></td>
              <td><span class="badge badge-primary">Lv ${u.level}</span></td>
              <td>${u.quizScores}%</td><td>${u.opinions}</td>
              <td>🔥 ${u.streak} hari</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>` : ''}
  </main>
</div>`;
}
