
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
      <h1>💬 Student Dialogue Space</h1>
      <p>Ruang diskusi interaktif dengan panduan inkuiri Sokratik untuk mempertajam pemikiran kritis.</p>
    </div>
    <div style="display:grid;grid-template-columns:300px 1fr;gap:24px;height:calc(100vh - 220px)">
      <!-- Room List -->
      <div class="card animate-fade-in-left" style="overflow:hidden;display:flex;flex-direction:column">
        <div class="card-header"><h3 class="heading-sm">🗂️ Ruang Diskusi</h3></div>
        <div style="flex:1;overflow-y:auto">
          ${DIALOGUE_ROOMS.map(r => `
          <div onclick="openRoom(${r.id})" id="room-btn-${r.id}" style="padding:16px 20px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background=''">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <span style="font-size:1.3rem">${r.icon}</span>
              <div style="flex:1">
                <div style="font-weight:600;font-size:.88rem;line-height:1.3">${r.title}</div>
              </div>
            </div>
            <div style="display:flex;gap:10px;font-size:.75rem;color:var(--text-muted)">
              <span>👥 ${r.participants}</span><span>💬 ${r.messages}</span><span>🕐 ${r.lastActive}</span>
            </div>
          </div>`).join('')}
          ${user.role === 'teacher' ? `<div style="padding:16px">
            <button class="btn btn-primary w-full btn-sm" onclick="createNewRoom()">+ Buat Ruang Baru</button>
          </div>` : ''}
        </div>
      </div>
      <!-- Chat Area -->
      <div class="animate-fade-in-right" style="display:flex;flex-direction:column">
        <div id="chat-area" style="flex:1">
          <div class="empty-state" style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center">
            <div class="empty-state-icon">💬</div>
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
  if (btn) btn.style.background = 'rgba(108,60,225,.15)';
  
  document.getElementById('chat-area').innerHTML = `
    <div class="chat-container" style="height:100%">
      <div style="padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;background:var(--bg-secondary)">
        <span style="font-size:1.4rem">${room.icon}</span>
        <div><div style="font-weight:700;font-size:.92rem">${room.title}</div>
          <div style="font-size:.75rem;color:var(--text-muted)">👥 ${room.participants} peserta · 💬 ${room.messages} pesan</div>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages">${renderMessages(dialogMessages, user)}</div>
      <div class="chat-input-area">
        <textarea class="form-control chat-input" id="chat-input" placeholder="Tulis pendapatmu..." rows="1"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMessage()}"
          oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px'"></textarea>
        <button class="btn btn-primary" onclick="sendMessage()" style="flex-shrink:0">Kirim ↑</button>
      </div>
    </div>`;
  scrollChat();
}

function renderMessages(msgs, user) {
  return msgs.map(m => {
    const isOwn = m.senderId === user.id;
    const isSystem = m.isSystem;
    if (isSystem) return `<div class="chat-bubble system">
      <div class="chat-bubble-content">${m.content}</div>
    </div>`;
    return `<div class="chat-bubble ${isOwn?'own':'other'}">
      ${!isOwn ? `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
        <div class="avatar" style="width:24px;height:24px;font-size:.7rem;background:${m.senderColor};color:#fff">${m.senderAvatar}</div>
        <span class="chat-meta">${m.senderName}</span>
      </div>` : ''}
      <div class="chat-bubble-content">${m.content}</div>
      <div class="chat-meta">${m.timestamp}</div>
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
  // Trigger Socratic prompt occasionally
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
