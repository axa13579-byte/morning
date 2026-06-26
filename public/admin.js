// Copy of checklistData for rendering details
const checklistData = {
  sound: [
    { id: "s1", text: "訪問講師提前一週與講師邀約課程前訪問", day: "all", badge: "前一週" },
    { id: "s2", text: "提醒事宜晚上七點前，致電講師，並且確認拿取明日課程ＰＰＴ (確認檔案類型)", day: "all", badge: "前一天" },
    { id: "s3", text: "晚上七點前，與主持人核對明日細節", day: "all", badge: "前一天" },
    { id: "s4", text: "熟悉電腦操作，確認簡報與影片檔案", day: "all", badge: "準備" },
    { id: "s5", text: "模擬明日流程，確認那些環節需要播放音樂/影片", day: "all", badge: "準備" },
    { id: "s6", text: "08:40 到公司並且準備就位！播放背景音樂、拉開投影布幕 (若有事，請於 08:45 前找人交接並通知組長)", day: "all", badge: "08:40 就位" },
    { id: "s7", text: "08:50 確認簡報、麥克風、簡報筆，以及投影與電視是否同步", day: "all", badge: "08:50 設備確認" },
    { id: "s8", text: "08:57 提早三分鐘播放「環太平洋音樂」(提醒同仁往前就坐)", day: "all", badge: "08:57 提醒音樂" },
    { id: "s9", text: "09:00 準時開始早會，播放「早操影片」", day: "all", badge: "09:00 開始" },
    { id: "s_mon_1", text: "A. 開啟週一簡報連結", day: "Mon", badge: "週一" },
    { id: "s_mon_2", text: "B. 各功能組佈達 (早會、活動、講座、訓練、競賽、總務、組發、商品)，確認進出場音樂", day: "Mon", badge: "週一" },
    { id: "s_mon_3", text: "C. 副總上台帶定聯與盤點 (播放進出場音樂)", day: "Mon", badge: "週一" },
    { id: "s_mon_4", text: "D. 09:55 播放結束前五分鐘提醒音樂", day: "Mon", badge: "週一" },
    { id: "s_tue_1", text: "A. 開啟講師檔案", day: "Tue", badge: "週二" },
    { id: "s_tue_2", text: "B. 準備並播放講師進出場音樂", day: "Tue", badge: "週二" },
    { id: "s_wed_1", text: "A. 開啟週三聯合早會檔案", day: "Wed", badge: "週三" },
    { id: "s_wed_2", text: "B. 準備講師進出場音樂，調整講師麥克風音量 (音樂開至第五格)", day: "Wed", badge: "週三" },
    { id: "s_wed_3", text: "D. 邀請頒發感謝卡時，播放頒獎音樂", day: "Wed", badge: "週三" },
    { id: "s_thu_1", text: "A. 開啟財經學習影片", day: "Thu", badge: "週四" },
    { id: "s_thu_2", text: "B. 播放財經講師簡報首頁或海報", day: "Thu", badge: "週四" },
    { id: "s_thu_3", text: "C. 09:55 分組研討結束前，播放結束前五分鐘提醒音樂", day: "Thu", badge: "週四" },
    { id: "s_fri_1", text: "A. 播放講師簡報首頁或海報", day: "Fri", badge: "週五" },
    { id: "s_fri_2", text: "B. 準備講師進出場音樂，調整講師麥克風音量 (音樂開至第五格)", day: "Fri", badge: "週五" },
    { id: "s10", text: "1. 昨日舉績壽險人員分享：切換分享簡報，準備好進出場音樂", day: "all", badge: "結尾" },
    { id: "s11", text: "2. 切換各功能組報告簡報", day: "all", badge: "結尾" },
    { id: "s12", text: "3. 切換副總總結簡報", day: "all", badge: "結尾" },
    { id: "s13", text: "4. 切換布達明日早會內容簡報，與結束早會簡報", day: "all", badge: "結尾" }
  ],
  host: [
    { id: "h1", text: "訪問講師：提前一週與講師邀約，進行課程前訪問與溝通", day: "all", badge: "前一週" },
    { id: "h2", text: "晚上七點前，致電講師，並且確認課程 PPT 檔案已提供給音控", day: "all", badge: "前一天" },
    { id: "h3", text: "晚上七點前，於大群組佈達明日課程，並 tag 壽險件 case 分享人員", day: "all", badge: "前一天" },
    { id: "h4", text: "座位規範：除 case 分享時間可坐臨時座位外，其他時間請坐主持人專屬座位 (第一排最左側)", day: "all", badge: "前一天" },
    { id: "h5", text: "晚上七點前，與音控核對明日早會細節", day: "all", badge: "前一天" },
    { id: "h6", text: "當天有課程請在課程結束後，邀請協理頒發感謝卡並與講師合影", day: "all", badge: "前一天" },
    { id: "h7", text: "穿著正式服裝 (主持人是整場之靈魂，請以專業形象呈現)", day: "all", badge: "準備" },
    { id: "h8", text: "準備 2 則笑話或時事 (特殊突發情況時墊時間用)", day: "all", badge: "準備" },
    { id: "h9", text: "調整狀態：聲音宏亮、流程清晰、展現自信與滿滿活力", day: "all", badge: "準備" },
    { id: "h10", text: "08:40 到公司並準備就位，請音控拉開投影布幕 (若有急事，請 08:45 前找人交接並通知組長)", day: "all", badge: "08:40 就位" },
    { id: "h11", text: "08:50 與音控 (DJ) 核對簡報、麥克風、簡報筆、講師備水、白板主題布條、當天日期", day: "all", badge: "08:50 設備確認" },
    { id: "h12", text: "08:55 廣播提醒同仁：「早會將於五分鐘後開始，請同仁往前就坐」", day: "all", badge: "08:55 廣播" },
    { id: "h13", text: "08:57 廣播提醒同仁：「早會將於三分鐘後開始，請同仁往前就坐」", day: "all", badge: "08:57 廣播" },
    { id: "h_mon_1", text: "A. 準時開場問候、自我介紹 (我是本週主持人xxx)、宣告日期、星期、截績/競賽倒數天數、說明早會主題", day: "Mon", badge: "週一" },
    { id: "h_mon_2", text: "B. 關掉前方燈光", day: "Mon", badge: "週一" },
    { id: "h_mon_3", text: "C. 依序邀請各功能組上台佈達 (早會組、活動組、講座組、訓練組、競賽組、總務組、組發組、商品組)", day: "Mon", badge: "週一" },
    { id: "h_mon_4", text: "D. 邀請副總上台帶定聯與進行分組盤點 (盤點至 10:00)", day: "Mon", badge: "週一" },
    { id: "h_mon_5", text: "E. 昨日舉績壽險人員分享", day: "Mon", badge: "週一" },
    { id: "h_mon_6", text: "F. 宣佈週一早會結束", day: "Mon", badge: "週一" },
    { id: "h_tue_1", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日課程主題", day: "Tue", badge: "週二" },
    { id: "h_tue_2", text: "B. 09:00 - 10:00 講師課程分享 (介紹講師後關閉前方燈光)", day: "Tue", badge: "週二" },
    { id: "h_tue_3", text: "C. 09:50 舉牌提醒講師剩餘時間十分鐘", day: "Tue", badge: "週二" },
    { id: "h_tue_4", text: "D. 09:55 舉牌提醒講師剩餘時間五分鐘", day: "Tue", badge: "週二" },
    { id: "h_tue_5", text: "E. 課程結束，宣佈早會結束", day: "Tue", badge: "週二" },
    { id: "h_wed_1", text: "A. 開場問候、宣告日期、星期、截績/競賽倒數天數、說明今日主題：中區聯合早會", day: "Wed", badge: "週三" },
    { id: "h_wed_2", text: "B. 介紹講師與課程 (介紹順序：課程名稱 -> 大綱 -> 講師介紹，結束後關閉前方燈光)", day: "Wed", badge: "週三" },
    { id: "h_wed_3", text: "C. 10:20 舉牌提醒講師剩餘時間十分鐘", day: "Wed", badge: "週三" },
    { id: "h_wed_4", text: "D. 10:25 舉牌提醒講師剩餘時間五分鐘", day: "Wed", badge: "週三" },
    { id: "h_wed_5", text: "E. 請講師留步，邀請長官上台致贈感謝卡", day: "Wed", badge: "週三" },
    { id: "h_wed_6", text: "F. 結語講師內容並與講師合影 (結語著重於課程金句與加深同仁印象，非評論課程，最多兩段)", day: "Wed", badge: "週三" },
    { id: "h_wed_7", text: "G. 聯合早會結束", day: "Wed", badge: "週三" },
    { id: "h_thu_1", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日早會主題", day: "Thu", badge: "週四" },
    { id: "h_thu_2", text: "B. 09:00 - 09:30 播放財經學習影片/影片研討", day: "Thu", badge: "週四" },
    { id: "h_thu_3", text: "C. 09:30 - 10:00 進行財經分組研討 (協助同仁分組並指引研討場地)", day: "Thu", badge: "週四" },
    { id: "h_thu_4", text: "D. 10:10 集合各組，邀請各組代表一位分享研討心得 (分享完後主持人做簡單收尾結語)", day: "Thu", badge: "週四" },
    { id: "h_thu_5", text: "E. 研討分享結束，宣佈早會結束", day: "Thu", badge: "週四" },
    { id: "h_fri_1", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日早會主題", day: "Fri", badge: "週五" },
    { id: "h_fri_2", text: "B. 介紹講師與課程 (介紹順序：課程名稱 -> 大綱 -> 講師介紹，結束後關閉前方燈光)", day: "Fri", badge: "週五" },
    { id: "h_fri_3", text: "C. 09:50 舉牌提醒講師剩餘時間十分鐘", day: "Fri", badge: "週五" },
    { id: "h_fri_4", text: "D. 09:55 舉牌提醒講師剩餘時間五分鐘", day: "Fri", badge: "週五" },
    { id: "h_fri_5", text: "E. 請講師留步，邀請長官上台致贈感謝卡", day: "Fri", badge: "週五" },
    { id: "h_fri_6", text: "F. 結語講師內容並與講師合影 (結語著重於課程金句與加深同仁印象，非評論課程，最多兩段)", day: "Fri", badge: "週五" },
    { id: "h_fri_7", text: "G. 課程與早會結束", day: "Fri", badge: "週五" },
    { id: "h14", text: "1. 昨日舉績壽險人員分享：上台時請同仁邊拍手齊說「FYB」(所有分享者分享完後做一簡單結語)", day: "all", badge: "結尾" },
    { id: "h15", text: "2. 詢問各功能組是否有其他臨時宣達事項", day: "all", badge: "結尾" },
    { id: "h16", text: "3. 邀請副總上台進行最後總結", day: "all", badge: "結尾" },
    { id: "h17", text: "4. 布達明日早會內容簡報，並提醒/請下週的主持人與音控上前核對流程", day: "all", badge: "結尾" },
    { id: "h18", text: "5. 帶領大家喊「3、2、1」口號，熱情結束早會！", day: "all", badge: "結尾" }
  ]
};

// State
let allSubmissions = [];
let filteredSubmissions = [];
let searchFilter = '';
let roleFilter = 'all'; // 'all', 'sound', 'host'

// DOM elements
const submissionList = document.getElementById('submission-list-container');
const statTotal = document.getElementById('stat-total');
const statSound = document.getElementById('stat-sound');
const statHost = document.getElementById('stat-host');
const searchInput = document.getElementById('search-input');
const filterAllRole = document.getElementById('filter-all-role');
const filterSoundRole = document.getElementById('filter-sound-role');
const filterHostRole = document.getElementById('filter-host-role');

const detailsModal = document.getElementById('details-modal');
const modalUserTitle = document.getElementById('modal-user-title');
const modalTimeText = document.getElementById('modal-time-text');
const modalDetailsList = document.getElementById('modal-details-list');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Upload Form Elements
const uploadForm = document.getElementById('upload-form');
const scheduleFile = document.getElementById('schedule-file');
const fileNameLabel = document.getElementById('file-name-label');
const uploadStatus = document.getElementById('upload-status');

// Initial Load
fetchSubmissions();

// Search & Filter event listeners
searchInput.addEventListener('input', (e) => {
  searchFilter = e.target.value.toLowerCase().trim();
  applyFiltersAndRender();
});

filterAllRole.addEventListener('click', () => setRoleFilter('all', filterAllRole));
filterSoundRole.addEventListener('click', () => setRoleFilter('sound', filterSoundRole));
filterHostRole.addEventListener('click', () => setRoleFilter('host', filterHostRole));

modalCloseBtn.addEventListener('click', closeModal);
detailsModal.addEventListener('click', (e) => {
  if (e.target === detailsModal) closeModal();
});

// Upload form events
scheduleFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    fileNameLabel.innerHTML = `<i class="fa-solid fa-file-excel" style="color: var(--primary);"></i> <strong style="color: var(--primary);">${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)`;
  } else {
    fileNameLabel.innerHTML = `<i class="fa-regular fa-file-excel"></i> 點擊選取 Excel 檔案...`;
  }
});

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = scheduleFile.files[0];
  if (!file) {
    showUploadStatus('請先選擇一個 Excel 檔案！', 'danger');
    return;
  }
  
  const formData = new FormData();
  formData.append('schedule', file);
  
  showUploadStatus('上傳中...', 'info');
  
  fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showUploadStatus(data.message, 'success');
      uploadForm.reset();
      fileNameLabel.innerHTML = `<i class="fa-regular fa-file-excel"></i> 點擊選取 Excel 檔案...`;
    } else {
      showUploadStatus(data.error || '上傳失敗！', 'danger');
    }
  })
  .catch(err => {
    console.error(err);
    showUploadStatus('網路連線失敗，無法上傳檔案！', 'danger');
  });
});

function showUploadStatus(message, type) {
  uploadStatus.style.display = 'block';
  uploadStatus.textContent = message;
  
  if (type === 'success') {
    uploadStatus.style.color = 'var(--success)';
  } else if (type === 'danger') {
    uploadStatus.style.color = 'var(--danger)';
  } else {
    uploadStatus.style.color = 'var(--primary)';
  }
}

function setRoleFilter(role, buttonEl) {
  roleFilter = role;
  [filterAllRole, filterSoundRole, filterHostRole].forEach(btn => btn.classList.remove('active'));
  buttonEl.classList.add('active');
  applyFiltersAndRender();
}

// Fetch submissions from server
function fetchSubmissions() {
  fetch('/api/submissions')
    .then(res => res.json())
    .then(data => {
      allSubmissions = data;
      updateStats();
      applyFiltersAndRender();
    })
    .catch(err => {
      console.error(err);
      submissionList.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-circle-exclamation" style="color: var(--danger);"></i>
          <p>無法連線至伺服器讀取紀錄，請重試。</p>
        </div>
      `;
    });
}

// Update stats panels
function updateStats() {
  statTotal.textContent = allSubmissions.length;
  
  const soundCount = allSubmissions.filter(sub => sub.role === '音控').length;
  const hostCount = allSubmissions.filter(sub => sub.role === '主持').length;
  
  statSound.textContent = soundCount;
  statHost.textContent = hostCount;
}

// Filter and render list
function applyFiltersAndRender() {
  filteredSubmissions = allSubmissions.filter(sub => {
    // Role filter
    if (roleFilter === 'sound' && sub.role !== '音控') return false;
    if (roleFilter === 'host' && sub.role !== '主持') return false;
    
    // Search filter
    if (searchFilter && !sub.name.toLowerCase().includes(searchFilter)) return false;
    
    return true;
  });
  
  renderSubmissionList();
}

// Render submission list UI
function renderSubmissionList() {
  if (filteredSubmissions.length === 0) {
    submissionList.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-clipboard-question"></i>
        <p>${allSubmissions.length === 0 ? '目前尚無確認紀錄。' : '找不到符合條件的紀錄。'}</p>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  filteredSubmissions.forEach(sub => {
    const formattedTime = formatTimestamp(sub.timestamp);
    const roleClass = sub.role === '音控' ? 'role-sound' : 'role-host';
    
    // Count verified items
    const checkedCount = Object.values(sub.items).filter(Boolean).length;
    
    const dayNames = { 'Mon': '週一', 'Tue': '週二', 'Wed': '週三', 'Thu': '週四', 'Fri': '週五', 'all': '全部項目' };
    const dayLabel = dayNames[sub.dayFilter] || sub.dayFilter || '全部';
    
    html += `
      <div class="submission-card" data-id="${sub.id}">
        <div class="sub-meta">
          <div class="sub-header-row" style="flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <span class="sub-name">${escapeHtml(sub.name)}</span>
            <span class="sub-role ${roleClass}">${sub.role}</span>
            <span style="font-size:0.75rem; background:rgba(230,126,34,0.06); padding:2px 8px; border-radius:4px; border:1px solid rgba(230,126,34,0.15); color: var(--primary); font-weight: 600;">
              📅 ${escapeHtml(sub.weekLabel || '7月份早會')}
            </span>
            <span style="font-size:0.75rem; background:rgba(46, 204, 113, 0.06); padding:2px 8px; border-radius:4px; border:1px solid rgba(46, 204, 113, 0.15); color: var(--success); font-weight: 600;">
              📍 篩選：${dayLabel}
            </span>
          </div>
          <span class="sub-time" style="margin-top: 4px;">
            <i class="fa-regular fa-clock"></i> ${formattedTime}
          </span>
        </div>
        <div class="sub-progress-wrapper">
          <span class="sub-progress-text">
            <i class="fa-solid fa-square-check"></i> ${checkedCount} 項已確認
          </span>
        </div>
        <div class="sub-actions">
          <button class="btn-detail" onclick="viewDetails('${sub.id}')">
            <i class="fa-solid fa-eye"></i> 檢視細節
          </button>
          <button class="btn-delete" onclick="deleteSubmission('${sub.id}')">
            <i class="fa-solid fa-trash-can"></i> 刪除
          </button>
        </div>
      </div>
    `;
  });
  
  submissionList.innerHTML = html;
}

// View submission details
window.viewDetails = function(id) {
  const sub = allSubmissions.find(s => s.id === id);
  if (!sub) return;
  
  modalUserTitle.innerHTML = `${escapeHtml(sub.name)} &nbsp;<span class="sub-role ${sub.role === '音控' ? 'role-sound' : 'role-host'}" style="font-size:0.85rem;">${sub.role}核對詳情</span>`;
  
  const dayNames = { 'Mon': '週一', 'Tue': '週二', 'Wed': '週三', 'Thu': '週四', 'Fri': '週五', 'all': '全部項目' };
  const dayLabel = dayNames[sub.dayFilter] || sub.dayFilter || '全部';
  modalTimeText.innerHTML = `
    <strong>週次：</strong>${escapeHtml(sub.weekLabel || '未設定')} &nbsp;|&nbsp; 
    <strong>篩選：</strong>${dayLabel} &nbsp;|&nbsp; 
    <strong>時間：</strong>${new Date(sub.timestamp).toLocaleString('zh-TW')}
  `;
  
  const roleType = sub.role === '音控' ? 'sound' : 'host';
  const allRoleItems = checklistData[roleType];
  
  let html = '';
  allRoleItems.forEach(item => {
    // Check if the item is present and checked in submission.
    // If it was skipped (e.g. because of day filters), it will show as Unchecked/Skipped.
    const isChecked = sub.items[item.id] === true;
    const checkClass = isChecked ? 'checked' : 'unchecked';
    const checkIcon = isChecked ? 'fa-circle-check' : 'fa-circle-xmark';
    
    html += `
      <div class="detail-item ${checkClass}">
        <i class="fa-solid ${checkIcon}"></i>
        <div style="flex: 1;">
          <span style="font-size:0.75rem; background:rgba(255,255,255,0.08); padding:1px 4px; border-radius:3px; margin-right:4px;">
            ${item.badge || '流程'}
          </span>
          <span style="font-size: 0.9rem;">${item.text}</span>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">
          ${isChecked ? '已核對' : '未勾選/已跳過'}
        </span>
      </div>
    `;
  });
  
  modalDetailsList.innerHTML = html;
  detailsModal.classList.add('active');
};

// Close modal
function closeModal() {
  detailsModal.classList.remove('active');
}

// Delete submission
window.deleteSubmission = function(id) {
  if (!confirm('您確定要刪除這筆確認紀錄嗎？此動作無法復原。')) {
    return;
  }
  
  fetch('/api/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      allSubmissions = allSubmissions.filter(sub => sub.id !== id);
      updateStats();
      applyFiltersAndRender();
    } else {
      alert('刪除失敗：' + (data.error || '未知錯誤'));
    }
  })
  .catch(err => {
    console.error(err);
    alert('網路連線失敗，無法刪除紀錄！');
  });
};

// Formatter utilities
function formatTimestamp(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  
  if (diffMins < 1) return '剛剛';
  if (diffMins < 60) return `${diffMins} 分鐘前`;
  if (diffHours < 24) return `${diffHours} 小時前`;
  
  return date.toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(string).replace(/[&<>"']/g, function(m) { return map[m]; });
}
