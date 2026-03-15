
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
      <h1>📝 Weekly Mini Quiz</h1>
      <p>Uji pemahaman literasi digitalmu setiap minggu dan raih XP untuk naik level!</p>
    </div>
    <div id="quiz-list">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px">
        ${QUIZZES.map(q => {
          const done = results[q.id];
          const diff = {Mudah:'badge-success',Sedang:'badge-accent',Sulit:'badge-danger'}[q.difficulty]||'badge-primary';
          return `<div class="card animate-fade-in-up" style="padding:0">
            <div style="padding:24px;border-bottom:1px solid var(--border)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <span class="badge badge-secondary">${q.topic}</span>
                  <span class="badge ${diff}">${q.difficulty}</span>
                  ${done ? '<span class="badge badge-success">✅ Selesai</span>' : ''}
                </div>
              </div>
              <h3 style="font-size:1.05rem;font-weight:700;margin-bottom:8px">${q.title}</h3>
              <p style="color:var(--text-secondary);font-size:.85rem">Dibuat oleh ${q.createdBy} · ${q.questions.length} soal · ${q.duration} menit</p>
            </div>
            <div style="padding:16px 24px;display:flex;justify-content:space-between;align-items:center">
              <div style="font-size:.82rem;color:var(--text-muted)">
                <span>👥 ${q.participants} peserta</span>
                ${done ? ` · <span class="text-success">Skor: ${done.score}/${done.total}</span>` : ''}
              </div>
              <button class="btn ${done?'btn-ghost':'btn-primary'} btn-sm" onclick="startQuiz(${q.id})">
                ${done ? '🔄 Ulangi' : '▶ Mulai Quiz'}
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>
      ${isTeacher ? `<div class="card animate-fade-in-up" style="margin-top:32px">
        <div class="card-header"><h3 class="heading-sm">📊 Statistik Quiz</h3></div>
        <div class="card-body">
          <table class="leaderboard-table">
            <thead><tr><th>Quiz</th><th>Peserta</th><th>Rata-rata Skor</th><th>Aksi</th></tr></thead>
            <tbody>${QUIZZES.map(q => `<tr>
              <td><strong>${q.title}</strong></td><td>${q.participants} siswa</td>
              <td><span class="text-success">84%</span></td>
              <td><button class="btn btn-ghost btn-sm">Edit</button></td>
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
    el.textContent = `⏱ ${m}:${s}`;
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
    <div style="max-width:720px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <button class="btn btn-ghost btn-sm" onclick="exitQuiz()">← Kembali</button>
        <span id="quiz-timer" style="font-size:.9rem;color:var(--text-secondary);font-weight:600">⏱ --:--</span>
        <span class="badge badge-primary">Soal ${currentQ+1}/${total}</span>
      </div>
      <div class="progress-bar mb-6"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="card animate-fade-in-up" style="padding:28px;margin-bottom:20px">
        <div class="badge badge-secondary mb-4" style="margin-bottom:16px">${currentQuiz.topic}</div>
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:24px;line-height:1.5">${q.text}</h2>
        <div style="display:flex;flex-direction:column;gap:10px" id="options-container">
          ${q.options.map((opt,i) => `
          <div class="quiz-option" id="option-${i}" onclick="selectAnswer(${i})">
            <span class="option-letter">${letters[i]}</span>
            <span>${opt}</span>
          </div>`).join('')}
        </div>
      </div>
      <div id="feedback-area"></div>
      <div style="display:flex;justify-content:flex-end;margin-top:16px">
        <button class="btn btn-primary" id="next-btn" style="display:none" onclick="nextQuestion()">
          ${currentQ < currentQuiz.questions.length-1 ? 'Soal Berikutnya →' : '🏁 Lihat Hasil'}
        </button>
      </div>
    </div>`;
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = currentQuiz.questions[currentQ];
  const correct = q.correct;
  document.querySelectorAll('.quiz-option').forEach((el,i) => {
    el.classList.add(i === correct ? 'correct' : (i === idx ? 'wrong' : ''));
  });
  const isCorrect = idx === correct;
  if (isCorrect) score++;
  document.getElementById('feedback-area').innerHTML = `
    <div class="card" style="padding:16px;border-color:${isCorrect?'var(--success)':'var(--danger)'};background:${isCorrect?'rgba(0,230,118,.05)':'rgba(255,77,109,.05)'}">
      <div style="font-weight:700;color:${isCorrect?'var(--success)':'var(--danger)'};margin-bottom:6px">${isCorrect?'✅ Benar!':'❌ Kurang Tepat'}</div>
      <div style="font-size:.88rem;color:var(--text-secondary)">${q.explanation}</div>
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
  document.getElementById('quiz-active').innerHTML = `
    <div style="max-width:560px;margin:0 auto;text-align:center">
      <div style="font-size:5rem;animation:scoreReveal .8s cubic-bezier(.34,1.56,.64,1) both;margin-bottom:20px">
        ${pct>=90?'🏆':pct>=70?'⭐':'📚'}
      </div>
      <h2 class="heading-lg mb-4">Quiz Selesai!</h2>
      <div style="background:var(--gradient-card);border:1px solid var(--border-glow);border-radius:var(--radius-xl);padding:32px;margin-bottom:28px">
        <div style="font-family:var(--font-heading);font-size:4rem;font-weight:900;background:var(--gradient-primary);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${pct}%</div>
        <div style="color:var(--text-secondary);margin-bottom:16px">${score} dari ${total} soal benar</div>
        <div class="badge badge-${pct>=90?'success':pct>=70?'accent':'danger'}" style="margin-bottom:16px">
          ${pct>=90?'🌟 Luar Biasa!':pct>=70?'👍 Bagus!':'💪 Terus Berlatih!'}
        </div>
        <div class="divider"></div>
        <div style="font-size:1.4rem;font-weight:800;color:var(--success)">+${xpEarned} XP</div>
        <div style="font-size:.85rem;color:var(--text-muted)">Ditambahkan ke akunmu</div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="startQuiz(${currentQuiz.id})">🔄 Ulangi Quiz</button>
        <button class="btn btn-ghost" onclick="exitQuiz()">📋 Daftar Quiz</button>
        <button class="btn btn-accent" onclick="navigate('leaderboard')">🏆 Lihat Leaderboard</button>
      </div>
    </div>`;
}

function exitQuiz() {
  clearInterval(quizTimer);
  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-list').style.display = 'block';
  currentQuiz = null;
}
