
function renderLanding() {
  const feats = [
    { icon:'📰', color:'#6C3CE1', bg:'rgba(108,60,225,.2)', title:'Smart Visual News Generator', desc:'Ubah berita aktual menjadi infografis visual yang menarik dengan analisis kritis terstruktur.' },
    { icon:'💬', color:'#00D4FF', bg:'rgba(0,212,255,.15)', title:'Student Dialogue Space', desc:'Ruang diskusi interaktif dengan panduan pertanyaan Sokratik AI untuk mempertajam argumen.' },
    { icon:'💡', color:'#FFB800', bg:'rgba(255,184,0,.15)', title:'Student Opinion Wall', desc:'Platform ekspresi opini siswa dengan sistem reaksi dan kurasi opini terbaik mingguan.' },
    { icon:'📝', color:'#00E676', bg:'rgba(0,230,118,.15)', title:'Weekly Mini Quiz', desc:'Kuis mingguan berbasis literasi dengan timer, feedback instan, dan pelacakan progres.' },
    { icon:'🏆', color:'#FF4D6D', bg:'rgba(255,77,109,.15)', title:'Leaderboard & Badges', desc:'Sistem gamifikasi dengan poin XP, level, dan badge pencapaian untuk motivasi belajar.' },
    { icon:'🔬', color:'#8B5CF6', bg:'rgba(139,92,246,.15)', title:'Inkuiri Sokratik Digital', desc:'Model dialog berbasis metode Sokratik untuk membangun kemampuan berpikir kritis mendalam.' },
  ];
  const novelty = [
    { num:'01', title:'Visual News Transformation', desc:'Sistem otomatis transformasi berita keras menjadi visual digital yang mudah dipahami.', tag:'Sistem Baru' },
    { num:'02', title:'Socratic Digital Dialogue', desc:'Model dialog digital berbasis metode filsafat Sokratik untuk pendidikan kritis abad 21.', tag:'Inovasi Pedagogik' },
    { num:'03', title:'Student Opinion Ecosystem', desc:'Ekosistem opini siswa yang terstruktur dengan sistem validasi dan apresiasi peer-to-peer.', tag:'Ekosistem Sosial' },
    { num:'04', title:'Gamified Critical Literacy', desc:'Pendekatan gamifikasi yang mengintegrasikan literasi kritis ke dalam pengalaman belajar menyenangkan.', tag:'Gamifikasi' },
  ];
  let featsHtml = feats.map(f => `
    <div class="feature-card animate-fade-in-up">
      <div class="feature-icon" style="background:${f.bg}"><span style="color:${f.color}">${f.icon}</span></div>
      <div class="feature-title">${f.title}</div>
      <div class="feature-desc">${f.desc}</div>
    </div>`).join('');
  let noveltyHtml = novelty.map((n,i) => `
    <div class="card animate-fade-in-up delay-${(i+1)*100}" style="padding:28px">
      <div style="display:flex;align-items:flex-start;gap:20px">
        <div style="font-family:var(--font-heading);font-size:3rem;font-weight:900;color:var(--border-glow);line-height:1">${n.num}</div>
        <div>
          <div class="badge badge-primary" style="margin-bottom:10px">${n.tag}</div>
          <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:8px">${n.title}</h3>
          <p style="color:var(--text-secondary);font-size:.9rem;line-height:1.7">${n.desc}</p>
        </div>
      </div>
    </div>`).join('');
  document.getElementById('app').innerHTML = `
<div id="page-landing">
  <nav id="landing-nav"></nav>
  <!-- Hero -->
  <section class="hero-section">
    <div class="hero-bg">
      <div class="hero-grid"></div>
      <div class="hero-blob hero-blob-1 animate-blob"></div>
      <div class="hero-blob hero-blob-2 animate-blob" style="animation-delay:-4s"></div>
      <div class="hero-blob hero-blob-3 animate-blob" style="animation-delay:-8s"></div>
    </div>
    <div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;position:relative;z-index:1">
      <div class="hero-content">
        <div class="hero-tag animate-fade-in-down"><div class="hero-tag-dot"></div> Platform Literasi Digital Generasi Z</div>
        <h1 class="heading-xl hero-title animate-fade-in-up">
          Belajar Kritis <span class="text-gradient">Lebih Seru</span> dengan SOCRATECH
        </h1>
        <p class="hero-subtitle animate-fade-in-up delay-200">Platform LMS gamifikasi berbasis inkuiri Sokratik dan transformasi visual berita untuk meningkatkan kesadaran kritis siswa SMA.</p>
        <div class="hero-actions animate-fade-in-up delay-300">
          <button class="btn btn-primary btn-lg" onclick="navigate('auth')">🚀 Mulai Sekarang</button>
          <button class="btn btn-secondary btn-lg" onclick="navigate('landing','features')">Lihat Fitur →</button>
        </div>
        <div class="hero-stats animate-fade-in-up delay-400">
          <div><div class="hero-stat-value">500+</div><div class="hero-stat-label">Siswa Aktif</div></div>
          <div><div class="hero-stat-value">98%</div><div class="hero-stat-label">Kepuasan Pengguna</div></div>
          <div><div class="hero-stat-value">1,240</div><div class="hero-stat-label">Opini Dipublikasikan</div></div>
        </div>
      </div>
      <div style="position:relative;height:500px;display:none" id="hero-visual">
        <!-- Floating Cards -->
        <div class="floating-card floating-card-1">🏆 Budi naik ke Level 8!</div>
        <div class="floating-card floating-card-2">📰 Berita Visual Baru Tersedia</div>
        <div class="floating-card floating-card-3">💬 42 Siswa Aktif Berdiskusi</div>
      </div>
    </div>
  </section>
  <!-- Features -->
  <section class="section" id="features" style="background:var(--bg-secondary)">
    <div class="container">
      <div class="section-header">
        <div class="section-tag">✨ Fitur Unggulan</div>
        <h2 class="heading-lg section-title">Semua yang Kamu Butuhkan untuk <span class="text-gradient">Berpikir Kritis</span></h2>
        <p class="section-subtitle">Enam fitur inovatif yang dirancang khusus untuk membangun kemampuan literasi digital dan berpikir kritis siswa SMA.</p>
      </div>
      <div class="features-grid">${featsHtml}</div>
    </div>
  </section>
  <!-- Novelty -->
  <section class="section" id="novelty">
    <div class="container">
      <div class="section-header">
        <div class="section-tag">💎 Kebaruan Platform</div>
        <h2 class="heading-lg section-title">4 Inovasi yang Membuat <span class="text-gradient">SOCRATECH Unik</span></h2>
        <p class="section-subtitle">Keunikan platform yang menggabungkan pedagogi Sokratik dengan teknologi modern untuk pengalaman belajar yang belum pernah ada.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px">${noveltyHtml}</div>
    </div>
  </section>
  <!-- CTA -->
  <section class="section" style="background:var(--bg-secondary)">
    <div class="container">
      <div style="max-width:640px;margin:0 auto;text-align:center;padding:48px;background:var(--gradient-card);border:1px solid var(--border-glow);border-radius:var(--radius-xl)">
        <div style="font-size:3rem;margin-bottom:20px">🦉</div>
        <h2 class="heading-lg" style="margin-bottom:16px">Siap Memulai Perjalanan <span class="text-gradient">Berpikir Kritis</span>?</h2>
        <p style="color:var(--text-secondary);margin-bottom:32px;font-size:1rem">Bergabung dengan ratusan siswa dan guru yang sudah membuktikan efektivitas SOCRATECH dalam membangun literasi digital.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary btn-lg" onclick="navigate('auth')">🎓 Daftar sebagai Siswa</button>
          <button class="btn btn-secondary btn-lg" onclick="navigate('auth')">👨‍🏫 Daftar sebagai Guru</button>
        </div>
      </div>
    </div>
  </section>
  <!-- Footer -->
  <footer style="background:var(--bg-primary);border-top:1px solid var(--border);padding:40px 0">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px">
      <div class="nav-logo"><div class="logo-icon">🦉</div><span class="logo-text">SOCRATECH</span></div>
      <p style="color:var(--text-muted);font-size:.85rem">Inovasi Platform Literasi Digital Gamifikasi untuk SMA &copy; 2026</p>
    </div>
  </footer>
</div>`;
  // Show hero visual on large screens
  if (window.innerWidth > 900) {
    const hv = document.getElementById('hero-visual');
    if (hv) hv.style.display = 'block';
  }
}
