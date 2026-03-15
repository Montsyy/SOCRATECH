
function renderNews() {
  const user = getCurrentUser();
  if (!user) return navigate('auth');
  const isTeacher = user.role === 'teacher';
  const myNews = getNewsItems().filter(n => isTeacher || n.authorId === user.id);
  
  document.getElementById('app').innerHTML = `
<div class="app-layout">
  ${renderSidebar('news')}
  <main class="main-content">
    <div class="page-header animate-fade-in-down">
      <h1>📰 Smart Visual News Generator</h1>
      <p>Transformasikan berita aktual menjadi infografis visual dengan analisis kritis terstruktur.</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:start">
      <!-- Form -->
      <div class="card animate-fade-in-left">
        <div class="card-header"><h3 class="heading-sm">✏️ Buat Berita Visual</h3></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:16px">
          <div class="form-group">
            <label class="form-label">Judul Berita</label>
            <input class="form-control" id="news-title" placeholder="Masukkan judul berita aktual..." oninput="updateNewsPreview()">
          </div>
          <div class="form-group">
            <label class="form-label">Ringkasan Isi</label>
            <textarea class="form-control" id="news-summary" rows="3" placeholder="Ringkasan singkat berita (2-3 kalimat)..." oninput="updateNewsPreview()" style="min-height:80px"></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div class="form-group">
              <label class="form-label">Kategori</label>
              <select class="form-control" id="news-category" onchange="updateNewsPreview()">
                <option value="0">Teknologi 📡</option>
                <option value="1">Lingkungan 🌊</option>
                <option value="2">Politik ⚡</option>
                <option value="3">Sosial 🌱</option>
                <option value="4">Pendidikan 💡</option>
                <option value="5">Sains 🔬</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Sudut Pandang</label>
              <select class="form-control" id="news-perspective">
                <option>Pro</option><option>Kontra</option><option>Netral</option><option>Kritis</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Analisis Kritis Sokratik</label>
            <textarea class="form-control" id="news-critical" rows="2" placeholder="Apa pertanyaan kritis yang diangkat berita ini?" oninput="updateNewsPreview()" style="min-height:70px"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Sumber Berita</label>
            <input class="form-control" id="news-source" placeholder="Kompas, CNN Indonesia, dll..." oninput="updateNewsPreview()">
          </div>
          <button class="btn btn-primary w-full" onclick="publishNews()">🚀 Publikasikan ke Opinion Wall</button>
        </div>
      </div>
      <!-- Preview -->
      <div class="animate-fade-in-right" style="display:flex;flex-direction:column;gap:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <h3 class="heading-sm">👁️ Preview Kartu Berita</h3>
          <span class="badge badge-secondary">Live Preview</span>
        </div>
        <div id="news-preview-container">
          <div class="news-preview-card" id="news-preview-card" style="background:linear-gradient(135deg,#1A0A3A,#6C3CE1)">
            <div class="news-card-header">
              <div class="news-card-meta">
                <span class="badge badge-primary" id="prev-category">Teknologi 📡</span>
                <span class="badge badge-secondary" id="prev-perspective">Pro</span>
                <span style="font-size:.75rem;color:rgba(255,255,255,.6)" id="prev-date">${new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</span>
              </div>
              <div style="font-size:3rem;margin:12px 0;filter:drop-shadow(0 0 20px rgba(108,60,225,.5))" id="prev-icon">📡</div>
            </div>
            <div class="news-card-body">
              <div class="news-card-title" id="prev-title">Judul berita akan muncul di sini...</div>
              <div class="news-card-summary" id="prev-summary">Ringkasan berita akan ditampilkan di sini. Masukkan teks di form sebelah kiri untuk melihat preview.</div>
              <div class="news-critical-tag" id="prev-critical" style="display:none">
                <strong>💡 Analisis Kritis:</strong> <span id="prev-critical-text"></span>
              </div>
              <div style="margin-top:12px;display:flex;align-items:center;gap:8px">
                <span style="font-size:.75rem;color:rgba(255,255,255,.5)">Sumber:</span>
                <span style="font-size:.75rem;color:rgba(255,255,255,.7)" id="prev-source">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- News Feed -->
    <div style="margin-top:40px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h2 class="heading-sm">📚 Berita Visual ${isTeacher ? 'Semua Siswa' : 'Saya'}</h2>
        <span class="badge badge-secondary">${myNews.length} berita</span>
      </div>
      <div id="news-feed" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px">
        ${renderNewsFeed(myNews)}
      </div>
    </div>
  </main>
</div>`;
}

function updateNewsPreview() {
  const title = document.getElementById('news-title')?.value || '';
  const summary = document.getElementById('news-summary')?.value || '';
  const catIdx = parseInt(document.getElementById('news-category')?.value || '0');
  const perspective = document.getElementById('news-perspective')?.value || 'Netral';
  const critical = document.getElementById('news-critical')?.value || '';
  const source = document.getElementById('news-source')?.value || '';
  const template = NEWS_TEMPLATES[catIdx];
  const card = document.getElementById('news-preview-card');
  if (card) card.style.background = template.gradient;
  setText('prev-title', title || 'Judul berita akan muncul di sini...');
  setText('prev-summary', summary || 'Ringkasan berita akan ditampilkan di sini.');
  setText('prev-icon', template.icon);
  setText('prev-category', template.category + ' ' + template.icon);
  setText('prev-perspective', perspective);
  setText('prev-source', source || '—');
  const critEl = document.getElementById('prev-critical');
  const critText = document.getElementById('prev-critical-text');
  if (critEl && critText) {
    critEl.style.display = critical ? 'block' : 'none';
    critText.textContent = critical;
  }
}

function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

function publishNews() {
  const user = getCurrentUser();
  const title = document.getElementById('news-title')?.value.trim();
  const summary = document.getElementById('news-summary')?.value.trim();
  if (!title || !summary) return showToast('warning','Form Belum Lengkap','Isi judul dan ringkasan terlebih dahulu.');
  const catIdx = parseInt(document.getElementById('news-category')?.value || '0');
  const template = NEWS_TEMPLATES[catIdx];
  const newItem = {
    id: Date.now(), authorId: user.id, authorName: user.name, authorAvatar: user.avatar, authorColor: user.color,
    title, summary, critical: document.getElementById('news-critical')?.value,
    source: document.getElementById('news-source')?.value,
    perspective: document.getElementById('news-perspective')?.value,
    category: template.category, icon: template.icon, gradient: template.gradient,
    timestamp: new Date().toISOString()
  };
  const items = getNewsItems();
  items.unshift(newItem);
  saveNewsItems(items);
  const ud = addXP(user.id, 30, 'Membuat berita visual');
  if (getCurrentUser()) setCurrentUser({...getCurrentUser(), ...ud});
  showToast('success','Berita Dipublikasikan! 🎉','+30 XP telah ditambahkan ke akunmu!');
  document.getElementById('news-title').value = '';
  document.getElementById('news-summary').value = '';
  document.getElementById('news-critical').value = '';
  document.getElementById('news-source').value = '';
  updateNewsPreview();
  document.getElementById('news-feed').innerHTML = renderNewsFeed(getNewsItems().filter(n => n.authorId===user.id || getCurrentUser()?.role==='teacher'));
}

function renderNewsFeed(items) {
  if (!items || items.length === 0) return `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">📰</div><div class="empty-state-title">Belum Ada Berita Visual</div><div class="empty-state-desc">Buat berita visualmu yang pertama!</div></div>`;
  return items.slice(0,9).map(n => `
    <div class="news-preview-card" style="background:${n.gradient};cursor:pointer">
      <div class="news-card-header" style="padding:20px">
        <div class="news-card-meta">
          <span class="badge badge-primary" style="background:rgba(0,0,0,.3);border-color:rgba(255,255,255,.2);color:#fff">${n.category}</span>
          <span style="font-size:.75rem;color:rgba(255,255,255,.6)">${formatTime(n.timestamp)}</span>
        </div>
        <div style="font-size:2rem;margin:8px 0">${n.icon}</div>
      </div>
      <div class="news-card-body" style="padding:16px">
        <div style="font-size:.95rem;font-weight:700;color:#fff;margin-bottom:6px;line-height:1.3">${n.title}</div>
        <div style="font-size:.8rem;color:rgba(255,255,255,.75);line-height:1.5">${n.summary.substring(0,100)}${n.summary.length>100?'...':''}</div>
        <div style="margin-top:10px;display:flex;align-items:center;gap:8px">
          <div class="avatar" style="width:24px;height:24px;font-size:.7rem;background:${n.authorColor};color:#fff">${n.authorAvatar}</div>
          <span style="font-size:.75rem;color:rgba(255,255,255,.6)">${n.authorName}</span>
        </div>
      </div>
    </div>`).join('');
}
