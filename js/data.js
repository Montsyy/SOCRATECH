
// SOCRATECH — Mock Data
const USERS = [
  { id:1, name:'Budi Santoso', role:'student', email:'budi@student.sch', avatar:'BS', color:'#6C3CE1', level:8, xp:7840, xpNext:8500, badges:['quiz_master','socratic_scholar','rising_star'], streak:12, quizScores:92, opinions:23, dialogues:47 },
  { id:2, name:'Sari Dewi', role:'student', email:'sari@student.sch', avatar:'SD', color:'#00D4FF', level:7, xp:6200, xpNext:7000, badges:['news_analyst','opinion_leader'], streak:8, quizScores:88, opinions:31, dialogues:38 },
  { id:3, name:'Arif Rahman', role:'student', email:'arif@student.sch', avatar:'AR', color:'#FFB800', level:6, xp:5100, xpNext:6000, badges:['rising_star'], streak:5, quizScores:79, opinions:15, dialogues:29 },
  { id:4, name:'Maya Putri', role:'student', email:'maya@student.sch', avatar:'MP', color:'#00E676', level:5, xp:4300, xpNext:5000, badges:['quiz_master'], streak:3, quizScores:85, opinions:19, dialogues:22 },
  { id:5, name:'Reza Hidayat', role:'student', email:'reza@student.sch', avatar:'RH', color:'#FF4D6D', level:4, xp:3100, xpNext:4000, badges:[], streak:2, quizScores:71, opinions:11, dialogues:17 },
  { id:6, name:'Pak Ahmad', role:'teacher', email:'ahmad@guru.sch', avatar:'PA', color:'#8B5CF6', level:10, xp:9999, xpNext:9999, badges:['quiz_master','socratic_scholar','news_analyst','opinion_leader','rising_star','critical_thinker'], streak:30, quizScores:100, opinions:5, dialogues:120 },
  { id:7, name:'Bu Fatimah', role:'teacher', email:'fatimah@guru.sch', avatar:'BF', color:'#F59E0B', level:10, xp:9999, xpNext:9999, badges:['quiz_master','news_analyst'], streak:25, quizScores:100, opinions:3, dialogues:95 },
];

const BADGES_DEF = [
  { id:'quiz_master', emoji:'🥇', name:'Quiz Master', desc:'Selesaikan 10 quiz dengan skor sempurna', maxProgress:10 },
  { id:'socratic_scholar', emoji:'💬', name:'Socratic Scholar', desc:'50 kontribusi dalam dialog', maxProgress:50 },
  { id:'news_analyst', emoji:'📰', name:'News Analyst', desc:'Buat 20 berita visual', maxProgress:20 },
  { id:'opinion_leader', emoji:'⭐', name:'Opinion Leader', desc:'Terima 100 reaksi di Opinion Wall', maxProgress:100 },
  { id:'rising_star', emoji:'🚀', name:'Rising Star', desc:'Aktif 7 hari berturut-turut', maxProgress:7 },
  { id:'critical_thinker', emoji:'🎯', name:'Critical Thinker', desc:'Kumpulkan semua badge lainnya', maxProgress:5 },
];

const QUIZZES = [
  {
    id:1, title:'Literasi Media Digital: Fakta vs Hoaks',
    topic:'Literasi Media', deadline:'2026-03-22', duration:15,
    totalPoints:100, createdBy:'Pak Ahmad', difficulty:'Sedang', participants:28,
    questions:[
      { id:1, text:'Apa yang dimaksud dengan "filter bubble" dalam konsumsi berita digital?',
        options:['Fitur filter foto di media sosial','Fenomena di mana algoritma hanya menampilkan konten sesuai preferensi pengguna','Teknik editing video','Program pemerintah untuk sensor internet'],
        correct:1, explanation:'Filter bubble terjadi saat algoritma platform digital membatasi informasi yang kita terima sesuai kebiasaan dan preferensi kita, menciptakan "gelembung" informasi.' },
      { id:2, text:'Manakah yang BUKAN merupakan ciri berita hoaks?',
        options:['Judul sensasional dan provokatif','Tidak ada sumber yang jelas','Fakta dapat diverifikasi oleh banyak sumber terpercaya','Gambar tidak relevan dengan konten'],
        correct:2, explanation:'Berita yang faktanya dapat diverifikasi oleh banyak sumber terpercaya justru merupakan ciri berita yang valid, bukan hoaks.' },
      { id:3, text:'Metode SIFT dalam verifikasi informasi digital singkatan dari?',
        options:['Stop, Investigate, Find, Track','Search, Identify, Filter, Test','Stop, Investigate the source, Find better coverage, Trace claims','Sort, Identify, Find, Transfer'],
        correct:2, explanation:'SIFT = Stop (berhenti sejenak), Investigate the source (investigasi sumber), Find better coverage (cari liputan lebih baik), Trace claims (lacak klaim ke sumber asli).' },
      { id:4, text:'Apa yang dimaksud dengan "deepfake" dalam konteks disinformasi?',
        options:['Berita yang sangat dalam analisisnya','Konten media yang dimanipulasi menggunakan AI untuk membuat orang terlihat berkata/melakukan hal yang tidak pernah dilakukan','Jenis kriptografi data','Platform media sosial bawah tanah'],
        correct:1, explanation:'Deepfake adalah konten video/audio yang dimanipulasi oleh AI untuk mengganti wajah atau suara seseorang, sering digunakan untuk menyebarkan disinformasi.' },
      { id:5, text:'Prinsip Sokratik mana yang paling relevan dalam menganalisis berita?',
        options:['Menerima informasi dari otoritas tanpa pertanyaan','Mempertanyakan asumsi dan mencari bukti yang mendukung serta menentang klaim','Hanya membaca sumber yang kita percaya','Berbagi informasi secepat mungkin'],
        correct:1, explanation:'Pendekatan Sokratik mendorong kita untuk selalu mempertanyakan asumsi, mencari alasan dan bukti, serta mempertimbangkan berbagai perspektif sebelum menerima suatu klaim.' },
    ]
  },
  {
    id:2, title:'Kebebasan Berpendapat di Era Digital',
    topic:'Etika Digital', deadline:'2026-03-29', duration:12,
    totalPoints:100, createdBy:'Bu Fatimah', difficulty:'Mudah', participants:0,
    questions:[
      { id:1, text:'Apa batasan kebebasan berpendapat yang diakui secara universal?',
        options:['Tidak boleh mengkritik pemerintah','Ucapan yang menghasut kebencian dan kekerasan','Semua pendapat boleh disampaikan tanpa batasan','Hanya boleh berpendapat secara anonim'],
        correct:1, explanation:'Kebebasan berpendapat diakui secara universal namun memiliki batasan, terutama ucapan yang menghasut kebencian (hate speech), diskriminasi, atau kekerasan.' },
      { id:2, text:'Apa yang dimaksud dengan "echo chamber" di media sosial?',
        options:['Fitur karaoke online','Lingkungan di mana hanya ide-ide yang serupa yang diperkuat dan disebarluaskan','Ruang rekaman podcast','Algoritma pencarian google'],
        correct:1, explanation:'Echo chamber adalah lingkungan informasi di mana seseorang hanya terpapar pada pendapat dan informasi yang mengkonfirmasi keyakinan mereka sendiri.' },
      { id:3, text:'UU ITE di Indonesia mengatur tentang?',
        options:['Informatika dan Teknologi Eboni','Informasi dan Transaksi Elektronik','Internet dan Telekomunikasi Eksklusif','Inovasi Teknologi dan Ekosistem'],
        correct:1, explanation:'UU ITE adalah singkatan dari Undang-Undang Informasi dan Transaksi Elektronik, yang mengatur berbagai aspek hukum terkait penggunaan internet dan transaksi digital di Indonesia.' },
    ]
  },
];

const OPINIONS = [
  { id:1, authorId:1, authorName:'Budi Santoso', authorAvatar:'BS', authorColor:'#6C3CE1', category:'Media Sosial', tag:'Literasi', content:'Menurut saya, media sosial telah mengubah cara kita mengonsumsi berita secara fundamental. Algoritma yang menentukan apa yang kita lihat sebenarnya membatasi sudut pandang kita. Kita perlu sadar bahwa apa yang muncul di feed kita bukan representasi realita yang sesungguhnya.', reactions:{ setuju:24, perlu_dikaji:8, insight:15 }, userReactions:{}, timestamp:'2026-03-14T08:30:00', pinned:true },
  { id:2, authorId:2, authorName:'Sari Dewi', authorAvatar:'SD', authorColor:'#00D4FF', category:'Hoaks', tag:'Kritis', content:'Hoaks menyebar lebih cepat dari fakta karena secara psikologis kita lebih tertarik pada hal-hal yang mengejutkan dan emosional. Solusinya bukan hanya edukasi literasi media, tapi juga perubahan desain platform untuk memperlambat penyebaran konten yang belum terverifikasi.', reactions:{ setuju:31, perlu_dikaji:12, insight:22 }, userReactions:{}, timestamp:'2026-03-13T14:20:00', pinned:false },
  { id:3, authorId:3, authorName:'Arif Rahman', authorAvatar:'AR', authorColor:'#FFB800', category:'Teknologi', tag:'AI', content:'AI generatif seperti deepfake dan teks otomatis membuat verifikasi informasi semakin sulit. Sebagai siswa, kita harus belajar tidak hanya memverifikasi isi tapi juga keaslian media itu sendiri. Kemampuan ini akan sangat krusial di masa depan.', reactions:{ setuju:18, perlu_dikaji:5, insight:29 }, userReactions:{}, timestamp:'2026-03-12T10:45:00', pinned:false },
  { id:4, authorId:4, authorName:'Maya Putri', authorAvatar:'MP', authorColor:'#00E676', category:'Pendidikan', tag:'Sekolah', content:'Pendidikan literasi digital seharusnya dimulai lebih awal. Saat ini banyak teman-teman yang masih langsung percaya screenshot tanpa menelusuri sumbernya. Kita perlu budaya cek fakta yang lebih kuat di kalangan remaja.', reactions:{ setuju:42, perlu_dikaji:3, insight:18 }, userReactions:{}, timestamp:'2026-03-11T16:00:00', pinned:false },
  { id:5, authorId:5, authorName:'Reza Hidayat', authorAvatar:'RH', authorColor:'#FF4D6D', category:'Sosial', tag:'Cyberbullying', content:'Kebebasan berpendapat online sering disalahgunakan untuk menyerang orang lain secara anonim. Anonimitas di internet membuat orang lebih berani berkata kasar. Apakah menghapus anonimitas adalah solusi yang tepat, atau justru akan membahayakan kelompok rentan?', reactions:{ setuju:15, perlu_dikaji:28, insight:11 }, userReactions:{}, timestamp:'2026-03-10T09:15:00', pinned:false },
];

const NEWS_TEMPLATES = [
  { gradient:'linear-gradient(135deg,#1A0A3A,#6C3CE1)', icon:'📡', category:'Teknologi' },
  { gradient:'linear-gradient(135deg,#0A1A3A,#00D4FF)', icon:'🌊', category:'Lingkungan' },
  { gradient:'linear-gradient(135deg,#2A0A1A,#FF4D6D)', icon:'⚡', category:'Politik' },
  { gradient:'linear-gradient(135deg,#1A2A0A,#00E676)', icon:'🌱', category:'Sosial' },
  { gradient:'linear-gradient(135deg,#2A1A0A,#FFB800)', icon:'💡', category:'Pendidikan' },
  { gradient:'linear-gradient(135deg,#1A0A2A,#8B5CF6)', icon:'🔬', category:'Sains' },
];

const DIALOGUE_ROOMS = [
  { id:1, title:'Apakah Media Sosial Lebih Banyak Membahayakan atau Membantu Demokrasi?', topic:'Media & Demokrasi', participants:18, messages:47, lastActive:'5 menit lalu', icon:'🗳️' },
  { id:2, title:'Haruskah Platform Digital Bertanggung Jawab atas Konten Penggunanya?', topic:'Regulasi Digital', participants:12, messages:29, lastActive:'23 menit lalu', icon:'⚖️' },
  { id:3, title:'Apakah AI akan Menggantikan Jurnalis di Masa Depan?', topic:'AI & Jurnalisme', participants:21, messages:63, lastActive:'2 jam lalu', icon:'🤖' },
];

const SOCRATIC_PROMPTS = [
  '🤔 Apa asumsi yang mendasari pendapatmu tersebut?',
  '💡 Bisakah kamu memberikan bukti atau contoh konkret yang mendukung klaimmu?',
  '🔄 Bagaimana sudut pandang yang berbeda bisa melihat isu ini?',
  '❓ Apa konsekuensi jika pendapatmu diterapkan secara luas?',
  '🎯 Apakah ada yang bisa kamu setujui dari argumen yang bertentangan?',
  '🔍 Sumber informasi apa yang kamu gunakan untuk mendukung pandanganmu?',
  '⚖️ Bagaimana kamu menimbang nilai-nilai yang saling bertentangan dalam isu ini?',
];

const SAMPLE_MESSAGES = {
  1: [
    { id:1, senderId:6, senderName:'Pak Ahmad', senderAvatar:'PA', senderColor:'#8B5CF6', content:'Selamat datang di ruang diskusi. Mari kita mulai dengan pertanyaan pembuka: Menurutmu, apa pengaruh terbesar media sosial terhadap kualitas diskusi demokratis di Indonesia?', timestamp:'09:00', isOwn:false },
    { id:2, senderId:1, senderName:'Budi Santoso', senderAvatar:'BS', senderColor:'#6C3CE1', content:'Menurut saya, media sosial justru melemahkan demokrasi karena menciptakan echo chamber yang membuat orang hanya berinteraksi dengan yang sepaham saja.', timestamp:'09:05', isOwn:true },
    { id:3, senderId:0, senderName:'SOCRATECH AI', senderAvatar:'🤖', senderColor:'#FFB800', content:'🤔 Apa asumsi yang mendasari pendapatmu tersebut?', timestamp:'09:05', isOwn:false, isSystem:true },
    { id:4, senderId:2, senderName:'Sari Dewi', senderAvatar:'SD', senderColor:'#00D4FF', content:'Saya setuju soal echo chamber, tapi media sosial juga memberikan platform bagi kelompok yang sebelumnya tidak punya suara. Ini kan positif untuk demokrasi?', timestamp:'09:08', isOwn:false },
    { id:5, senderId:1, senderName:'Budi Santoso', senderAvatar:'BS', senderColor:'#6C3CE1', content:'Poin yang menarik, Sari! Tapi apakah "memiliki suara" saja cukup jika informasi yang beredar tidak akurat?', timestamp:'09:10', isOwn:true },
    { id:6, senderId:0, senderName:'SOCRATECH AI', senderAvatar:'🤖', senderColor:'#FFB800', content:'💡 Bisakah kamu memberikan bukti atau contoh konkret yang mendukung klaimmu?', timestamp:'09:10', isOwn:false, isSystem:true },
  ]
};

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
  el.textContent = `+${amount} XP`;
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
