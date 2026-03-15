
function renderOpinion() {
  const user = getCurrentUser();
  if (!user) return navigate('auth');
  const ops = getOpinions();
  
  document.getElementById('app').innerHTML = `
<div class="app-layout">
  ${renderSidebar('opinion')}
  <main class="main-content">
    <div class="page-header animate-fade-in-down">
      <h1>💡 Student Opinion Wall</h1>
      <p>Ekspresikan pandanganmu tentang isu-isu literasi digital dan dapatkan apresiasi dari sesama.</p>
    </div>
    <div class="card animate-fade-in-up mb-6">
      <div class="card-header"><h3 class="heading-sm">✏️ Tulis Opini Baru</h3></div>
      <div class="card-body" style="display:flex;flex-direction:column;gap:14px">
        <textarea class="form-control" id="opinion-text" rows="3" placeholder="Bagikan pemikiranmu tentang literasi digital, media sosial, atau isu aktual..."></textarea>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <select class="form-control" id="opinion-category" style="width:auto;flex:1;min-width:150px">
            <option>Media Sosial</option><option>Hoaks</option><option>Teknologi</option>
            <option>Pendidikan</option><option>Sosial</option><option>Etika Digital</option>
          </select>
          <input class="form-control" id="opinion-tag" placeholder="Tag (cth: AI, Literasi)" style="flex:1;min-width:150px">
          <button class="btn btn-primary" onclick="postOpinion()">💡 Publikasikan Opini</button>
        </div>
      </div>
    </div>
    <!-- Filter Bar -->
    <div style="display:flex;gap:10px;margin-bottom:24px;flex-wrap:wrap;align-items:center">
      <span style="font-size:.85rem;color:var(--text-muted);font-weight:600">Filter:</span>
      <button class="btn btn-ghost btn-sm active-filter" onclick="filterOpinions('all',this)" id="filter-all">Semua</button>
      <button class="btn btn-ghost btn-sm" onclick="filterOpinions('popular',this)" id="filter-popular">🔥 Terpopuler</button>
      <button class="btn btn-ghost btn-sm" onclick="filterOpinions('pinned',this)" id="filter-pinned">📌 Dipinkan</button>
    </div>
    <div class="opinion-grid animate-fade-in-up" id="opinion-grid">
      ${renderOpinionCards(ops, user)}
    </div>
  </main>
</div>
<div id="modal-delete" class="modal-overlay">
  <div class="modal" style="max-width:380px">
    <div class="modal-header"><h3>Hapus Opini?</h3><div class="modal-close" onclick="closeModal('modal-delete')">✕</div></div>
    <div class="modal-body"><p style="color:var(--text-secondary)">Opini yang dihapus tidak dapat dikembalikan.</p></div>
    <div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal('modal-delete')">Batal</button><button class="btn btn-accent" onclick="confirmDeleteOpinion()">Hapus</button></div>
  </div>
</div>`;
}

function renderOpinionCards(ops, user) {
  if (!ops || ops.length === 0) return `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">💡</div><div class="empty-state-title">Belum Ada Opini</div><div class="empty-state-desc">Jadilah yang pertama berbagi opini!</div></div>`;
  return ops.map(op => {
    const isOwn = op.authorId === user.id;
    const total = Object.values(op.reactions).reduce((a,b)=>a+b,0);
    const r = op.userReactions || {};
    return `
    <div class="opinion-card animate-fade-in-up" id="opinion-${op.id}">
      <div class="opinion-header">
        <div class="avatar" style="background:${op.authorColor};color:#fff">${op.authorAvatar}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:.9rem">${op.authorName} ${op.pinned?'<span class="badge badge-accent">📌 Pilihan Guru</span>':''}</div>
          <div style="font-size:.75rem;color:var(--text-muted)">${formatTime(op.timestamp)}</div>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <span class="badge badge-secondary">${op.category}</span>
          ${op.tag ? `<span class="badge badge-primary">${op.tag}</span>` : ''}
          ${isOwn ? `<button class="btn btn-ghost btn-sm btn-icon" onclick="deleteOpinion(${op.id})" title="Hapus" style="color:var(--danger);font-size:1rem">🗑️</button>` : ''}
        </div>
      </div>
      <div class="opinion-content">${op.content}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div class="opinion-reactions">
          <button class="reaction-btn ${r.setuju?'reacted':''}" onclick="reactOpinion(${op.id},'setuju')">👍 Setuju <span id="react-setuju-${op.id}">${op.reactions.setuju||0}</span></button>
          <button class="reaction-btn ${r.perlu_dikaji?'reacted':''}" onclick="reactOpinion(${op.id},'perlu_dikaji')">🤔 Perlu Dikaji <span id="react-perlu-${op.id}">${op.reactions.perlu_dikaji||0}</span></button>
          <button class="reaction-btn ${r.insight?'reacted':''}" onclick="reactOpinion(${op.id},'insight')">💡 Insight <span id="react-insight-${op.id}">${op.reactions.insight||0}</span></button>
        </div>
        <span style="font-size:.78rem;color:var(--text-muted)">${total} reaksi</span>
      </div>
    </div>`;
  }).join('');
}

function postOpinion() {
  const user = getCurrentUser();
  const text = document.getElementById('opinion-text').value.trim();
  const cat = document.getElementById('opinion-category').value;
  const tag = document.getElementById('opinion-tag').value.trim();
  if (!text) return showToast('warning','Form kosong','Tulis opinimu terlebih dahulu.');
  const newOp = {
    id: Date.now(), authorId: user.id, authorName: user.name, authorAvatar: user.avatar, authorColor: user.color,
    category: cat, tag: tag, content: text, reactions:{setuju:0,perlu_dikaji:0,insight:0}, userReactions:{},
    timestamp: new Date().toISOString(), pinned: false
  };
  const ops = getOpinions();
  ops.unshift(newOp);
  saveOpinions(ops);
  addXP(user.id, 20, 'Memposting opini');
  showToast('success','Opini Dipublikasikan! 💡','+20 XP ditambahkan ke akunmu!');
  document.getElementById('opinion-text').value = '';
  document.getElementById('opinion-grid').innerHTML = renderOpinionCards(getOpinions(), user);
}

let pendingDeleteId = null;
function deleteOpinion(id) { pendingDeleteId = id; openModal('modal-delete'); }
function confirmDeleteOpinion() {
  const ops = getOpinions().filter(o => o.id !== pendingDeleteId);
  saveOpinions(ops);
  closeModal('modal-delete');
  showToast('info','Opini dihapus','Opinimu berhasil dihapus.');
  document.getElementById('opinion-grid').innerHTML = renderOpinionCards(getOpinions(), getCurrentUser());
}

function reactOpinion(opId, type) {
  const user = getCurrentUser();
  const ops = getOpinions();
  const op = ops.find(o => o.id === opId);
  if (!op) return;
  if (!op.userReactions) op.userReactions = {};
  if (op.userReactions[type]) {
    op.reactions[type] = Math.max(0, (op.reactions[type]||0) - 1);
    delete op.userReactions[type];
  } else {
    op.reactions[type] = (op.reactions[type]||0) + 1;
    op.userReactions[type] = true;
    addXP(user.id, 2, 'Memberikan reaksi');
  }
  saveOpinions(ops);
  document.getElementById('opinion-grid').innerHTML = renderOpinionCards(getOpinions(), user);
}

function filterOpinions(type, btn) {
  const user = getCurrentUser();
  document.querySelectorAll('[id^=filter-]').forEach(b => b.classList.remove('btn-primary'));
  btn.classList.add('btn-primary');
  let ops = getOpinions();
  if (type === 'popular') ops = [...ops].sort((a,b) => Object.values(b.reactions).reduce((s,v)=>s+v,0) - Object.values(a.reactions).reduce((s,v)=>s+v,0));
  if (type === 'pinned') ops = ops.filter(o => o.pinned);
  document.getElementById('opinion-grid').innerHTML = renderOpinionCards(ops, user);
}
