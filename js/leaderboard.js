
function renderLeaderboard() {
  const user = getCurrentUser();
  if (!user) return navigate('auth');
  const board = getLeaderboard();
  const myRank = board.findIndex(u => u.id === user.id) + 1;

  document.getElementById('app').innerHTML = `
<div class="app-layout">
  ${renderSidebar('leaderboard')}
  <main class="main-content">
    <div class="page-header animate-fade-in-down">
      <h1>🏆 Leaderboard & Achievement Badges</h1>
      <p>Bersaing secara sehat, raih prestasi, dan tunjukkan kemampuan literasi digitalmu!</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px">
      <!-- Leaderboard -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <h2 class="heading-sm">🥇 Peringkat Siswa</h2>
          <div class="tabs" style="margin-bottom:0;width:auto">
            <div class="tab-btn active" style="padding:6px 14px;font-size:.8rem">Minggu Ini</div>
            <div class="tab-btn" style="padding:6px 14px;font-size:.8rem">Bulan Ini</div>
          </div>
        </div>
        <!-- Top 3 Podium -->
        <div style="display:flex;justify-content:center;align-items:flex-end;gap:12px;margin-bottom:24px">
          ${[board[1],board[0],board[2]].filter(Boolean).map((u,i) => {
            const pos = i===1?1:i===0?2:3;
            const h = pos===1?120:pos===2?90:75;
            const bg = pos===1?'linear-gradient(135deg,#FFD700,#FFA000)':pos===2?'linear-gradient(135deg,#E0E0E0,#9E9E9E)':'linear-gradient(135deg,#CD7F32,#A0522D)';
            return `<div style="text-align:center;flex:1">
              <div class="avatar" style="background:${u.color};color:#fff;margin:0 auto 8px;width:48px;height:48px;font-size:1.1rem">${u.avatar}</div>
              <div style="font-size:.82rem;font-weight:700;margin-bottom:6px">${u.name.split(' ')[0]}</div>
              <div style="background:${bg};border-radius:var(--radius-md) var(--radius-md) 0 0;height:${h}px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:10px">
                <div style="color:#000;font-family:var(--font-heading);font-weight:900;font-size:1.2rem">#${pos}</div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="card">
          <div class="card-body" style="padding:0">
            <table class="leaderboard-table" style="width:100%">
              <thead><tr><th>#</th><th>Siswa</th><th>Level</th><th>XP</th></tr></thead>
              <tbody>
                ${board.map((u,i) => {
                  const isMe = u.id === user.id;
                  return `<tr style="${isMe?'background:rgba(108,60,225,.08)':''}">
                    <td><span class="rank-badge rank-${i<3?i+1:'other'}">${i+1}</span></td>
                    <td><div class="user-cell">
                      <div class="avatar" style="background:${u.color};color:#fff">${u.avatar}</div>
                      <div><div style="font-weight:600;font-size:.9rem">${u.name} ${isMe?'<span class="badge badge-primary">Kamu</span>':''}</div>
                      <div style="font-size:.75rem;color:var(--text-muted)">🔥 ${u.streak||0} hari streak</div></div>
                    </div></td>
                    <td><span class="badge badge-primary">Lv ${u.level}</span></td>
                    <td><span style="font-weight:700;color:var(--accent)">${(u.xp||0).toLocaleString()} XP</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
        ${myRank > 0 ? `<div class="card" style="margin-top:16px;padding:16px 20px;border-color:rgba(108,60,225,.3)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="color:var(--text-secondary);font-size:.88rem">Peringkatmu saat ini</span>
            <div style="display:flex;align-items:center;gap:12px">
              <span style="font-family:var(--font-heading);font-size:1.4rem;font-weight:800">#${myRank}</span>
              <span class="badge badge-primary">dari ${board.length} siswa</span>
            </div>
          </div>
        </div>` : ''}
      </div>
      <!-- Badges -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <h2 class="heading-sm">🏅 Achievement Badges</h2>
          <span class="badge badge-accent">${(getUserData(user.id)?.badges||[]).length}/${BADGES_DEF.length} Unlocked</span>
        </div>
        <div class="badges-grid animate-fade-in-right">
          ${BADGES_DEF.map(b => {
            const ud = getUserData(user.id) || user;
            const unlocked = (ud.badges||[]).includes(b.id);
            return `<div class="achievement-badge ${unlocked?'unlocked':'locked'}" onclick="${unlocked?'showBadgeDetail(\''+b.id+'\')':'showToast(\'info\',\'Badge Terkunci\',\'Selesaikan tantangan untuk membuka badge ini!\')'}">
              <div class="badge-emoji">${b.emoji}</div>
              <div class="badge-name">${b.name}</div>
              <div class="badge-desc">${b.desc}</div>
              ${unlocked ? '<div style="margin-top:8px;font-size:.72rem;color:var(--accent);font-weight:700">✨ Diraih!</div>' : ''}
            </div>`;
          }).join('')}
        </div>
        <div class="card" style="margin-top:24px;padding:20px">
          <h3 class="heading-sm mb-4" style="margin-bottom:16px">💡 Cara Mendapat Badge</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${BADGES_DEF.map(b => `<div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:1.3rem">${b.emoji}</span>
              <div style="flex:1">
                <div style="font-size:.85rem;font-weight:700">${b.name}</div>
                <div style="font-size:.78rem;color:var(--text-muted)">${b.desc}</div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>`;
}

function showBadgeDetail(badgeId) {
  const badge = BADGES_DEF.find(b => b.id === badgeId);
  if (!badge) return;
  showToast('success', badge.emoji + ' ' + badge.name, badge.desc);
  launchConfetti();
}
