# SOCRATECH 🎓

**Platform Literasi Digital Gamifikasi Berbasis Transformasi Visual Berita dan Inkuiri Sokratik**

SOCRATECH adalah inovasi platform pendidikan interaktif yang dirancang khusus untuk meningkatkan kesadaran kritis siswa SMA dalam menghadapi era disinformasi digital. Melalui pendekatan gamifikasi terpadu, transformasi berita menjadi format visual yang menarik, dan penerapan metode inkuiri Sokratik dengan bantuan AI, platform ini membekali siswa dengan kompetensi literasi media abada ke-21 yang esensial.

---

## 🚀 Fitur Utama

- **📰 Visualisasi Berita Interaktif (Visual News):** Mengubah artikel berita teks panjang menjadi format visual singkat yang mudah dipahami, disertai highlight fakta penting untuk menghindari jebakan clickbait.
- **💬 Ruang Dialog Sokratik (Socratic Inquiry):** Ruang diskusi terpandu dengan integrasi "SOCRATECH AI" yang melontarkan pertanyaan reflektif untuk membongkar asumsi, memverifikasi klaim, dan mendorong multi-perspektif.
- **⭐ Dinding Opini (Opinion Wall):** Wadah aman bagi siswa untuk menyuarakan opini terkait isu terkini berbekal argumen rasional, dilengkapi sistem reaksi (*Setuju, Perlu Dikaji, Insight*).
- **🕹️ Gamifikasi & Leaderboard:** Sistem *leveling*, akumulasi *Experience Points (XP)*, *streak*, dan pencapaian lencana (*badges*) untuk menjaga motivasi belajar siswa (Contoh: *Quiz Master, Socratic Scholar, News Analyst*).
- **📝 Kuis Literasi Instan:** Tantangan kuis harian/mingguan untuk menguji insting deteksi hoaks dan pemahaman etika bermedia digital (SIFT method, filter bubbles, echo chambers).

## 🛠️ Tech Stack

SOCRATECH dibangun menggunakan teknologi yang ringan dan optimal untuk lingkungan web tanpa bergantung pada framework berat:

- **Frontend:** HTML5, CSS3 Modern (Custom Properties, Grid, Flexbox, Keyframe Animations)
- **Logika & Interaktivitas:** Vanilla JavaScript (ES6+)
- **State Management:** Browser `localStorage` API 
- **Desain:** Sistem desain UI/UX responsif yang mengusung konsep Neumorphism, Glassmorphism, dan warna-warna vibrant berfokus pada aksesibilitas (Mobile-first approach).

## ⚙️ Cara Menjalankan Secara Lokal

Karena SOCRATECH sepenuhnya dibangun menggunakan *Vanilla web technologies* berbasis statis, platform ini sangat mudah untuk dijalankan.

1. **Clone repository ini**
   ```bash
   git clone https://github.com/username/SOCRATECH.git
   cd SOCRATECH
   ```

2. **Jalankan local server**
   Anda bisa menggunakan ekstensi seperti **Live Server** di VSCode, atau menggunakan Python:
   ```bash
   # Python 3
   python -m http.server 8000
   ```

3. **Buka di Browser**
   Akses `http://localhost:8000` di browser kesayangan Anda.

## 📂 Struktur Proyek

```text
socratech/
│
├── index.html          # Entry point aplikasi utama (Single-page app look)
├── assets/             # Berisi kumpulan aset gambar, ilustrasi, dll.
├── styles/             # Berisi semua file CSS
│   ├── main.css        # Variabel dan styling global
│   └── animations.css  # Definisi keyframes dan micro-interactions
└── js/                 # Berisi semua logika aplikasi
    ├── data.js         # Mock database untuk User, Quizzes, Opinions, dll
    ├── auth.js         # Logika autentikasi dan otorisasi role
    ├── main.js         # Entry point JS dan fungsi-fungsi utilitas
    ├── landing.js      # Manipulasi tampilan halaman statis landing
    ├── dashboard.js    # Tampilan dashboard siswa/guru
    ├── news.js         # Rendering laman Visual News
    ├── dialogue.js     # Logika simulasi chat dan AI prompt
    ├── opinion.js      # CRUD untuk Opinion Wall
    └── leaderboard.js  # Menghitung kompetisi peringkat
```

## 👥 Pengguna Uji Coba

SOCRATECH menyediakan *mock data* sehingga Anda dapat langsung masuk tanpa mendaftar. Anda bisa mencoba beberapa _role_ pengguna:

- **Siswa**:
  - Email: `budi@student.sch` (Akan langsung masuk tanpa password)
  - Akses fitur: Belajar, Diskusi, Leaderboard, Mengerjakan tes
- **Guru / Admin**:
  - Email: `ahmad@guru.sch`
  - Akses fitur: Memantau aktivitas, Statistik performa, dll.

## 🤝 Berkontribusi

Kami menyambut berbagai kontribusi baik berupa pelaporan *bug*, usulan fitur baru, hingga _Pull Request_ langsung.

1. Lakukan *Fork* proyek ini
2. Buat *branch* fitur Anda (`git checkout -b feature/FiturKeren`)
3. Lakukan *Commit* terhadap perubahan Anda (`git commit -m 'Menambahkan fitur keren'`)
4. *Push* ke branch Anda (`git push origin feature/FiturKeren`)
5. Buka *Pull Request*

## 📜 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih mengikat.

---
*Dibuat dengan ❤️ untuk generasi digital Indonesia masa depan.*
