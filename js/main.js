/* ==========================================================================
       [JS MODULE 1: DATA MOCK & LOCAL STORAGE]
       Menangani simulasi database dan fungsi pembantu penyimpanan sesi.
    ========================================================================== 
    */
    const USERS = [
      { id:1, name:'Budi Santoso', role:'student', email:'budi@student.sch', avatar:'BS', color:'#54AEF7', level:8, xp:7840, xpNext:8500, badges:['quiz_master','socratic_scholar','rising_star'], streak:12, quizScores:92, opinions:23, dialogues:47 },
      { id:2, name:'Sari Dewi', role:'student', email:'sari@student.sch', avatar:'SD', color:'#FFC338', level:7, xp:6200, xpNext:7000, badges:['news_analyst','opinion_leader'], streak:8, quizScores:88, opinions:31, dialogues:38 },
      { id:3, name:'Arif Rahman', role:'student', email:'arif@student.sch', avatar:'AR', color:'#FFC338', level:6, xp:5100, xpNext:6000, badges:['rising_star'], streak:5, quizScores:79, opinions:15, dialogues:29 },
      { id:4, name:'Maya Putri', role:'student', email:'maya@student.sch', avatar:'MP', color:'#00E676', level:5, xp:4300, xpNext:5000, badges:['quiz_master'], streak:3, quizScores:85, opinions:19, dialogues:22 },
      { id:5, name:'Reza Hidayat', role:'student', email:'reza@student.sch', avatar:'RH', color:'#FF4D6D', level:4, xp:3100, xpNext:4000, badges:[], streak:2, quizScores:71, opinions:11, dialogues:17 },
      { id:6, name:'Pak Ahmad', role:'teacher', email:'ahmad@guru.sch', avatar:'PA', color:'#8ACAF9', level:10, xp:9999, xpNext:9999, badges:['quiz_master','socratic_scholar','news_analyst','opinion_leader','rising_star','critical_thinker'], streak:30, quizScores:100, opinions:5, dialogues:120 },
      { id:7, name:'Bu Fatimah', role:'teacher', email:'fatimah@guru.sch', avatar:'BF', color:'#F59E0B', level:10, xp:9999, xpNext:9999, badges:['quiz_master','news_analyst'], streak:25, quizScores:100, opinions:3, dialogues:95 },
    ];

    const BADGES_DEF = [
      { id:'quiz_master', icon:'<i class="ph-fill ph-medal"></i>', name:'Quiz Master', desc:'Selesaikan 10 quiz dengan skor sempurna', maxProgress:10 },
      { id:'socratic_scholar', icon:'<i class="ph-fill ph-chats-circle"></i>', name:'Socratic Scholar', desc:'50 kontribusi dalam dialog', maxProgress:50 },
      { id:'news_analyst', icon:'<i class="ph-fill ph-newspaper-clipping"></i>', name:'News Analyst', desc:'Buat 20 berita visual', maxProgress:20 },
      { id:'opinion_leader', icon:'<i class="ph-fill ph-star"></i>', name:'Opinion Leader', desc:'Terima 100 reaksi di Opinion Wall', maxProgress:100 },
      { id:'rising_star', icon:'<i class="ph-fill ph-rocket-launch"></i>', name:'Rising Star', desc:'Aktif 7 hari berturut-turut', maxProgress:7 },
      { id:'critical_thinker', icon:'<i class="ph-fill ph-target"></i>', name:'Critical Thinker', desc:'Kumpulkan semua badge lainnya', maxProgress:5 },
    ];

    const QUIZZES = [
      {
        id:1, title:'Literasi Media Digital: Fakta vs Hoaks', topic:'Literasi Media', deadline:'2026-03-22', duration:15,
        totalPoints:100, createdBy:'Pak Ahmad', difficulty:'Sedang', participants:28,
        questions:[
          { id:1, text:'Apa yang dimaksud dengan "filter bubble" dalam konsumsi berita digital?', options:['Fitur filter foto di media sosial','Fenomena di mana algoritma hanya menampilkan konten sesuai preferensi pengguna','Teknik editing video','Program pemerintah untuk sensor internet'], correct:1, explanation:'Filter bubble terjadi saat algoritma platform digital membatasi informasi yang kita terima sesuai kebiasaan dan preferensi kita, menciptakan "gelembung" informasi.' },
          { id:2, text:'Manakah yang BUKAN merupakan ciri berita hoaks?', options:['Judul sensasional dan provokatif','Tidak ada sumber yang jelas','Fakta dapat diverifikasi oleh banyak sumber terpercaya','Gambar tidak relevan dengan konten'], correct:2, explanation:'Berita yang faktanya dapat diverifikasi oleh banyak sumber terpercaya justru merupakan ciri berita yang valid, bukan hoaks.' },
          { id:3, text:'Metode SIFT dalam verifikasi informasi digital singkatan dari?', options:['Stop, Investigate, Find, Track','Search, Identify, Filter, Test','Stop, Investigate the source, Find better coverage, Trace claims','Sort, Identify, Find, Transfer'], correct:2, explanation:'SIFT = Stop (berhenti sejenak), Investigate the source (investigasi sumber), Find better coverage (cari liputan lebih baik), Trace claims (lacak klaim ke sumber asli).' },
          { id:4, text:'Apa yang dimaksud dengan "deepfake" dalam konteks disinformasi?', options:['Berita yang sangat dalam analisisnya','Konten media yang dimanipulasi menggunakan AI untuk membuat orang terlihat berkata/melakukan hal yang tidak pernah dilakukan','Jenis kriptografi data','Platform media sosial bawah tanah'], correct:1, explanation:'Deepfake adalah konten video/audio yang dimanipulasi oleh AI untuk mengganti wajah atau suara seseorang, sering digunakan untuk menyebarkan disinformasi.' },
          { id:5, text:'Prinsip Sokratik mana yang paling relevan dalam menganalisis berita?', options:['Menerima informasi dari otoritas tanpa pertanyaan','Mempertanyakan asumsi dan mencari bukti yang mendukung serta menentang klaim','Hanya membaca sumber yang kita percaya','Berbagi informasi secepat mungkin'], correct:1, explanation:'Pendekatan Sokratik mendorong kita untuk selalu mempertanyakan asumsi, mencari alasan dan bukti, serta mempertimbangkan berbagai perspektif sebelum menerima suatu klaim.' },
        ]
      },
      {
        id:2, title:'Kebebasan Berpendapat di Era Digital', topic:'Etika Digital', deadline:'2026-03-29', duration:12,
        totalPoints:100, createdBy:'Bu Fatimah', difficulty:'Mudah', participants:0,
        questions:[
          { id:1, text:'Apa batasan kebebasan berpendapat yang diakui secara universal?', options:['Tidak boleh mengkritik pemerintah','Ucapan yang menghasut kebencian dan kekerasan','Semua pendapat boleh disampaikan tanpa batasan','Hanya boleh berpendapat secara anonim'], correct:1, explanation:'Kebebasan berpendapat diakui secara universal namun memiliki batasan, terutama ucapan yang menghasut kebencian (hate speech), diskriminasi, atau kekerasan.' },
          { id:2, text:'Apa yang dimaksud dengan "echo chamber" di media sosial?', options:['Fitur karaoke online','Lingkungan di mana hanya ide-ide yang serupa yang diperkuat dan disebarluaskan','Ruang rekaman podcast','Algoritma pencarian google'], correct:1, explanation:'Echo chamber adalah lingkungan informasi di mana seseorang hanya terpapar pada pendapat dan informasi yang mengkonfirmasi keyakinan mereka sendiri.' },
          { id:3, text:'UU ITE di Indonesia mengatur tentang?', options:['Informatika dan Teknologi Eboni','Informasi dan Transaksi Elektronik','Internet dan Telekomunikasi Eksklusif','Inovasi Teknologi dan Ekosistem'], correct:1, explanation:'UU ITE adalah singkatan dari Undang-Undang Informasi dan Transaksi Elektronik, yang mengatur berbagai aspek hukum terkait penggunaan internet dan transaksi digital di Indonesia.' },
        ]
      },
    ];

    const OPINIONS = [
      { id:1, authorId:1, authorName:'Budi Santoso', authorAvatar:'BS', authorColor:'#54AEF7', category:'Media Sosial', tag:'Literasi', content:'Menurut saya, media sosial telah mengubah cara kita mengonsumsi berita secara fundamental. Algoritma yang menentukan apa yang kita lihat sebenarnya membatasi sudut pandang kita. Kita perlu sadar bahwa apa yang muncul di feed kita bukan representasi realita yang sesungguhnya.', reactions:{ setuju:24, perlu_dikaji:8, insight:15 }, userReactions:{}, timestamp:'2026-03-14T08:30:00', pinned:true },
      { id:2, authorId:2, authorName:'Sari Dewi', authorAvatar:'SD', authorColor:'#FFC338', category:'Hoaks', tag:'Kritis', content:'Hoaks menyebar lebih cepat dari fakta karena secara psikologis kita lebih tertarik pada hal-hal yang mengejutkan dan emosional. Solusinya bukan hanya edukasi literasi media, tapi juga perubahan desain platform untuk memperlambat penyebaran konten yang belum terverifikasi.', reactions:{ setuju:31, perlu_dikaji:12, insight:22 }, userReactions:{}, timestamp:'2026-03-13T14:20:00', pinned:false },
      { id:3, authorId:3, authorName:'Arif Rahman', authorAvatar:'AR', authorColor:'#FFC338', category:'Teknologi', tag:'AI', content:'AI generatif seperti deepfake dan teks otomatis membuat verifikasi informasi semakin sulit. Sebagai siswa, kita harus belajar tidak hanya memverifikasi isi tapi juga keaslian media itu sendiri. Kemampuan ini akan sangat krusial di masa depan.', reactions:{ setuju:18, perlu_dikaji:5, insight:29 }, userReactions:{}, timestamp:'2026-03-12T10:45:00', pinned:false },
      { id:4, authorId:4, authorName:'Maya Putri', authorAvatar:'MP', authorColor:'#00E676', category:'Pendidikan', tag:'Sekolah', content:'Pendidikan literasi digital seharusnya dimulai lebih awal. Saat ini banyak teman-teman yang masih langsung percaya screenshot tanpa menelusuri sumbernya. Kita perlu budaya cek fakta yang lebih kuat di kalangan remaja.', reactions:{ setuju:42, perlu_dikaji:3, insight:18 }, userReactions:{}, timestamp:'2026-03-11T16:00:00', pinned:false },
      { id:5, authorId:5, authorName:'Reza Hidayat', authorAvatar:'RH', authorColor:'#FF4D6D', category:'Sosial', tag:'Cyberbullying', content:'Kebebasan berpendapat online sering disalahgunakan untuk menyerang orang lain secara anonim. Anonimitas di internet membuat orang lebih berani berkata kasar. Apakah menghapus anonimitas adalah solusi yang tepat, atau justru akan membahayakan kelompok rentan?', reactions:{ setuju:15, perlu_dikaji:28, insight:11 }, userReactions:{}, timestamp:'2026-03-10T09:15:00', pinned:false },
    ];

    const NEWS_TEMPLATES = [
      { gradient:'linear-gradient(135deg,#1A0A3A,#54AEF7)', icon:'<i class="ph ph-broadcast"></i>', category:'Teknologi' },
      { gradient:'linear-gradient(135deg,#0A1A3A,#FFC338)', icon:'<i class="ph ph-waves"></i>', category:'Lingkungan' },
      { gradient:'linear-gradient(135deg,#2A0A1A,#FF4D6D)', icon:'<i class="ph ph-lightning"></i>', category:'Politik' },
      { gradient:'linear-gradient(135deg,#1A2A0A,#00E676)', icon:'<i class="ph ph-plant"></i>', category:'Sosial' },
      { gradient:'linear-gradient(135deg,#2A1A0A,#FFC338)', icon:'<i class="ph ph-book-open"></i>', category:'Pendidikan' },
      { gradient:'linear-gradient(135deg,#1A0A2A,#8ACAF9)', icon:'<i class="ph ph-microscope"></i>', category:'Sains' },
    ];

    const DIALOGUE_ROOMS = [
      { id:1, title:'Apakah Media Sosial Lebih Banyak Membahayakan atau Membantu Demokrasi?', topic:'Media & Demokrasi', participants:18, messages:47, lastActive:'5 menit lalu', icon:'<i class="ph-fill ph-check-square-offset"></i>' },
      { id:2, title:'Haruskah Platform Digital Bertanggung Jawab atas Konten Penggunanya?', topic:'Regulasi Digital', participants:12, messages:29, lastActive:'23 menit lalu', icon:'<i class="ph-fill ph-scales"></i>' },
      { id:3, title:'Apakah AI akan Menggantikan Jurnalis di Masa Depan?', topic:'AI & Jurnalisme', participants:21, messages:63, lastActive:'2 jam lalu', icon:'<i class="ph-fill ph-robot"></i>' },
    ];

    const SOCRATIC_PROMPTS = [
      'Apa asumsi yang mendasari pendapatmu tersebut?',
      'Bisakah kamu memberikan bukti atau contoh konkret yang mendukung klaimmu?',
      'Bagaimana sudut pandang yang berbeda bisa melihat isu ini?',
      'Apa konsekuensi jika pendapatmu diterapkan secara luas?',
      'Apakah ada yang bisa kamu setujui dari argumen yang bertentangan?',
      'Sumber informasi apa yang kamu gunakan untuk mendukung pandanganmu?',
      'Bagaimana kamu menimbang nilai-nilai yang saling bertentangan dalam isu ini?',
    ];

    const SAMPLE_MESSAGES = {
      1: [
        { id:1, senderId:6, senderName:'Pak Ahmad', senderAvatar:'PA', senderColor:'#8ACAF9', content:'Selamat datang di ruang diskusi. Mari kita mulai dengan pertanyaan pembuka: Menurutmu, apa pengaruh terbesar media sosial terhadap kualitas diskusi demokratis di Indonesia?', timestamp:'09:00', isOwn:false },
        { id:2, senderId:1, senderName:'Budi Santoso', senderAvatar:'BS', senderColor:'#54AEF7', content:'Menurut saya, media sosial justru melemahkan demokrasi karena menciptakan echo chamber yang membuat orang hanya berinteraksi dengan yang sepaham saja.', timestamp:'09:05', isOwn:true },
        { id:3, senderId:0, senderName:'SOCRATECH AI', senderAvatar:'<i class="ph-fill ph-robot"></i>', senderColor:'#FFC338', content:'Apa asumsi yang mendasari pendapatmu tersebut?', timestamp:'09:05', isOwn:false, isSystem:true },
        { id:4, senderId:2, senderName:'Sari Dewi', senderAvatar:'SD', senderColor:'#FFC338', content:'Saya setuju soal echo chamber, tapi media sosial juga memberikan platform bagi kelompok yang sebelumnya tidak punya suara. Ini kan positif untuk demokrasi?', timestamp:'09:08', isOwn:false },
        { id:5, senderId:1, senderName:'Budi Santoso', senderAvatar:'BS', senderColor:'#54AEF7', content:'Poin yang menarik, Sari! Tapi apakah "memiliki suara" saja cukup jika informasi yang beredar tidak akurat?', timestamp:'09:10', isOwn:true },
        { id:6, senderId:0, senderName:'SOCRATECH AI', senderAvatar:'<i class="ph-fill ph-robot"></i>', senderColor:'#FFC338', content:'Bisakah kamu memberikan bukti atau contoh konkret yang mendukung klaimmu?', timestamp:'09:10', isOwn:false, isSystem:true },
      ]
    };

    // Fungsi-fungsi pembantu penyimpanan data (Local Storage)
    function getCurrentUser() {
      const u = localStorage.getItem('socratech_user');
      return u ? JSON.parse(u) : null;
    }
    function setCurrentUser(user) { localStorage.setItem('socratech_user', JSON.stringify(user)); }
    function clearCurrentUser() { localStorage.removeItem('socratech_user'); }
    function getOpinions() { const s = localStorage.getItem('socratech_opinions'); return s ? JSON.parse(s) : OPINIONS; }
    function saveOpinions(ops) { localStorage.setItem('socratech_opinions', JSON.stringify(ops)); }
    function getNewsItems() { const s = localStorage.getItem('socratech_news'); return s ? JSON.parse(s) : []; }
    function saveNewsItems(n) { localStorage.setItem('socratech_news', JSON.stringify(n)); }
    function getQuizResults() { const s = localStorage.getItem('socratech_quiz_results'); return s ? JSON.parse(s) : {}; }
    function saveQuizResult(qid, result) { const r = getQuizResults(); r[qid] = result; localStorage.setItem('socratech_quiz_results', JSON.stringify(r)); }
    function getUserData(userId) {
      const s = localStorage.getItem(`socratech_user_${userId}`);
      if (s) return JSON.parse(s);
      return USERS.find(u => u.id === userId) || null;
    }
    function saveUserData(user) { localStorage.setItem(`socratech_user_${user.id}`, JSON.stringify(user)); }
    
    // XP Management
    function addXP(userId, amount, reason) {
      const u = getUserData(userId);
      if (!u) return;
      u.xp = (u.xp || 0) + amount;
      while (u.xp >= u.xpNext) {
        u.xp -= u.xpNext;
        u.level = (u.level || 1) + 1;
        u.xpNext = Math.floor(u.xpNext * 1.3);
      }
      saveUserData(u);
      const stored = getCurrentUser();
      if (stored && stored.id === userId) setCurrentUser({...stored, xp:u.xp, level:u.level, xpNext:u.xpNext});
      showXPPop(amount, reason);
      return u;
    }
    
    function showXPPop(amount, reason) {
      const el = document.createElement('div');
      el.className = 'xp-pop';
      el.innerHTML = `<i class="ph-bold ph-trend-up"></i> +${amount} XP`;
      el.style.left = Math.random() * 60 + 20 + 'vw';
      el.style.top = '60vh';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1300);
    }
    
    function getLeaderboard() {
      return USERS.filter(u => u.role === 'student').map(u => {
        const saved = getUserData(u.id);
        return saved || u;
      }).sort((a,b) => (b.xp||0) - (a.xp||0));
    }
    
    function formatTime(ts) {
      const d = new Date(ts);
      return d.toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' });
    }

    /* ==========================================================================
       [JS MODULE 2: AUTHENTICATION]
    ========================================================================== 
    */
    function renderAuth() {
      document.getElementById('app').innerHTML = `
      <div id="page-auth">
        <div class="auth-card animate-scale-in">
          <div class="auth-header">
            <div class="auth-logo"><i class="ph-fill ph-graduation-cap"></i></div>
            <h2 class="heading-md">SOCRATECH</h2>
            <p class="text-secondary" style="font-size:.9rem;margin-top:8px">Platform Literasi Digital Gamifikasi</p>
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
      let html = `<p style="font-size:.85rem;color:var(--text-secondary);margin-bottom:16px; font-weight: 500;">Login cepat sebagai:</p>
      <div style="display:grid;gap:12px;margin-bottom:24px">`;
      demoAccounts.forEach(u => {
        html += `<button class="btn btn-ghost w-full" style="justify-content:flex-start;gap:14px; padding: 14px 20px;" onclick="quickLogin(${u.id})">
          <span style="width:36px;height:36px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;color:white; box-shadow: var(--shadow-sm);">${u.avatar||u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</span>
          <span style="display: flex; flex-direction: column; align-items: flex-start; line-height: 1.4;">
            <strong style="color: var(--text-primary);">${u.name}</strong> 
            <span style="font-size: 0.75rem; color: var(--text-muted);">${u.role==='teacher'?'Akun Guru':'Akun Siswa'}</span>
          </span>
        </button>`;
      });
      html += `</div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="login-email" type="email" placeholder="email@sekolah.sch"></div>
        <div class="form-group"><label class="form-label">Password</label><input class="form-control" id="login-pass" type="password" placeholder="••••••••"></div>
        <button class="btn btn-primary w-full" style="margin-top:8px" onclick="doLogin()"><i class="ph-bold ph-sign-in"></i> Masuk ke Platform</button>
      </div>`;
      document.getElementById('auth-form-container').innerHTML = html;
    }

    function renderRegisterForm() {
      let html = `<div style="display:flex;flex-direction:column;gap:16px">
        <div class="form-group"><label class="form-label">Nama Lengkap</label><input class="form-control" id="reg-name" placeholder="Nama Lengkap" type="text"></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="reg-email" type="email" placeholder="email@sekolah.sch"></div>
        <div class="form-group"><label class="form-label">Daftar Sebagai</label>
          <div class="auth-role-select">
            <div class="role-option active" id="role-student" onclick="selectRole('student')"><div class="role-option-icon"><i class="ph-fill ph-student"></i></div><div class="role-option-label">Siswa</div></div>
            <div class="role-option" id="role-teacher" onclick="selectRole('teacher')"><div class="role-option-icon"><i class="ph-fill ph-chalkboard-teacher"></i></div><div class="role-option-label">Guru</div></div>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Password</label><input class="form-control" id="reg-pass" type="password" placeholder="••••••••"></div>
        <button class="btn btn-primary w-full" onclick="doRegister()"><i class="ph-bold ph-user-plus"></i> Buat Akun</button>
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
      showToast('success','Berhasil Masuk!',`Selamat datang, ${user.name}!`);
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
      const colors = ['#54AEF7','#FFC338','#FFC338','#00E676','#FF4D6D','#8ACAF9'];
      const newUser = { id: Date.now(), name, role, email, avatar: initials, color: colors[Math.floor(Math.random()*colors.length)], level:1, xp:0, xpNext:500, badges:[], streak:0, quizScores:0, opinions:0, dialogues:0 };
      USERS.push(newUser);
      setCurrentUser(newUser);
      showToast('success','Akun Dibuat!',`Selamat bergabung, ${name}!`);
      setTimeout(() => navigate('dashboard'), 500);
    }

    function doLogout() {
      clearCurrentUser();
      showToast('info','Sampai Jumpa!','Kamu telah keluar dari platform.');
      setTimeout(() => navigate('landing'), 500);
    }

    /* ==========================================================================
       [JS MODULE 3: DASHBOARD]
    ========================================================================== 
    */
    function renderDashboard() {
      const user = getCurrentUser();
      if (!user) return navigate('auth');
      const isTeacher = user.role === 'teacher';
      const ud = getUserData(user.id) || user;
      const xpPct = Math.min(100, Math.round((ud.xp / ud.xpNext) * 100));
      let statsHtml = '';
      if (isTeacher) {
        const stats = [
          { icon:'<i class="ph-fill ph-users"></i>', color:'rgba(84, 174, 247,.2)', val:'32', label:'Total Siswa', change:'+5.2%', pos:true },
          { icon:'<i class="ph-fill ph-notepad"></i>', color:'rgba(255, 195, 56,.15)', val:'4', label:'Quiz Aktif', change:'2 selesai minggu ini', pos:true },
          { icon:'<i class="ph-fill ph-chats-circle"></i>', color:'rgba(255, 195, 56,.15)', val:'186', label:'Pesan Dialog', change:'+23%', pos:true },
          { icon:'<i class="ph-fill ph-star"></i>', color:'rgba(0,230,118,.15)', val:'84%', label:'Rata-rata Skor', change:'+3.1%', pos:true },
        ];
        statsHtml = stats.map(s => `<div class="stat-card animate-fade-in-up">
          <div class="stat-card-icon" style="background:${s.color}; color: var(--text-primary);">${s.icon}</div>
          <div class="stat-card-value">${s.val}</div>
          <div class="stat-card-label">${s.label}</div>
          <div class="stat-card-change ${s.pos?'positive':'negative'}"><i class="ph-bold ${s.pos?'ph-trend-up':'ph-trend-down'}"></i> ${s.change}</div>
        </div>`).join('');
      } else {
        const stats = [
          { icon:'<i class="ph-fill ph-target"></i>', color:'rgba(84, 174, 247,.2)', val:`${ud.quizScores||0}%`, label:'Skor Quiz Rata-rata', change:'+5%', pos:true },
          { icon:'<i class="ph-fill ph-lightbulb"></i>', color:'rgba(255, 195, 56,.15)', val:`${ud.opinions||0}`, label:'Opini Dipublikasikan', change:'+3 minggu ini', pos:true },
          { icon:'<i class="ph-fill ph-chats"></i>', color:'rgba(255, 195, 56,.15)', val:`${ud.dialogues||0}`, label:'Kontribusi Dialog', change:'+8', pos:true },
          { icon:'<i class="ph-fill ph-fire"></i>', color:'rgba(255,77,109,.15)', val:`${ud.streak||0}`, label:'Hari Streak Aktif', change:'Pertahankan!', pos:true },
        ];
        statsHtml = stats.map(s => `<div class="stat-card animate-fade-in-up">
          <div class="stat-card-icon" style="background:${s.color}; color: var(--text-primary);">${s.icon}</div>
          <div class="stat-card-value">${s.val}</div>
          <div class="stat-card-label">${s.label}</div>
          <div class="stat-card-change positive"><i class="ph-bold ph-trend-up"></i> ${s.change}</div>
        </div>`).join('');
      }
      
      const unlockedBadges = BADGES_DEF.filter(b => (ud.badges||[]).includes(b.id));
      const badgesHtml = unlockedBadges.slice(0,4).map(b => `
        <div style="display:flex;align-items:center;gap:16px;padding:16px;background:var(--bg-card);border:1px solid rgba(255, 195, 56,.2);border-radius:var(--radius-md); transition: var(--transition-fast);">
          <span style="font-size:2rem; color: var(--accent);">${b.icon}</span>
          <div><div style="font-weight:700;font-size:.95rem; margin-bottom:4px;">${b.name}</div><div style="font-size:.8rem;color:var(--text-muted)">${b.desc}</div></div>
        </div>`).join('');
        
      const quickActions = isTeacher ? [
        { icon:'<i class="ph ph-notepad"></i>', label:'Buat Quiz Baru', page:'quiz', color:'var(--primary)' },
        { icon:'<i class="ph ph-newspaper"></i>', label:'Buat Berita Visual', page:'news', color:'var(--secondary)' },
        { icon:'<i class="ph ph-chats"></i>', label:'Buka Ruang Dialog', page:'dialogue', color:'var(--accent)' },
        { icon:'<i class="ph ph-chart-bar"></i>', label:'Lihat Statistik', page:'stats', color:'var(--success)' },
      ] : [
        { icon:'<i class="ph ph-newspaper"></i>', label:'Buat Berita Visual', page:'news', color:'var(--primary)' },
        { icon:'<i class="ph ph-chats"></i>', label:'Ikuti Dialog', page:'dialogue', color:'var(--secondary)' },
        { icon:'<i class="ph ph-lightbulb"></i>', label:'Post Opini', page:'opinion', color:'var(--accent)' },
        { icon:'<i class="ph ph-notepad"></i>', label:'Ambil Quiz', page:'quiz', color:'var(--success)' },
      ];
      
      const qactHtml = quickActions.map(a => `<button class="btn btn-ghost" style="flex-direction:column;gap:12px;padding:24px;height:auto;border-radius:var(--radius-lg)" onclick="navigate('${a.page}')">
        <span style="font-size:2.2rem;color:${a.color}; filter:drop-shadow(0 0 8px ${a.color}30)">${a.icon}</span>
        <span style="font-size:.85rem;color:var(--text-secondary); font-weight: 600;">${a.label}</span>
      </button>`).join('');

      document.getElementById('app').innerHTML = `
      <div class="app-layout">
        ${renderSidebar('dashboard')}
        <main class="main-content">
          <div class="page-header animate-fade-in-down">
            <h1><i class="ph-fill ph-hand-waving" style="color: #FFC338;"></i> Halo, ${user.name.split(' ')[0]}!</h1>
            <p>${isTeacher ? 'Selamat datang di dashboard guru. Pantau perkembangan siswa Anda.' : 'Lanjutkan perjalanan belajarmu hari ini!'}</p>
          </div>
          ${!isTeacher ? `
          <div class="xp-bar-container animate-fade-in-up mb-6">
            <div class="xp-bar-header">
              <div style="display:flex; align-items:center;">
                <span class="xp-level-badge"><i class="ph-bold ph-lightning"></i> Level ${ud.level}</span>
                <span style="font-size:.9rem;color:var(--text-secondary);margin-left:14px; font-weight: 600;">${ud.xp.toLocaleString()} / ${ud.xpNext.toLocaleString()} XP</span>
              </div>
              <span class="badge badge-primary">${xpPct}% menuju Level ${(ud.level||1)+1}</span>
            </div>
            <div class="xp-progress-bar"><div class="xp-progress-fill" style="width:${xpPct}%"></div></div>
            <div class="xp-labels"><span>Level ${ud.level}</span><span>Level ${(ud.level||1)+1}</span></div>
          </div>` : ''}
          <div class="stats-grid">${statsHtml}</div>
          <div style="display:grid;grid-template-columns:${isTeacher?'1fr':'1fr 1fr'};gap:32px;margin-bottom:40px">
            <div class="card animate-fade-in-up">
              <div class="card-header"><h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-lightning"></i> Aksi Cepat</h3></div>
              <div class="card-body" style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">${qactHtml}</div>
            </div>
            ${!isTeacher ? `<div class="card animate-fade-in-up delay-200">
              <div class="card-header" style="display:flex;justify-content:space-between;align-items:center">
                <h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-medal"></i> Badge Diraih</h3>
                <button class="btn btn-ghost btn-sm" onclick="navigate('leaderboard')">Lihat Semua</button>
              </div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:12px">
                ${unlockedBadges.length > 0 ? badgesHtml : `<div class="empty-state" style="padding:40px 20px;"><div class="empty-state-icon"><i class="ph ph-medal"></i></div><p class="empty-state-desc">Selesaikan aktivitas untuk unlock badge!</p><button class="btn btn-primary btn-sm" onclick="navigate('quiz')">Mulai Quiz</button></div>`}
              </div>
            </div>` : ''}
          </div>
          ${isTeacher ? `
          <div class="card animate-fade-in-up">
            <div class="card-header"><h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-users"></i> Aktivitas Siswa Terbaru</h3></div>
            <div class="card-body" style="padding:0">
              <table class="leaderboard-table">
                <thead><tr><th>Siswa</th><th>Level</th><th>Quiz</th><th>Opini</th><th>Streak</th></tr></thead>
                <tbody>
                  ${USERS.filter(u=>u.role==='student').map(u => `<tr>
                    <td><div class="user-cell"><div class="avatar" style="background:${u.color};color:#fff">${u.avatar}</div><span style="font-weight:600;">${u.name}</span></div></td>
                    <td><span class="badge badge-primary">Lv ${u.level}</span></td>
                    <td><span style="font-weight:600;">${u.quizScores}%</span></td><td><span style="font-weight:600;">${u.opinions}</span></td>
                    <td><span style="color:var(--accent);font-weight:600;"><i class="ph-fill ph-fire"></i> ${u.streak} hari</span></td>
                  </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>` : ''}
        </main>
      </div>`;
    }

    /* ==========================================================================
       [JS MODULE 4: LANDING PAGE]
    ========================================================================== 
    */
    function renderLanding() {
      const feats = [
        { icon:'<i class="ph-fill ph-newspaper-clipping"></i>', color:'#54AEF7', bg:'rgba(84, 174, 247,.15)', title:'Smart Visual News Generator', desc:'Ubah berita aktual menjadi infografis visual yang menarik dengan analisis kritis terstruktur.' },
        { icon:'<i class="ph-fill ph-chats-circle"></i>', color:'#FFC338', bg:'rgba(255, 195, 56,.15)', title:'Student Dialogue Space', desc:'Ruang diskusi interaktif dengan panduan pertanyaan Sokratik AI untuk mempertajam argumen.' },
        { icon:'<i class="ph-fill ph-lightbulb"></i>', color:'#FFC338', bg:'rgba(255, 195, 56,.15)', title:'Student Opinion Wall', desc:'Platform ekspresi opini siswa dengan sistem reaksi dan kurasi opini terbaik mingguan.' },
        { icon:'<i class="ph-fill ph-notepad"></i>', color:'#00E676', bg:'rgba(0,230,118,.15)', title:'Weekly Mini Quiz', desc:'Kuis mingguan berbasis literasi dengan timer, feedback instan, dan pelacakan progres.' },
        { icon:'<i class="ph-fill ph-trophy"></i>', color:'#FF4D6D', bg:'rgba(255,77,109,.15)', title:'Leaderboard & Badges', desc:'Sistem gamifikasi dengan poin XP, level, dan badge pencapaian untuk motivasi belajar.' },
        { icon:'<i class="ph-fill ph-microscope"></i>', color:'#8ACAF9', bg:'rgba(139,92,246,.15)', title:'Inkuiri Sokratik Digital', desc:'Model dialog berbasis metode Sokratik untuk membangun kemampuan berpikir kritis mendalam.' },
      ];
      const novelty = [
        { num:'01', title:'Visual News Transformation', desc:'Sistem otomatis transformasi berita keras menjadi visual digital yang mudah dipahami.', tag:'Sistem Baru' },
        { num:'02', title:'Socratic Digital Dialogue', desc:'Model dialog digital berbasis metode filsafat Sokratik untuk pendidikan kritis abad 21.', tag:'Inovasi Pedagogik' },
        { num:'03', title:'Student Opinion Ecosystem', desc:'Ekosistem opini siswa yang terstruktur dengan sistem validasi dan apresiasi peer-to-peer.', tag:'Ekosistem Sosial' },
        { num:'04', title:'Gamified Critical Literacy', desc:'Pendekatan gamifikasi yang mengintegrasikan literasi kritis ke dalam pengalaman belajar menyenangkan.', tag:'Gamifikasi' },
      ];
      let featsHtml = feats.map(f => `
        <div class="feature-card animate-fade-in-up">
          <div class="feature-icon" style="background:${f.bg}; color:${f.color}">${f.icon}</div>
          <div class="feature-title">${f.title}</div>
          <div class="feature-desc">${f.desc}</div>
        </div>`).join('');
      let noveltyHtml = novelty.map((n,i) => `
        <div class="card animate-fade-in-up delay-${(i+1)*100}" style="padding:32px">
          <div style="display:flex;align-items:flex-start;gap:24px">
            <div style="font-family:var(--font-heading);font-size:3.5rem;font-weight:900;color:var(--border-glow);line-height:1">${n.num}</div>
            <div>
              <div class="badge badge-primary" style="margin-bottom:12px">${n.tag}</div>
              <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:10px">${n.title}</h3>
              <p style="color:var(--text-secondary);font-size:.95rem;line-height:1.7">${n.desc}</p>
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
              <div class="hero-tag animate-fade-in-down">
                <div class="hero-tag-dot"></div> Platform Literasi Digital Generasi Z
              </div>
              <h1 class="heading-xl hero-title animate-fade-in-up">
                Belajar Kritis <span class="text-gradient">Lebih Seru</span> dengan SOCRATECH
              </h1>
              <p class="hero-subtitle animate-fade-in-up delay-200">Platform LMS gamifikasi berbasis inkuiri Sokratik dan transformasi visual berita untuk meningkatkan kesadaran kritis siswa SMA.</p>
              <div class="hero-actions animate-fade-in-up delay-300">
                <button class="btn btn-primary btn-lg" onclick="navigate('auth')"><i class="ph-bold ph-rocket-launch"></i> Mulai Sekarang</button>
                <button class="btn btn-secondary btn-lg" onclick="navigate('landing','features')">Lihat Fitur <i class="ph-bold ph-arrow-right"></i></button>
              </div>
              <div class="hero-stats animate-fade-in-up delay-400">
                <div><div class="hero-stat-value">500+</div><div class="hero-stat-label">Siswa Aktif</div></div>
                <div><div class="hero-stat-value">98%</div><div class="hero-stat-label">Kepuasan Pengguna</div></div>
                <div><div class="hero-stat-value">1,240</div><div class="hero-stat-label">Opini Dipublikasikan</div></div>
              </div>
            </div>
            <div style="position:relative;height:540px;display:none" id="hero-visual">
              <div class="floating-card floating-card-1"><i class="ph-fill ph-trophy"></i> Budi naik ke Level 8!</div>
              <div class="floating-card floating-card-2"><i class="ph-fill ph-newspaper-clipping"></i> Berita Visual Baru Tersedia</div>
              <div class="floating-card floating-card-3"><i class="ph-fill ph-chats-circle"></i> 42 Siswa Aktif Berdiskusi</div>
            </div>
          </div>
        </section>
        
        <!-- Features -->
        <section class="section" id="features" style="background:var(--bg-secondary)">
          <div class="container">
            <div class="section-header">
              <div class="section-tag"><i class="ph-bold ph-sparkle"></i> Fitur Unggulan</div>
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
              <div class="section-tag"><i class="ph-bold ph-diamond"></i> Kebaruan Platform</div>
              <h2 class="heading-lg section-title">4 Inovasi yang Membuat <span class="text-gradient">SOCRATECH Unik</span></h2>
              <p class="section-subtitle">Keunikan platform yang menggabungkan pedagogi Sokratik dengan teknologi modern untuk pengalaman belajar yang belum pernah ada.</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:32px">${noveltyHtml}</div>
          </div>
        </section>
        
        <!-- CTA -->
        <section class="section" style="background:var(--bg-secondary)">
          <div class="container">
            <div style="max-width:720px;margin:0 auto;text-align:center;padding:56px 40px;background:var(--gradient-card);border:1px solid var(--border-glow);border-radius:var(--radius-xl); box-shadow: var(--shadow-lg);">
              <div style="font-size:3.5rem;margin-bottom:24px; color: var(--primary-light);"><i class="ph-fill ph-graduation-cap"></i></div>
              <h2 class="heading-lg" style="margin-bottom:20px">Siap Memulai Perjalanan <span class="text-gradient">Berpikir Kritis</span>?</h2>
              <p style="color:var(--text-secondary);margin-bottom:40px;font-size:1.1rem">Bergabung dengan ratusan siswa dan guru yang sudah membuktikan efektivitas SOCRATECH dalam membangun literasi digital.</p>
              <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
                <button class="btn btn-primary btn-lg" onclick="navigate('auth')"><i class="ph-bold ph-student"></i> Daftar sebagai Siswa</button>
                <button class="btn btn-secondary btn-lg" onclick="navigate('auth')"><i class="ph-bold ph-chalkboard-teacher"></i> Daftar sebagai Guru</button>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Footer -->
        <footer style="background:var(--bg-primary);border-top:1px solid var(--border);padding:40px 0">
          <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px">
            <div class="nav-logo"><div class="logo-icon"><i class="ph-bold ph-graduation-cap"></i></div><span class="logo-text">SOCRATECH</span></div>
            <p style="color:var(--text-muted);font-size:.9rem">Inovasi Platform Literasi Digital Gamifikasi untuk SMA &copy; 2026</p>
          </div>
        </footer>
      </div>`;
      
      if (window.innerWidth > 900) {
        const hv = document.getElementById('hero-visual');
        if (hv) hv.style.display = 'block';
      }
    }

    /* ==========================================================================
       [JS MODULE 5: VISUAL NEWS GENERATOR]
    ========================================================================== 
    */
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
            <h1><i class="ph-fill ph-newspaper-clipping" style="color: var(--primary);"></i> Smart Visual News Generator</h1>
            <p>Transformasikan berita aktual menjadi infografis visual dengan analisis kritis terstruktur.</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start">
            <!-- Form -->
            <div class="card animate-fade-in-left">
              <div class="card-header"><h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-pencil-simple"></i> Buat Berita Visual</h3></div>
              <div class="card-body" style="display:flex;flex-direction:column;gap:20px">
                <div class="form-group">
                  <label class="form-label">Judul Berita</label>
                  <input class="form-control" id="news-title" placeholder="Masukkan judul berita aktual..." oninput="updateNewsPreview()">
                </div>
                <div class="form-group">
                  <label class="form-label">Ringkasan Isi</label>
                  <textarea class="form-control" id="news-summary" rows="3" placeholder="Ringkasan singkat berita (2-3 kalimat)..." oninput="updateNewsPreview()" style="min-height:90px"></textarea>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                  <div class="form-group">
                    <label class="form-label">Kategori</label>
                    <select class="form-control" id="news-category" onchange="updateNewsPreview()">
                      <option value="0">Teknologi</option>
                      <option value="1">Lingkungan</option>
                      <option value="2">Politik</option>
                      <option value="3">Sosial</option>
                      <option value="4">Pendidikan</option>
                      <option value="5">Sains</option>
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
                  <textarea class="form-control" id="news-critical" rows="2" placeholder="Apa pertanyaan kritis yang diangkat berita ini?" oninput="updateNewsPreview()" style="min-height:80px"></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">Sumber Berita</label>
                  <input class="form-control" id="news-source" placeholder="Kompas, CNN Indonesia, dll..." oninput="updateNewsPreview()">
                </div>
                <button class="btn btn-primary w-full" onclick="publishNews()"><i class="ph-bold ph-rocket-launch"></i> Publikasikan ke Opinion Wall</button>
              </div>
            </div>
            
            <!-- Preview -->
            <div class="animate-fade-in-right" style="display:flex;flex-direction:column;gap:24px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-eye"></i> Preview Kartu Berita</h3>
                <span class="badge badge-secondary">Live Preview</span>
              </div>
              <div id="news-preview-container">
                <div class="news-preview-card" id="news-preview-card" style="background:linear-gradient(135deg,#1A0A3A,#54AEF7)">
                  <div class="news-card-header">
                    <div class="news-card-meta">
                      <span class="badge badge-primary" id="prev-category" style="background:rgba(0,0,0,.4);border-color:rgba(255,255,255,.2);color:#fff"><i class="ph ph-broadcast"></i> Teknologi</span>
                      <span class="badge badge-secondary" id="prev-perspective" style="background:rgba(0,0,0,.4);border-color:rgba(255,255,255,.2);color:#fff">Netral</span>
                      <span style="font-size:.8rem;color:rgba(255,255,255,.7);font-weight:500;" id="prev-date">${new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</span>
                    </div>
                    <div style="font-size:3.5rem;margin:16px 0;filter:drop-shadow(0 0 20px rgba(84, 174, 247,.6)); color:#fff;" id="prev-icon"><i class="ph ph-broadcast"></i></div>
                  </div>
                  <div class="news-card-body">
                    <div class="news-card-title" id="prev-title">Judul berita akan muncul di sini...</div>
                    <div class="news-card-summary" id="prev-summary">Ringkasan berita akan ditampilkan di sini. Masukkan teks di form sebelah kiri untuk melihat preview.</div>
                    <div class="news-critical-tag" id="prev-critical" style="display:none">
                      <i class="ph-fill ph-lightbulb"></i>
                      <div><strong>Analisis Kritis:</strong> <span id="prev-critical-text"></span></div>
                    </div>
                    <div style="margin-top:20px;display:flex;align-items:center;gap:8px">
                      <span style="font-size:.8rem;color:rgba(255,255,255,.6)">Sumber:</span>
                      <span style="font-size:.8rem;color:rgba(255,255,255,.8);font-weight:600;" id="prev-source">-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- News Feed -->
          <div style="margin-top:56px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
              <h2 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-books"></i> Berita Visual ${isTeacher ? 'Semua Siswa' : 'Saya'}</h2>
              <span class="badge badge-secondary">${myNews.length} berita</span>
            </div>
            <div id="news-feed" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px">
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
      
      const elTitle = document.getElementById('prev-title');
      if (elTitle) elTitle.textContent = title || 'Judul berita akan muncul di sini...';
      
      const elSummary = document.getElementById('prev-summary');
      if (elSummary) elSummary.textContent = summary || 'Ringkasan berita akan ditampilkan di sini.';
      
      const elIcon = document.getElementById('prev-icon');
      if (elIcon) elIcon.innerHTML = template.icon;
      
      const elCat = document.getElementById('prev-category');
      if (elCat) elCat.innerHTML = template.icon + ' ' + template.category;
      
      const elPersp = document.getElementById('prev-perspective');
      if (elPersp) elPersp.textContent = perspective;
      
      const elSource = document.getElementById('prev-source');
      if (elSource) elSource.textContent = source || '-';
      
      const critEl = document.getElementById('prev-critical');
      const critText = document.getElementById('prev-critical-text');
      if (critEl && critText) {
        critEl.style.display = critical ? 'flex' : 'none';
        critText.textContent = critical;
      }
    }

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
      showToast('success','Berita Dipublikasikan!','+30 XP telah ditambahkan ke akunmu!');
      document.getElementById('news-title').value = '';
      document.getElementById('news-summary').value = '';
      document.getElementById('news-critical').value = '';
      document.getElementById('news-source').value = '';
      updateNewsPreview();
      document.getElementById('news-feed').innerHTML = renderNewsFeed(getNewsItems().filter(n => n.authorId===user.id || getCurrentUser()?.role==='teacher'));
    }

    function renderNewsFeed(items) {
      if (!items || items.length === 0) return `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon"><i class="ph ph-newspaper"></i></div><div class="empty-state-title">Belum Ada Berita Visual</div><div class="empty-state-desc">Buat berita visualmu yang pertama!</div></div>`;
      return items.slice(0,9).map(n => `
        <div class="news-preview-card" style="background:${n.gradient};cursor:pointer">
          <div class="news-card-header" style="padding:24px">
            <div class="news-card-meta">
              <span class="badge badge-primary" style="background:rgba(0,0,0,.3);border-color:rgba(255,255,255,.2);color:#fff">${n.category}</span>
              <span style="font-size:.8rem;color:rgba(255,255,255,.7);font-weight:500;">${formatTime(n.timestamp)}</span>
            </div>
            <div style="font-size:2.5rem;margin:12px 0; color:#fff;">${n.icon}</div>
          </div>
          <div class="news-card-body" style="padding:20px 24px">
            <div style="font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.4">${n.title}</div>
            <div style="font-size:.85rem;color:rgba(255,255,255,.8);line-height:1.6">${n.summary.substring(0,100)}${n.summary.length>100?'...':''}</div>
            <div style="margin-top:16px;display:flex;align-items:center;gap:10px">
              <div class="avatar" style="width:28px;height:28px;font-size:.75rem;background:${n.authorColor};color:#fff;box-shadow:none;">${n.authorAvatar}</div>
              <span style="font-size:.8rem;color:rgba(255,255,255,.8);font-weight:500;">${n.authorName}</span>
            </div>
          </div>
        </div>`).join('');
    }

    /* ==========================================================================
       [JS MODULE 6: DIALOGUE SPACE]
    ========================================================================== 
    */
    let activeRoomId = null;
    let dialogMessages = [];

    function renderDialogue() {
      const user = getCurrentUser();
      if (!user) return navigate('auth');
      
      document.getElementById('app').innerHTML = `
      <div class="app-layout">
        ${renderSidebar('dialogue')}
        <main class="main-content">
          <div class="page-header animate-fade-in-down">
            <h1><i class="ph-fill ph-chats-circle" style="color: var(--secondary);"></i> Student Dialogue Space</h1>
            <p>Ruang diskusi interaktif dengan panduan inkuiri Sokratik untuk mempertajam pemikiran kritis.</p>
          </div>
          <div style="display:grid;grid-template-columns:320px 1fr;gap:24px;height:calc(100vh - 220px)">
            <!-- Room List -->
            <div class="card animate-fade-in-left" style="overflow:hidden;display:flex;flex-direction:column">
              <div class="card-header"><h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-folder"></i> Ruang Diskusi</h3></div>
              <div style="flex:1;overflow-y:auto">
                ${DIALOGUE_ROOMS.map(r => `
                <div onclick="openRoom(${r.id})" id="room-btn-${r.id}" style="padding:18px 24px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background=''">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
                    <span style="font-size:1.6rem; color: var(--text-primary);">${r.icon}</span>
                    <div style="flex:1">
                      <div style="font-weight:600;font-size:.9rem;line-height:1.4">${r.title}</div>
                    </div>
                  </div>
                  <div style="display:flex;gap:14px;font-size:.75rem;color:var(--text-muted);font-weight:500;">
                    <span style="display:flex;align-items:center;gap:4px;"><i class="ph-fill ph-users"></i> ${r.participants}</span>
                    <span style="display:flex;align-items:center;gap:4px;"><i class="ph-fill ph-chats"></i> ${r.messages}</span>
                    <span style="display:flex;align-items:center;gap:4px;"><i class="ph-fill ph-clock"></i> ${r.lastActive}</span>
                  </div>
                </div>`).join('')}
                ${user.role === 'teacher' ? `<div style="padding:20px">
                  <button class="btn btn-primary w-full btn-sm" onclick="createNewRoom()"><i class="ph-bold ph-plus"></i> Buat Ruang Baru</button>
                </div>` : ''}
              </div>
            </div>
            
            <!-- Chat Area -->
            <div class="animate-fade-in-right" style="display:flex;flex-direction:column">
              <div id="chat-area" style="flex:1; display:flex; flex-direction:column;">
                <div class="empty-state" style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border);">
                  <div class="empty-state-icon"><i class="ph ph-chats-circle"></i></div>
                  <div class="empty-state-title">Pilih Ruang Diskusi</div>
                  <div class="empty-state-desc">Klik salah satu ruang di sebelah kiri untuk mulai berdiskusi.</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>`;
    }

    function openRoom(roomId) {
      const user = getCurrentUser();
      activeRoomId = roomId;
      const room = DIALOGUE_ROOMS.find(r => r.id === roomId);
      dialogMessages = [...(SAMPLE_MESSAGES[roomId] || [])];
      document.querySelectorAll('[id^=room-btn-]').forEach(el => el.style.background = '');
      const btn = document.getElementById('room-btn-'+roomId);
      if (btn) btn.style.background = 'rgba(84, 174, 247,.15)';
      
      document.getElementById('chat-area').innerHTML = `
        <div class="chat-container">
          <div style="padding:16px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px;background:var(--bg-secondary)">
            <span style="font-size:1.8rem; color:var(--text-primary);">${room.icon}</span>
            <div><div style="font-weight:700;font-size:1rem;margin-bottom:2px;">${room.title}</div>
              <div style="font-size:.8rem;color:var(--text-muted);font-weight:500;">${room.participants} peserta · ${room.messages} pesan</div>
            </div>
          </div>
          <div class="chat-messages" id="chat-messages">${renderMessages(dialogMessages, user)}</div>
          <div class="chat-input-area">
            <textarea class="form-control chat-input" id="chat-input" placeholder="Tulis pendapatmu..." rows="1"
              onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMessage()}"
              oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
            <button class="btn btn-primary" onclick="sendMessage()" style="flex-shrink:0; align-self:flex-end; padding:12px 20px;"><i class="ph-bold ph-paper-plane-right"></i> Kirim</button>
          </div>
        </div>`;
      scrollChat();
    }

    function renderMessages(msgs, user) {
      return msgs.map(m => {
        const isOwn = m.senderId === user.id;
        const isSystem = m.isSystem;
        if (isSystem) return `<div class="chat-bubble system">
          <div class="chat-bubble-content"><i class="ph-fill ph-robot" style="font-size:1.2rem;"></i> <span>${m.content}</span></div>
        </div>`;
        return `<div class="chat-bubble ${isOwn?'own':'other'}">
          ${!isOwn ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <div class="avatar" style="width:28px;height:28px;font-size:.75rem;background:${m.senderColor};color:#fff">${m.senderAvatar}</div>
            <span class="chat-meta" style="font-weight:600; color:var(--text-secondary);">${m.senderName}</span>
          </div>` : ''}
          <div class="chat-bubble-content">${m.content}</div>
          <div class="chat-meta" style="align-self: ${isOwn?'flex-end':'flex-start'}; margin-top:2px;">${m.timestamp}</div>
        </div>`;
      }).join('');
    }

    function sendMessage() {
      const user = getCurrentUser();
      const input = document.getElementById('chat-input');
      const text = input?.value.trim();
      if (!text) return;
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
      const msg = { id: Date.now(), senderId: user.id, senderName: user.name, senderAvatar: user.avatar, senderColor: user.color, content: text, timestamp: timeStr, isOwn: true };
      dialogMessages.push(msg);
      input.value = '';
      input.style.height = 'auto';
      document.getElementById('chat-messages').innerHTML = renderMessages(dialogMessages, user);
      scrollChat();
      addXP(user.id, 5, 'Berpartisipasi dalam dialog');
      
      if (dialogMessages.filter(m=>m.senderId===user.id).length % 2 === 0) {
        setTimeout(() => {
          const prompt = SOCRATIC_PROMPTS[Math.floor(Math.random()*SOCRATIC_PROMPTS.length)];
          const sysMsg = { id: Date.now()+1, senderId:0, isSystem:true, content: prompt, timestamp: timeStr };
          dialogMessages.push(sysMsg);
          document.getElementById('chat-messages').innerHTML = renderMessages(dialogMessages, user);
          scrollChat();
        }, 1200);
      }
    }

    function scrollChat() { const el = document.getElementById('chat-messages'); if(el) el.scrollTop = el.scrollHeight; }
    function createNewRoom() { showToast('info','Fitur Segera Hadir','Pembuatan ruang dialog baru akan tersedia dalam update berikutnya.'); }

    /* ==========================================================================
       [JS MODULE 7: OPINION WALL]
    ========================================================================== 
    */
    let pendingDeleteId = null;

    function renderOpinion() {
      const user = getCurrentUser();
      if (!user) return navigate('auth');
      const ops = getOpinions();
      
      document.getElementById('app').innerHTML = `
      <div class="app-layout">
        ${renderSidebar('opinion')}
        <main class="main-content">
          <div class="page-header animate-fade-in-down">
            <h1><i class="ph-fill ph-lightbulb" style="color: var(--accent);"></i> Student Opinion Wall</h1>
            <p>Ekspresikan pandanganmu tentang isu-isu literasi digital dan dapatkan apresiasi dari sesama.</p>
          </div>
          <div class="card animate-fade-in-up mb-6">
            <div class="card-header"><h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-pencil-simple"></i> Tulis Opini Baru</h3></div>
            <div class="card-body" style="display:flex;flex-direction:column;gap:16px">
              <textarea class="form-control" id="opinion-text" rows="3" placeholder="Bagikan pemikiranmu tentang literasi digital, media sosial, atau isu aktual..."></textarea>
              <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
                <select class="form-control" id="opinion-category" style="width:auto;flex:1;min-width:160px">
                  <option>Media Sosial</option><option>Hoaks</option><option>Teknologi</option>
                  <option>Pendidikan</option><option>Sosial</option><option>Etika Digital</option>
                </select>
                <input class="form-control" id="opinion-tag" placeholder="Tag (cth: AI, Literasi)" style="flex:1;min-width:160px">
                <button class="btn btn-primary" onclick="postOpinion()"><i class="ph-bold ph-paper-plane-right"></i> Publikasikan Opini</button>
              </div>
            </div>
          </div>
          
          <!-- Filter Bar -->
          <div style="display:flex;gap:12px;margin-bottom:28px;flex-wrap:wrap;align-items:center; background:var(--bg-card); padding:10px 16px; border-radius:var(--radius-md); border:1px solid var(--border);">
            <span style="font-size:.9rem;color:var(--text-muted);font-weight:600;display:flex;align-items:center;gap:6px;"><i class="ph-bold ph-funnel"></i> Filter:</span>
            <button class="btn btn-ghost btn-sm active-filter" onclick="filterOpinions('all',this)" id="filter-all">Semua</button>
            <button class="btn btn-ghost btn-sm" onclick="filterOpinions('popular',this)" id="filter-popular"><i class="ph-bold ph-fire"></i> Terpopuler</button>
            <button class="btn btn-ghost btn-sm" onclick="filterOpinions('pinned',this)" id="filter-pinned"><i class="ph-bold ph-push-pin"></i> Dipinkan</button>
          </div>
          
          <div class="opinion-grid animate-fade-in-up" id="opinion-grid">
            ${renderOpinionCards(ops, user)}
          </div>
        </main>
      </div>
      
      <div id="modal-delete" class="modal-overlay">
        <div class="modal" style="max-width:400px">
          <div class="modal-header"><h3>Hapus Opini?</h3><div class="modal-close" onclick="closeModal('modal-delete')"><i class="ph-bold ph-x"></i></div></div>
          <div class="modal-body"><p style="color:var(--text-secondary)">Opini yang dihapus tidak dapat dikembalikan.</p></div>
          <div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal('modal-delete')">Batal</button><button class="btn btn-accent" onclick="confirmDeleteOpinion()"><i class="ph-bold ph-trash"></i> Hapus</button></div>
        </div>
      </div>`;
    }

    function renderOpinionCards(ops, user) {
      if (!ops || ops.length === 0) return `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon"><i class="ph ph-lightbulb"></i></div><div class="empty-state-title">Belum Ada Opini</div><div class="empty-state-desc">Jadilah yang pertama berbagi opini!</div></div>`;
      return ops.map(op => {
        const isOwn = op.authorId === user.id;
        const total = Object.values(op.reactions).reduce((a,b)=>a+b,0);
        const r = op.userReactions || {};
        return `
        <div class="opinion-card animate-fade-in-up" id="opinion-${op.id}">
          <div class="opinion-header">
            <div class="avatar" style="background:${op.authorColor};color:#fff">${op.authorAvatar}</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:.95rem; margin-bottom:2px;">${op.authorName} ${op.pinned?'<span class="badge badge-accent" style="margin-left:6px;"><i class="ph-fill ph-push-pin"></i> Pilihan Guru</span>':''}</div>
              <div style="font-size:.8rem;color:var(--text-muted);font-weight:500;">${formatTime(op.timestamp)}</div>
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              <span class="badge badge-secondary">${op.category}</span>
              ${op.tag ? `<span class="badge badge-primary">${op.tag}</span>` : ''}
              ${isOwn ? `<button class="btn btn-ghost btn-sm btn-icon" onclick="deleteOpinion(${op.id})" title="Hapus" style="color:var(--danger);font-size:1.1rem;padding:6px;"><i class="ph-bold ph-trash"></i></button>` : ''}
            </div>
          </div>
          <div class="opinion-content">${op.content}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px; margin-top:auto; padding-top:16px; border-top:1px solid var(--border);">
            <div class="opinion-reactions">
              <button class="reaction-btn ${r.setuju?'reacted':''}" onclick="reactOpinion(${op.id},'setuju')"><i class="${r.setuju?'ph-fill':'ph-bold'} ph-thumbs-up"></i> Setuju <span id="react-setuju-${op.id}">${op.reactions.setuju||0}</span></button>
              <button class="reaction-btn ${r.perlu_dikaji?'reacted':''}" onclick="reactOpinion(${op.id},'perlu_dikaji')"><i class="${r.perlu_dikaji?'ph-fill':'ph-bold'} ph-brain"></i> Perlu Dikaji <span id="react-perlu-${op.id}">${op.reactions.perlu_dikaji||0}</span></button>
              <button class="reaction-btn ${r.insight?'reacted':''}" onclick="reactOpinion(${op.id},'insight')"><i class="${r.insight?'ph-fill':'ph-bold'} ph-lightbulb"></i> Insight <span id="react-insight-${op.id}">${op.reactions.insight||0}</span></button>
            </div>
            <span style="font-size:.8rem;color:var(--text-muted);font-weight:600;">${total} reaksi</span>
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
      showToast('success','Opini Dipublikasikan!','+20 XP ditambahkan ke akunmu!');
      document.getElementById('opinion-text').value = '';
      document.getElementById('opinion-tag').value = '';
      document.getElementById('opinion-grid').innerHTML = renderOpinionCards(getOpinions(), user);
    }

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

    /* ==========================================================================
       [JS MODULE 8: QUIZ LOGIC]
    ========================================================================== 
    */
    let currentQuiz = null;
    let currentQ = 0;
    let score = 0;
    let answered = false;
    let quizTimer = null;
    let timeLeft = 0;

    function renderQuiz() {
      const user = getCurrentUser();
      if (!user) return navigate('auth');
      const isTeacher = user.role === 'teacher';
      const results = getQuizResults();
      
      document.getElementById('app').innerHTML = `
      <div class="app-layout">
        ${renderSidebar('quiz')}
        <main class="main-content">
          <div class="page-header animate-fade-in-down">
            <h1><i class="ph-fill ph-notepad" style="color: var(--success);"></i> Weekly Mini Quiz</h1>
            <p>Uji pemahaman literasi digitalmu setiap minggu dan raih XP untuk naik level!</p>
          </div>
          <div id="quiz-list">
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px">
              ${QUIZZES.map(q => {
                const done = results[q.id];
                const diff = {Mudah:'badge-success',Sedang:'badge-accent',Sulit:'badge-danger'}[q.difficulty]||'badge-primary';
                return `<div class="card animate-fade-in-up" style="padding:0">
                  <div style="padding:24px;border-bottom:1px solid var(--border)">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
                      <div style="display:flex;gap:8px;flex-wrap:wrap">
                        <span class="badge badge-secondary">${q.topic}</span>
                        <span class="badge ${diff}">${q.difficulty}</span>
                        ${done ? '<span class="badge badge-success"><i class="ph-bold ph-check"></i> Selesai</span>' : ''}
                      </div>
                    </div>
                    <h3 style="font-size:1.15rem;font-weight:700;margin-bottom:10px;line-height:1.4;">${q.title}</h3>
                    <p style="color:var(--text-secondary);font-size:.85rem; font-weight:500;">Dibuat oleh ${q.createdBy} • ${q.questions.length} soal • ${q.duration} menit</p>
                  </div>
                  <div style="padding:20px 24px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.1);">
                    <div style="font-size:.85rem;color:var(--text-muted);font-weight:600;">
                      <span style="display:inline-flex;align-items:center;gap:4px;"><i class="ph-fill ph-users"></i> ${q.participants} peserta</span>
                      ${done ? `<span style="margin:0 8px;">•</span><span class="text-success" style="display:inline-flex;align-items:center;gap:4px;"><i class="ph-bold ph-star"></i> Skor: ${done.score}/${done.total}</span>` : ''}
                    </div>
                    <button class="btn ${done?'btn-ghost':'btn-primary'} btn-sm" onclick="startQuiz(${q.id})">
                      ${done ? '<i class="ph-bold ph-arrows-clockwise"></i> Ulangi' : '<i class="ph-bold ph-play"></i> Mulai Quiz'}
                    </button>
                  </div>
                </div>`;
              }).join('')}
            </div>
            
            ${isTeacher ? `<div class="card animate-fade-in-up" style="margin-top:40px">
              <div class="card-header"><h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-chart-bar"></i> Statistik Quiz</h3></div>
              <div class="card-body" style="padding:0;">
                <table class="leaderboard-table">
                  <thead><tr><th>Quiz</th><th>Peserta</th><th>Rata-rata Skor</th><th>Aksi</th></tr></thead>
                  <tbody>${QUIZZES.map(q => `<tr>
                    <td><strong>${q.title}</strong></td><td>${q.participants} siswa</td>
                    <td><span class="text-success" style="font-weight:700;">84%</span></td>
                    <td><button class="btn btn-ghost btn-sm"><i class="ph-bold ph-pencil-simple"></i> Edit</button></td>
                  </tr>`).join('')}</tbody>
                </table>
              </div>
            </div>` : ''}
          </div>
          <div id="quiz-active" style="display:none"></div>
        </main>
      </div>`;
    }

    function startQuiz(qid) {
      currentQuiz = QUIZZES.find(q => q.id === qid);
      if (!currentQuiz) return;
      currentQ = 0; score = 0; answered = false;
      document.getElementById('quiz-list').style.display = 'none';
      document.getElementById('quiz-active').style.display = 'block';
      timeLeft = currentQuiz.duration * 60;
      renderQuestion();
      startTimer();
    }

    function startTimer() {
      clearInterval(quizTimer);
      quizTimer = setInterval(() => {
        timeLeft--;
        const el = document.getElementById('quiz-timer');
        if (!el) { clearInterval(quizTimer); return; }
        const m = Math.floor(timeLeft/60).toString().padStart(2,'0');
        const s = (timeLeft%60).toString().padStart(2,'0');
        el.innerHTML = `<i class="ph-bold ph-timer"></i> ${m}:${s}`;
        el.style.color = timeLeft < 30 ? 'var(--danger)' : 'var(--text-secondary)';
        if (timeLeft <= 0) { clearInterval(quizTimer); finishQuiz(); }
      }, 1000);
    }

    function renderQuestion() {
      const q = currentQuiz.questions[currentQ];
      const total = currentQuiz.questions.length;
      const pct = Math.round(((currentQ)/total)*100);
      const letters = ['A','B','C','D'];
      document.getElementById('quiz-active').innerHTML = `
        <div style="max-width:760px;margin:0 auto">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
            <button class="btn btn-ghost btn-sm" onclick="exitQuiz()"><i class="ph-bold ph-arrow-left"></i> Kembali</button>
            <span id="quiz-timer" style="font-size:1rem;color:var(--text-secondary);font-weight:700;display:flex;align-items:center;gap:6px;"><i class="ph-bold ph-timer"></i> --:--</span>
            <span class="badge badge-primary" style="font-size:.85rem;padding:6px 14px;">Soal ${currentQ+1} dari ${total}</span>
          </div>
          <div class="progress-bar mb-6" style="height:12px;"><div class="progress-fill" style="width:${pct}%"></div></div>
          
          <div class="card animate-fade-in-up" style="padding:32px;margin-bottom:24px">
            <div class="badge badge-secondary mb-4" style="margin-bottom:20px">${currentQuiz.topic}</div>
            <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:32px;line-height:1.6">${q.text}</h2>
            <div style="display:flex;flex-direction:column;gap:14px" id="options-container">
              ${q.options.map((opt,i) => `
              <div class="quiz-option" id="option-${i}" onclick="selectAnswer(${i})">
                <span class="option-letter">${letters[i]}</span>
                <span>${opt}</span>
              </div>`).join('')}
            </div>
          </div>
          <div id="feedback-area"></div>
          <div style="display:flex;justify-content:flex-end;margin-top:20px">
            <button class="btn btn-primary btn-lg" id="next-btn" style="display:none" onclick="nextQuestion()">
              ${currentQ < currentQuiz.questions.length-1 ? 'Soal Berikutnya <i class="ph-bold ph-arrow-right"></i>' : '<i class="ph-bold ph-flag-checkered"></i> Lihat Hasil'}
            </button>
          </div>
        </div>`;
    }

    function selectAnswer(idx) {
      if (answered) return;
      answered = true;
      const q = currentQuiz.questions[currentQ];
      const correct = q.correct;
      
      // Menambahkan validasi agar tidak memasukkan class string kosong '' yang memicu SyntaxError
      document.querySelectorAll('.quiz-option').forEach((el, i) => {
        if (i === correct) {
          el.classList.add('correct');
        } else if (i === idx) {
          el.classList.add('wrong');
        }
      });
      
      const isCorrect = idx === correct;
      if (isCorrect) score++;
      
      document.getElementById('feedback-area').innerHTML = `
        <div class="card animate-fade-in-up" style="padding:20px;border-color:${isCorrect?'var(--success)':'var(--danger)'};background:${isCorrect?'rgba(0,230,118,.05)':'rgba(255,77,109,.05)'}; margin-top:16px;">
          <div style="font-weight:800;font-size:1.1rem;color:${isCorrect?'var(--success)':'var(--danger)'};margin-bottom:8px;display:flex;align-items:center;gap:8px;">
            ${isCorrect?'<i class="ph-fill ph-check-circle"></i> Benar!':'<i class="ph-fill ph-x-circle"></i> Kurang Tepat'}
          </div>
          <div style="font-size:.95rem;color:var(--text-secondary);line-height:1.6;">${q.explanation}</div>
        </div>`;
      document.getElementById('next-btn').style.display = 'inline-flex';
    }

    function nextQuestion() {
      currentQ++;
      answered = false;
      if (currentQ < currentQuiz.questions.length) renderQuestion();
      else finishQuiz();
    }

    function finishQuiz() {
      clearInterval(quizTimer);
      const user = getCurrentUser();
      const total = currentQuiz.questions.length;
      const pct = Math.round((score/total)*100);
      const xpEarned = score * 15;
      saveQuizResult(currentQuiz.id, {score, total, pct, timestamp: new Date().toISOString()});
      addXP(user.id, xpEarned, 'Menyelesaikan quiz');
      
      if (pct >= 90) launchConfetti();
      
      let iconResult = pct>=90 ? '<i class="ph-fill ph-trophy"></i>' : pct>=70 ? '<i class="ph-fill ph-star"></i>' : '<i class="ph-fill ph-books"></i>';
      let messageResult = pct>=90 ? '<i class="ph-bold ph-sparkle"></i> Luar Biasa!' : pct>=70 ? '<i class="ph-bold ph-thumbs-up"></i> Bagus!' : '<i class="ph-bold ph-barbell"></i> Terus Berlatih!';
      let badgeClass = pct>=90 ? 'success' : pct>=70 ? 'accent' : 'danger';
      
      document.getElementById('quiz-active').innerHTML = `
        <div style="max-width:600px;margin:0 auto;text-align:center">
          <div style="font-size:5.5rem; color: var(--${badgeClass}); animation:scoreReveal .8s cubic-bezier(.34,1.56,.64,1) both; margin-bottom:24px; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.2));">
            ${iconResult}
          </div>
          <h2 class="heading-lg mb-4">Quiz Selesai!</h2>
          <div style="background:var(--gradient-card);border:1px solid var(--border-glow);border-radius:var(--radius-xl);padding:40px;margin-bottom:32px;box-shadow:var(--shadow-lg);">
            <div style="font-family:var(--font-heading);font-size:4.5rem;font-weight:900;background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:12px;">${pct}%</div>
            <div style="color:var(--text-secondary);font-size:1.1rem;font-weight:500;margin-bottom:24px;">${score} dari ${total} soal benar</div>
            
            <div class="badge badge-${badgeClass}" style="margin-bottom:24px; font-size:.9rem; padding:8px 18px;">
              ${messageResult}
            </div>
            
            <div style="height:1px; background:var(--border); margin:24px 0;"></div>
            
            <div style="font-size:1.6rem;font-weight:800;color:var(--success);display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;">
              <i class="ph-bold ph-trend-up"></i> +${xpEarned} XP
            </div>
            <div style="font-size:.9rem;color:var(--text-muted);font-weight:500;">Ditambahkan ke akunmu</div>
          </div>
          
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
            <button class="btn btn-primary" onclick="startQuiz(${currentQuiz.id})"><i class="ph-bold ph-arrows-clockwise"></i> Ulangi Quiz</button>
            <button class="btn btn-ghost" onclick="exitQuiz()"><i class="ph-bold ph-list-dashes"></i> Daftar Quiz</button>
            <button class="btn btn-accent" onclick="navigate('leaderboard')"><i class="ph-bold ph-trophy"></i> Lihat Leaderboard</button>
          </div>
        </div>`;
    }

    function exitQuiz() {
      clearInterval(quizTimer);
      document.getElementById('quiz-active').style.display = 'none';
      document.getElementById('quiz-list').style.display = 'block';
      currentQuiz = null;
    }

    /* ==========================================================================
       [JS MODULE 9: LEADERBOARD & BADGES]
    ========================================================================== 
    */
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
            <h1><i class="ph-fill ph-trophy" style="color: var(--danger);"></i> Leaderboard & Achievement</h1>
            <p>Bersaing secara sehat, raih prestasi, dan tunjukkan kemampuan literasi digitalmu!</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:36px">
            <!-- Leaderboard -->
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h2 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-ranking"></i> Peringkat Siswa</h2>
                <div class="tabs" style="margin-bottom:0;width:auto">
                  <div class="tab-btn active" style="padding:6px 14px;font-size:.8rem">Minggu Ini</div>
                  <div class="tab-btn" style="padding:6px 14px;font-size:.8rem">Bulan Ini</div>
                </div>
              </div>
              
              <!-- Top 3 Podium -->
              <div style="display:flex;justify-content:center;align-items:flex-end;gap:12px;margin-bottom:32px; padding:0 10px;">
                ${[board[1],board[0],board[2]].filter(Boolean).map((u,i) => {
                  const pos = i===1?1:i===0?2:3;
                  const h = pos===1?140:pos===2?100:80;
                  const bg = pos===1?'linear-gradient(135deg,#FFD700,#FFA000)':pos===2?'linear-gradient(135deg,#E0E0E0,#9E9E9E)':'linear-gradient(135deg,#CD7F32,#A0522D)';
                  return `<div style="text-align:center;flex:1;position:relative;">
                    ${pos===1 ? '<div style="position:absolute;top:-24px;left:50%;transform:translateX(-50%);font-size:1.6rem;color:#FFD700;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4));"><i class="ph-fill ph-crown"></i></div>' : ''}
                    <div class="avatar" style="background:${u.color};color:#fff;margin:0 auto 10px;width:54px;height:54px;font-size:1.2rem;box-shadow:0 4px 12px rgba(0,0,0,0.3); border:2px solid rgba(255,255,255,0.2);">${u.avatar}</div>
                    <div style="font-size:.85rem;font-weight:700;margin-bottom:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding:0 4px;">${u.name.split(' ')[0]}</div>
                    <div style="background:${bg};border-radius:var(--radius-md) var(--radius-md) 0 0;height:${h}px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:12px; box-shadow:0 -4px 16px rgba(0,0,0,0.1) inset;">
                      <div style="color:rgba(0,0,0,0.6);font-family:var(--font-heading);font-weight:900;font-size:1.6rem">#${pos}</div>
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
                        return `<tr style="${isMe?'background:rgba(84, 174, 247,.1)':''}">
                          <td><span class="rank-badge rank-${i<3?i+1:'other'}">${i+1}</span></td>
                          <td><div class="user-cell">
                            <div class="avatar" style="background:${u.color};color:#fff">${u.avatar}</div>
                            <div>
                              <div style="font-weight:700;font-size:.95rem">${u.name} ${isMe?'<span class="badge badge-primary" style="padding:2px 8px;font-size:.65rem;margin-left:4px;">Kamu</span>':''}</div>
                              <div style="font-size:.8rem;color:var(--text-muted);font-weight:500;display:flex;align-items:center;gap:4px;"><i class="ph-fill ph-fire" style="color:var(--accent);"></i> ${u.streak||0} hari streak</div>
                            </div>
                          </div></td>
                          <td><span class="badge badge-primary">Lv ${u.level}</span></td>
                          <td><span style="font-weight:800;color:var(--accent);font-size:1.05rem;">${(u.xp||0).toLocaleString()}</span></td>
                        </tr>`;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
              ${myRank > 0 ? `<div class="card" style="margin-top:20px;padding:20px 24px;border-color:rgba(84, 174, 247,.4); background:rgba(84, 174, 247,.05);">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="color:var(--text-secondary);font-size:.95rem;font-weight:600;">Peringkatmu saat ini</span>
                  <div style="display:flex;align-items:center;gap:14px">
                    <span style="font-family:var(--font-heading);font-size:1.8rem;font-weight:900;color:var(--text-primary);">#${myRank}</span>
                    <span class="badge badge-primary">dari ${board.length} siswa</span>
                  </div>
                </div>
              </div>` : ''}
            </div>
            
            <!-- Badges -->
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
                <h2 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-medal"></i> Achievement Badges</h2>
                <span class="badge badge-accent" style="font-size:.85rem;padding:6px 14px;">${(getUserData(user.id)?.badges||[]).length}/${BADGES_DEF.length} Unlocked</span>
              </div>
              
              <div class="badges-grid animate-fade-in-right">
                ${BADGES_DEF.map(b => {
                  const ud = getUserData(user.id) || user;
                  const unlocked = (ud.badges||[]).includes(b.id);
                  return `<div class="achievement-badge ${unlocked?'unlocked':'locked'}" onclick="${unlocked?'showBadgeDetail(\''+b.id+'\')':'showToast(\'info\',\'Badge Terkunci\',\'Selesaikan tantangan untuk membuka badge ini!\')'}">
                    <div class="badge-icon-display">${b.icon}</div>
                    <div class="badge-name">${b.name}</div>
                    <div class="badge-desc">${b.desc}</div>
                    ${unlocked ? '<div style="margin-top:12px;font-size:.75rem;color:var(--accent);font-weight:800;display:flex;align-items:center;gap:4px;justify-content:center;"><i class="ph-bold ph-check-circle"></i> Diraih!</div>' : ''}
                  </div>`;
                }).join('')}
              </div>
              
              <div class="card" style="margin-top:32px;padding:28px">
                <h3 class="heading-sm mb-4" style="margin-bottom:20px;display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-info"></i> Cara Mendapat Badge</h3>
                <div style="display:flex;flex-direction:column;gap:16px">
                  ${BADGES_DEF.map(b => `<div style="display:flex;align-items:center;gap:16px">
                    <span style="font-size:1.6rem; color:var(--text-muted);">${b.icon}</span>
                    <div style="flex:1">
                      <div style="font-size:.9rem;font-weight:700;margin-bottom:2px;">${b.name}</div>
                      <div style="font-size:.8rem;color:var(--text-muted);line-height:1.4;">${b.desc}</div>
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
      showToast('success', badge.name + ' Unlocked!', badge.desc);
      launchConfetti();
    }

    /* ==========================================================================
       [JS MODULE 10: TEACHER STATS]
    ========================================================================== 
    */
    function renderStats() {
      const user = getCurrentUser();
      if (!user || user.role !== 'teacher') return navigate('dashboard');
      const students = USERS.filter(u => u.role === 'student');
      
      document.getElementById('app').innerHTML = `
      <div class="app-layout">
        ${renderSidebar('stats')}
        <main class="main-content">
          <div class="page-header animate-fade-in-down">
            <h1><i class="ph-fill ph-chart-bar" style="color: var(--success);"></i> Statistik Kelas</h1>
            <p>Pantau perkembangan seluruh siswa secara menyeluruh dan real-time.</p>
          </div>
          <div class="stats-grid">
            <div class="stat-card animate-fade-in-up">
              <div class="stat-card-icon" style="background:rgba(84, 174, 247,.15); color:var(--primary-light);"><i class="ph-fill ph-users"></i></div>
              <div class="stat-card-value">${students.length}</div>
              <div class="stat-card-label">Total Siswa Aktif</div>
              <div class="stat-card-change positive"><i class="ph-bold ph-trend-up"></i> Semua aktif minggu ini</div>
            </div>
            <div class="stat-card animate-fade-in-up delay-100">
              <div class="stat-card-icon" style="background:rgba(0,230,118,.15); color:var(--success);"><i class="ph-fill ph-target"></i></div>
              <div class="stat-card-value">${Math.round(students.reduce((s,u)=>s+(u.quizScores||0),0)/students.length)}%</div>
              <div class="stat-card-label">Rata-rata Skor Quiz</div>
              <div class="stat-card-change positive"><i class="ph-bold ph-trend-up"></i> +3.2% dari minggu lalu</div>
            </div>
            <div class="stat-card animate-fade-in-up delay-200">
              <div class="stat-card-icon" style="background:rgba(255, 195, 56,.15); color:var(--secondary);"><i class="ph-fill ph-chats-circle"></i></div>
              <div class="stat-card-value">${students.reduce((s,u)=>s+(u.dialogues||0),0)}</div>
              <div class="stat-card-label">Total Kontribusi Dialog</div>
              <div class="stat-card-change positive"><i class="ph-bold ph-trend-up"></i> +18 hari ini</div>
            </div>
            <div class="stat-card animate-fade-in-up delay-300">
              <div class="stat-card-icon" style="background:rgba(255, 195, 56,.15); color:var(--accent);"><i class="ph-fill ph-lightbulb"></i></div>
              <div class="stat-card-value">${students.reduce((s,u)=>s+(u.opinions||0),0)}</div>
              <div class="stat-card-label">Total Opini Dipublikasikan</div>
              <div class="stat-card-change positive"><i class="ph-bold ph-trend-up"></i> +7 hari ini</div>
            </div>
          </div>
          <div class="card animate-fade-in-up">
            <div class="card-header">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
                <h3 class="heading-sm" style="display:flex;align-items:center;gap:8px;"><i class="ph-bold ph-clipboard-text"></i> Detail Per Siswa</h3>
                <div style="position:relative;">
                  <i class="ph-bold ph-magnifying-glass" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);"></i>
                  <input class="form-control" style="width:240px;padding:10px 16px 10px 36px;font-size:.9rem;border-radius:var(--radius-full);" placeholder="Cari siswa..." oninput="filterStudents(this.value)">
                </div>
              </div>
            </div>
            <div class="card-body" style="padding:0; overflow-x:auto;">
              <table class="leaderboard-table" id="students-table" style="min-width:800px;">
                <thead><tr><th>Siswa</th><th>Level & XP</th><th>Quiz</th><th>Opini</th><th>Dialog</th><th>Streak</th><th>Badge</th></tr></thead>
                <tbody id="students-tbody">
                  ${students.map(u => `<tr id="student-row-${u.id}">
                    <td><div class="user-cell"><div class="avatar" style="background:${u.color};color:#fff">${u.avatar}</div>
                      <div><div style="font-weight:700;font-size:.95rem;">${u.name}</div><div style="font-size:.8rem;color:var(--text-muted);font-weight:500;">${u.email}</div></div>
                    </div></td>
                    <td><span class="badge badge-primary" style="margin-bottom:4px;">Lv ${u.level}</span><br><span style="font-size:.8rem;color:var(--text-muted);font-weight:600;">${(u.xp||0).toLocaleString()} XP</span></td>
                    <td><span style="font-weight:800;font-size:1.05rem;color:${(u.quizScores||0)>=85?'var(--success)':(u.quizScores||0)>=70?'var(--accent)':'var(--danger)'}">${u.quizScores||0}%</span></td>
                    <td><span style="font-weight:600;">${u.opinions||0}</span></td>
                    <td><span style="font-weight:600;">${u.dialogues||0}</span></td>
                    <td><span style="color:var(--accent);font-weight:700;display:flex;align-items:center;gap:4px;"><i class="ph-fill ph-fire"></i> ${u.streak||0} hr</span></td>
                    <td><span style="font-weight:600;">${(u.badges||[]).length}/${BADGES_DEF.length}</span></td>
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

    /* ==========================================================================
       [JS MODULE 11: MAIN ROUTER & UTILITIES]
    ========================================================================== 
    */
    let currentPage = 'landing';
    let sidebarOpen = false;

    // Toast System
    const TOAST_ICONS = { 
      success:'<i class="ph-fill ph-check-circle"></i>', 
      error:'<i class="ph-fill ph-x-circle"></i>', 
      info:'<i class="ph-fill ph-info"></i>', 
      warning:'<i class="ph-fill ph-warning"></i>' 
    };
    
    function showToast(type, title, message, duration=4000) {
      const container = document.getElementById('toast-container');
      const id = 'toast-' + Date.now();
      const el = document.createElement('div');
      el.className = `toast toast-${type}`;
      el.id = id;
      el.innerHTML = `<div class="toast-icon">${TOAST_ICONS[type]||TOAST_ICONS.info}</div>
        <div class="toast-content"><div class="toast-title">${title}</div><div class="toast-message">${message}</div></div>
        <button onclick="removeToast('${id}')" style="color:var(--text-muted);padding:4px;border-radius:8px;height:32px;width:32px;display:flex;align-items:center;justify-content:center;font-size:1.1rem" class="btn btn-ghost"><i class="ph-bold ph-x"></i></button>`;
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

    // Confetti Animation
    function launchConfetti() {
      const canvas = document.getElementById('confetti-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      const particles = Array.from({length:120}, () => ({
        x: Math.random()*canvas.width, y: -20,
        vx: (Math.random()-0.5)*5, vy: Math.random()*4+2,
        color: ['#54AEF7','#FFC338','#FFC338','#00E676','#FF4D6D','#8ACAF9','#fff'][Math.floor(Math.random()*7)],
        size: Math.random()*10+4, angle: Math.random()*360, spin: (Math.random()-0.5)*8,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      }));
      let frame = 0;
      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach((p,i) => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.angle += p.spin;
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

    // Modal Helpers
    function openModal(id) { document.getElementById(id).classList.add('open'); }
    function closeModal(id) { document.getElementById(id).classList.remove('open'); }
    window.addEventListener('click', e => {
      if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
    });

    // Theme Management
    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next === 'dark' ? '' : 'light');
      localStorage.setItem('socratech_theme', next);
      renderNavbar();
    }
    
    function initTheme() {
      const saved = localStorage.getItem('socratech_theme');
      if (saved === 'light') document.documentElement.setAttribute('data-theme','light');
    }

    // Navigation & Layout Rendering
    function renderNavbar() {
      const user = getCurrentUser();
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const themeIcon = isLight ? '<i class="ph-fill ph-moon"></i>' : '<i class="ph-fill ph-sun"></i>';
      let navLinks = '';
      let navRight = '';
      
      if (!user) {
        navLinks = `<a class="nav-link" onclick="navigate('landing')">Beranda</a>
          <a class="nav-link" onclick="navigate('landing','features')">Fitur</a>`;
        navRight = `<button class="btn btn-ghost btn-sm" onclick="navigate('auth')">Masuk</button>
          <button class="btn btn-primary btn-sm" onclick="navigate('auth')"><i class="ph-bold ph-rocket-launch"></i> Daftar Gratis</button>`;
      } else {
        navRight = `<div style="display:flex;align-items:center;gap:12px;cursor:pointer; padding:6px 12px; border-radius:var(--radius-full); transition:var(--transition-fast);" class="hover-glow" onclick="navigate('dashboard')">
            <div class="avatar" style="background:${user.color||'var(--gradient-primary)'};color:#fff; width:38px; height:38px; font-size:1rem; border:2px solid rgba(255,255,255,0.2);">${user.avatar||user.name[0]}</div>
            <div style="display:flex;flex-direction:column;line-height:1.3">
              <span style="font-size:.9rem;font-weight:700">${user.name.split(' ')[0]}</span>
              <span style="font-size:.75rem;color:var(--text-muted);font-weight:600;">Level ${user.level} • ${user.xp} XP</span>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm btn-icon" onclick="doLogout()" title="Keluar"><i class="ph-bold ph-sign-out"></i></button>`;
      }
      
      document.getElementById('navbar').innerHTML = `<div class="container">
        <div class="nav-logo" onclick="navigate(${user?'\'dashboard\'':'\'landing\''})">
          <div class="logo-icon"><i class="ph-fill ph-graduation-cap"></i></div>
          <span class="logo-text">SOCRATECH</span>
        </div>
        <div class="nav-links">${navLinks}</div>
        <div class="nav-actions">
          <button class="btn btn-ghost btn-icon" onclick="toggleLanguage()" title="Ubah Bahasa / Switch Language" style="font-size:1.1rem; padding:8px; font-weight:800; font-family:var(--font-heading);">${window.currentLang === 'en' ? 'EN' : 'ID'}</button>
          <button class="btn btn-ghost btn-icon" onclick="toggleTheme()" title="Ganti tema" style="font-size:1.3rem; padding:8px;">${themeIcon}</button>
          ${navRight}
          <button class="btn btn-ghost btn-icon" id="sidebar-toggle" style="display:none;font-size:1.4rem; padding:8px;" onclick="toggleSidebar()"><i class="ph-bold ph-list"></i></button>
        </div>
      </div>`;
      
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

    function renderSidebar(activePage) {
      const user = getCurrentUser();
      if (!user) return '';
      const isTeacher = user.role === 'teacher';
      const links = [
        { icon:'<i class="ph-fill ph-house"></i>', label:'Dashboard', page:'dashboard' },
        { icon:'<i class="ph-fill ph-newspaper-clipping"></i>', label:'Visual News', page:'news' },
        { icon:'<i class="ph-fill ph-chats-circle"></i>', label:'Dialogue Space', page:'dialogue' },
        { icon:'<i class="ph-fill ph-lightbulb"></i>', label:'Opinion Wall', page:'opinion' },
        { icon:'<i class="ph-fill ph-notepad"></i>', label:'Weekly Quiz', page:'quiz' },
        { icon:'<i class="ph-fill ph-trophy"></i>', label:'Leaderboard', page:'leaderboard' },
      ];
      const teacherLinks = [
        { icon:'<i class="ph-fill ph-chart-bar"></i>', label:'Statistik Kelas', page:'stats' },
      ];
      
      let linksHtml = `<div class="sidebar-label">Menu Utama</div>`;
      links.forEach(l => {
        linksHtml += `<div class="sidebar-link ${activePage===l.page?'active':''}" onclick="navigate('${l.page}')">
          <span class="sidebar-icon">${l.icon}</span><span>${l.label}</span>
        </div>`;
      });
      
      if (isTeacher) {
        linksHtml += `<div class="sidebar-label" style="margin-top:20px;">Manajemen Guru</div>`;
        teacherLinks.forEach(l => {
          linksHtml += `<div class="sidebar-link ${activePage===l.page?'active':''}" onclick="navigate('${l.page}')">
            <span class="sidebar-icon">${l.icon}</span><span>${l.label}</span>
          </div>`;
        });
      }
      
      linksHtml += `<div style="margin-top:auto;padding-top:24px">
        <div class="sidebar-link" onclick="doLogout()"><span class="sidebar-icon"><i class="ph-bold ph-sign-out"></i></span><span>Keluar</span></div>
      </div>`;
      
      return `<div class="sidebar" id="sidebar">${linksHtml}</div>`;
    }

    // Main Router
    function navigate(page, anchor) {
      currentPage = page;
      sidebarOpen = false;
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (backdrop) { backdrop.classList.remove('visible'); setTimeout(() => backdrop.remove(), 300); }
      
      renderNavbar();
      
      const app = document.getElementById('app');
      app.className = 'page-enter';
      setTimeout(() => app.className = '', 500);
      
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
      
      if (anchor) {
        setTimeout(() => { 
          const el = document.getElementById(anchor); 
          if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); 
        }, 200);
      }
      window.scrollTo(0,0);
    }

    // Initialize Application
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      renderNavbar();
      const user = getCurrentUser();
      if (user) navigate('dashboard');
      else navigate('landing');
      window.addEventListener('resize', renderNavbar);
    });
    

// Language Management
const I18N = {
  "Beranda": "Home",
  "Fitur": "Features",
  "Masuk": "Log In",
  "Daftar Gratis": "Sign Up Free",
  "Keluar": "Log Out",
  "Login cepat sebagai:": "Quick login as:",
  "Akun Siswa": "Student Account",
  "Akun Guru": "Teacher Account",
  "Email": "Email",
  "Password": "Password",
  "Masuk ke Platform": "Enter Platform",
  "Daftar": "Register",
  "Daftar Sebagai": "Register As",
  "Siswa": "Student",
  "Guru": "Teacher",
  "Nama Lengkap": "Full Name",
  "Buat Akun": "Create Account",
  "Menu Utama": "Main Menu",
  "Aksi Cepat": "Quick Actions",
  "Total Siswa": "Total Students",
  "Quiz Aktif": "Active Quizzes",
  "Pesan Dialog": "Dialogue Messages",
  "Rata-rata Skor": "Average Score",
  "Skor Quiz Rata-rata": "Avg Quiz Score",
  "Opini Dipublikasikan": "Published Opinions",
  "Kontribusi Dialog": "Dialogue Contributions",
  "Hari Streak Aktif": "Active Streak Days",
  "Pertahankan!": "Keep it up!",
  "Selesaikan aktivitas untuk unlock badge!": "Complete activities to unlock badges!",
  "Mulai Quiz": "Start Quiz",
  "Badge Diraih": "Earned Badges",
  "Lihat Semua": "View All",
  "Aktivitas Siswa Terbaru": "Recent Student Activity",
  "Buat Quiz Baru": "New Quiz",
  "Buat Berita Visual": "New Visual News",
  "Buka Ruang Dialog": "Open Dialogue",
  "Lihat Statistik": "View Stats",
  "Ikuti Dialog": "Join Dialogue",
  "Post Opini": "Post Opinion",
  "Ambil Quiz": "Take Quiz",
  "Halo": "Hello",
  "Statistik Kelas": "Class Stats",
  "Mulai Sekarang": "Start Now",
  "Lihat Fitur": "Features",
  "Daftar sebagai Siswa": "Register as Student",
  "Daftar sebagai Guru": "Register as Teacher",
  "Sistem Baru": "New System",
  "Inovasi Pedagogik": "Pedagogical Innovation",
  "Ekosistem Sosial": "Social Ecosystem",
  "Gamifikasi": "Gamification",
  "Fitur Unggulan": "Key Features",
  "Semua yang Kamu Butuhkan untuk": "Everything You Need for",
  "Kebaruan Platform": "Platform Novelty",
  "Ruang Diskusi": "Dialogue Rooms",
  "Pilih Ruang Diskusi": "Select Dialogue Room",
  "Buat Ruang Baru": "Create New Room",
  "peserta": "participants",
  "pesan": "messages",
  "Tulis pendapatmu...": "Write your opinion...",
  "Kirim": "Send",
  "Judul Berita": "News Title",
  "Ringkasan Isi": "Summary",
  "Kategori": "Category",
  "Sudut Pandang": "Perspective",
  "Analisis Kritis Sokratik": "Critical Socratic Analysis",
  "Sumber Berita": "News Source",
  "Publikasikan ke Opinion Wall": "Publish to Opinion Wall",
  "Preview Kartu Berita": "News Card Preview",
  "Berita Visual Semua Siswa": "All Students Visual News",
  "Berita Visual Saya": "My Visual News",
  "Belum Ada Berita Visual": "No Visual News Yet",
  "Buat berita visualmu yang pertama!": "Create your first visual news!",
  "Teknologi": "Technology",
  "Lingkungan": "Environment",
  "Politik": "Politics",
  "Pendidikan": "Education",
  "Sains": "Science",
  "Sosial": "Social",
  "Pro": "Pro",
  "Kontra": "Cons",
  "Netral": "Neutral",
  "Kritis": "Critical",
  "Platform Literasi Digital Gamifikasi": "Gamified Digital Literacy Platform",
  "Platform Literasi Digital Generasi Z": "Gen Z Digital Literacy Platform",
  "Belajar Kritis": "Critical Learning",
  "Lebih Seru": "More Fun",
  "dengan SOCRATECH": "with SOCRATECH",
  "Inovasi Platform Literasi Digital Gamifikasi untuk SMA": "Gamified Digital Literacy Platform Innovation for High School",
  "Siswa Aktif": "Active Students",
  "Kepuasan Pengguna": "User Satisfaction",
  "Berpikir Kritis": "Critical Thinking",
  
  // Dashboard & Misc
  "Selamat datang di dashboard guru. Pantau perkembangan siswa Anda.": "Welcome to the teacher dashboard. Monitor your students' progress.",
  "Lanjutkan perjalanan belajarmu hari ini!": "Continue your learning journey today!",
  "menuju Level": "to Level",
  "selesai minggu ini": "completed this wk",
  "hari": "days",
  "minggu ini": "this week",
  "Peringkat Siswa": "Student Rankings",
  "Minggu Ini": "This Week",
  "Bulan Ini": "This Month",
  "Peringkat Anda:": "Your Rank:",
  "Bersaing secara sehat, raih prestasi, dan tunjukkan kemampuan literasi digitalmu!": "Compete healthily, achieve greatness, and show your digital literacy skills!",
  "Koleksi Lencana": "Badge Collection",
  "Lencana Belum Terbuka": "Locked Badges",
  "Buka lebih banyak aktivitas untuk meraih lencana!": "Complete activities to unlock badges!",
  "Semua Siswa": "All Students",
  "Total Guru": "Total Teachers",
  "Terbaru": "Latest",
  "Terpopuler": "Popular",
  "Trending": "Trending",
  "Ganti tema": "Toggle Theme",
  "Lihat Semua": "View All"
,

  // Landing Page Text
  "Ubah berita aktual menjadi infografis visual yang menarik dengan analisis kritis terstruktur.": "Turn current news into engaging visual infographics with structured critical analysis.",
  "Ruang diskusi interaktif dengan panduan pertanyaan Sokratik AI untuk mempertajam argumen.": "Interactive discussion room with AI Socratic question guides to sharpen arguments.",
  "Platform ekspresi opini siswa dengan sistem reaksi dan kurasi opini terbaik mingguan.": "Student opinion expression platform with reaction systems and weekly best opinion curation.",
  "Kuis mingguan berbasis literasi dengan timer, feedback instan, dan pelacakan progres.": "Literacy-based weekly quiz with timer, instant feedback, and progress tracking.",
  "Sistem gamifikasi dengan poin XP, level, dan badge pencapaian untuk motivasi belajar.": "Gamified system with XP points, levels, and achievement badges for learning motivation.",
  "Model dialog berbasis metode Sokratik untuk membangun kemampuan berpikir kritis mendalam.": "Dialogue model based on the Socratic method to build deep critical thinking skills.",
  "Sistem otomatis transformasi berita keras menjadi visual digital yang mudah dipahami.": "Automated system for transforming hard news into easy-to-understand digital visuals.",
  "Model dialog digital berbasis metode filsafat Sokratik untuk pendidikan kritis abad 21.": "Digital dialogue model based on Socratic philosophy for 21st-century critical education.",
  "Ekosistem opini siswa yang terstruktur dengan sistem validasi dan apresiasi peer-to-peer.": "Structured student opinion ecosystem with peer-to-peer validation and appreciation.",
  "Pendekatan gamifikasi yang mengintegrasikan literasi kritis ke dalam pengalaman belajar menyenangkan.": "Gamified approach integrating critical literacy into a fun learning experience.",
  "Platform LMS gamifikasi berbasis inkuiri Sokratik dan transformasi visual berita untuk meningkatkan kesadaran kritis siswa SMA.": "Gamified LMS platform based on Socratic inquiry and news visual transformation to enhance high school students' critical awareness.",
  "Budi naik ke Level 8!": "Budi leveled up to 8!",
  "Berita Visual Baru Tersedia": "New Visual News Available",
  "Siswa Aktif Berdiskusi": "Students Actively Discussing",
  "4 Inovasi yang Membuat": "4 Innovations Making",
  "Unik": "Unique",
  "SOCRATECH Unik": "SOCRATECH Unique",
  "Keunikan platform yang menggabungkan pedagogi Sokratik dengan teknologi modern untuk pengalaman belajar yang belum pernah ada.": "Platform uniqueness combining Socratic pedagogy with modern technology for an unprecedented learning experience.",
  "Siap Memulai Perjalanan": "Ready to Start Your Journey in",
  "Bergabung dengan ratusan siswa dan guru yang sudah membuktikan efektivitas SOCRATECH dalam membangun literasi digital.": "Join hundreds of students and teachers who have proven the effectiveness of SOCRATECH in building digital literacy.",
  "Enam fitur inovatif yang dirancang khusus untuk membangun kemampuan literasi digital dan berpikir kritis siswa SMA.": "Six innovative features specifically designed to build digital literacy and critical thinking skills for high school students.",
  "Inkuiri Sokratik Digital": "Digital Socratic Inquiry",
  "Visual News Transformation": "Visual News Transformation",
  "Student Opinion Ecosystem": "Student Opinion Ecosystem",
  "Gamified Critical Literacy": "Gamified Critical Literacy",
  "Smart Visual News Generator": "Smart Visual News Generator",
  "Student Dialogue Space": "Student Dialogue Space",
  "Student Opinion Wall": "Student Opinion Wall",
  "Weekly Mini Quiz": "Weekly Mini Quiz",
  "Leaderboard & Badges": "Leaderboard & Badges",
  
  // Toasts and Popups
  "Selesaikan tantangan untuk membuka badge ini!": "Complete challenges to unlock this badge!",
  "Badge Terkunci": "Locked Badge",
  "Berhasil Masuk": "Successfully Logged In",
  "Selamat datang kembali": "Welcome back",
  "Gagal Masuk": "Login Failed",
  "Email atau password salah.": "Incorrect email or password.",
  "Akun Terdaftar": "Account Registered",
  "Silakan login menggunakan akun baru.": "Please log in using your new account.",
  "Pesan Kosong": "Empty Message",
  "Tulis sesuatu sebelum mengirim.": "Write something before sending.",
  "Opini Kosong": "Empty Opinion",
  "Tulis pendapatmu sebelum mempublish.": "Write your opinion before publishing.",
  "Opini Berhasil Dipublish": "Opinion Successfully Published",
  "Terima kasih atas kontribusimu!": "Thank you for your contribution!",
  "Berita Dipublikasikan": "News Published",
  "Visual berita berhasil ditambahkan.": "Visual news successfully added.",
  "Quiz Selesai!": "Quiz Completed!",
  "Kamu mendapat skor": "You scored",
  "dan": "and",
  "Kamu medapatkan badge baru!": "You earned a new badge!",
  "Jawaban Tersimpan": "Answer Saved",
  "Lanjutkan ke pertanyaan berikutnya.": "Proceed to the next question.",
  "Pilih opsi sebelum lanjut.": "Select an option before continuing.",
  "Terkirim": "Sent",
  "Belum ada opini.": "No opinions yet.",
  "Belum ada berita.": "No news yet.",
  "Semua pesan udah dibaca.": "All messages have been read.",
  "Selesaikan aktivitas ini untuk mendapat poin.": "Complete this activity to earn points."

,

  // Badges and Additional UI
  "Selesaikan 10 quiz dengan skor sempurna": "Complete 10 quizzes with a perfect score",
  "50 kontribusi dalam dialog": "50 dialogue contributions",
  "Buat 20 berita visual": "Create 20 visual news",
  "Terima 100 reaksi di Opinion Wall": "Receive 100 reactions on Opinion Wall",
  "Aktif 7 hari berturut-turut": "Active for 7 consecutive days",
  "Kumpulkan semua badge lainnya": "Collect all other badges",
  "Cara Mendapat Badge": "How to Earn Badges",
  "Diraih!": "Earned!"

};

window.currentLang = localStorage.getItem('local_lang') || 'id';

window.toggleLanguage = function() {
  window.currentLang = window.currentLang === 'id' ? 'en' : 'id';
  localStorage.setItem('local_lang', window.currentLang);
  // Re-render navbar immediately for state switch
  renderNavbar();
  location.reload();
};

window.translateDOM = function(node) {
  if (window.currentLang === 'id') return; 
  if (!node) return;
  
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue;
    if (!text.trim()) return;
    
    // Direct Exact Match
    if (I18N[text.trim()]) {
      node.nodeValue = text.replace(text.trim(), I18N[text.trim()]);
      return;
    }
    
    // Partial Match for compound strings avoiding modifying random words
    let modified = false;
    // Iterate reverse to match larger phrases first (like "menuju Level" instead of "Level" or similar)
    const keys = Object.keys(I18N).sort((a,b) => b.length - a.length);
    for (const idStr of keys) {
      const enStr = I18N[idStr];
      if (text.includes(idStr)) {
        text = text.split(idStr).join(enStr);
        modified = true;
      }
    }
    if (modified) node.nodeValue = text;
    
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // DO NOT translate user input text nodes (skip contents, but not placeholders)
    if (node.classList && (
        node.classList.contains('chat-bubble-content') || 
        node.classList.contains('opinion-content') || 
        node.classList.contains('news-card-summary') ||
        node.classList.contains('prev-summary') ||
        node.classList.contains('leaderboard-name') // Example addition for safety
    )) {
      return;
    }

    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
      const placeholder = node.getAttribute('placeholder');
      if (placeholder) {
        if (I18N[placeholder.trim()]) {
          node.setAttribute('placeholder', I18N[placeholder.trim()]);
        } else {
            let pText = placeholder;
            const keys = Object.keys(I18N).sort((a,b) => b.length - a.length);
            for (const idStr of keys) {
                pText = pText.split(idStr).join(I18N[idStr]);
            }
            node.setAttribute('placeholder', pText);
        }
      }
    } else if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        window.translateDOM(child);
      }
    }
  }
};

// Initial translation + setup Observer for dynamic changes
document.addEventListener('DOMContentLoaded', () => {
    if (window.currentLang === 'id') return;
    window.translateDOM(document.body);
    
    const observer = new MutationObserver((mutations) => {
      observer.disconnect(); // prevent infinite loops
      mutations.forEach(m => {
        if (m.type === 'childList') {
           m.addedNodes.forEach(node => {
              if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                 window.translateDOM(node);
              }
           });
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});

// Post-render force check
setTimeout(() => { if(window.currentLang==='en') window.translateDOM(document.body) }, 50);

