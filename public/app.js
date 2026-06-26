// Checklist data structures (matching the Excel sheets exactly)
const checklistData = {
  sound: [
    // 前一週與前一天
    { id: "s1", section: "前一週與前一天", text: "訪問講師：提前一週與講師邀約課程前訪問", day: "all", badge: "前一週" },
    { id: "s2", section: "前一週與前一天", text: "提醒事宜：晚上七點前，致電講師，並且確認拿取明日課程ＰＰＴ (確認檔案類型)", day: "all", badge: "前一天" },
    { id: "s3", section: "前一週與前一天", text: "晚上七點前，與主持人核對明日細節", day: "all", badge: "前一天" },
    
    // 前段 準備 & 主持開始
    { id: "s4", section: "前段 (準備 & 主持開始)", text: "熟悉電腦操作，確認簡報與影片檔案", day: "all", badge: "準備" },
    { id: "s5", section: "前段 (準備 & 主持開始)", text: "模擬明日流程，確認那些環節需要播放音樂/影片", day: "all", badge: "準備" },
    { id: "s6", section: "前段 (準備 & 主持開始)", text: "08:40 到公司並且準備就位！播放背景音樂、拉開投影布幕 (若有事，請於 08:45 前找人交接並通知組長)", day: "all", badge: "08:40 就位" },
    { id: "s7", section: "前段 (準備 & 主持開始)", text: "08:50 確認簡報、麥克風、簡報筆，以及投影與電視是否同步", day: "all", badge: "08:50 設備確認" },
    { id: "s8", section: "前段 (準備 & 主持開始)", text: "08:57 提早三分鐘播放「環太平洋音樂」(提醒同仁往前就坐)", day: "all", badge: "08:57 提醒音樂" },
    { id: "s9", section: "前段 (準備 & 主持開始)", text: "09:00 準時開始早會，播放「早操影片」", day: "all", badge: "09:00 開始" },
    
    // 中段 週一 週盤點
    { id: "s_mon_1", section: "中段早會項目 (週一 週盤點)", text: "A. 開啟週一簡報連結", day: "Mon", badge: "週一" },
    { id: "s_mon_2", section: "中段早會項目 (週一 週盤點)", text: "B. 各功能組佈達 (早會、活動、講座、訓練、競賽、總務、組發、商品)，確認進出場音樂", day: "Mon", badge: "週一" },
    { id: "s_mon_3", section: "中段早會項目 (週一 週盤點)", text: "C. 請副總上台帶定聯與盤點 (播放進出場音樂)", day: "Mon", badge: "週一" },
    { id: "s_mon_4", section: "中段早會項目 (週一 週盤點)", text: "D. 09:55 播放結束前五分鐘提醒音樂", day: "Mon", badge: "週一" },
    
    // 中段 週二 課程
    { id: "s_tue_1", section: "中段早會項目 (週二 課程)", text: "A. 開啟講師檔案", day: "Tue", badge: "週二" },
    { id: "s_tue_2", section: "中段早會項目 (週二 課程)", text: "B. 準備並播放講師進出場音樂", day: "Tue", badge: "週二" },
    
    // 中段 週三 聯合早會
    { id: "s_wed_1", section: "中段早會項目 (週三 中區聯合早會)", text: "A. 開啟週三聯合早會檔案", day: "Wed", badge: "週三" },
    { id: "s_wed_2", section: "中段早會項目 (週三 中區聯合早會)", text: "B. 準備講師進出場音樂，調整講師麥克風音量 (音樂開至第五格)", day: "Wed", badge: "週三" },
    { id: "s_wed_3", section: "中段早會項目 (週三 中區聯合早會)", text: "D. 邀請頒發感謝卡時，播放頒獎音樂", day: "Wed", badge: "週三" },
    
    // 中段 週四 財經學習
    { id: "s_thu_1", section: "中段早會項目 (週四 財經學習)", text: "A. 開啟財經學習影片", day: "Thu", badge: "週四" },
    { id: "s_thu_2", section: "中段早會項目 (週四 財經學習)", text: "B. 播放財經講師簡報首頁或海報", day: "Thu", badge: "週四" },
    { id: "s_thu_3", section: "中段早會項目 (週四 財經學習)", text: "C. 09:55 分組研討結束前，播放結束前五分鐘提醒音樂", day: "Thu", badge: "週四" },
    
    // 中段 週五 課程
    { id: "s_fri_1", section: "中段早會項目 (週五 課程)", text: "A. 播放講師簡報首頁或海報", day: "Fri", badge: "週五" },
    { id: "s_fri_2", section: "中段早會項目 (週五 課程)", text: "B. 準備講師進出場音樂，調整講師麥克風音量 (音樂開至第五格)", day: "Fri", badge: "週五" },
    
    // 後段 結尾
    { id: "s10", section: "後段 結尾", text: "1. 昨日舉績壽險人員分享：切換分享簡報，準備好進出場音樂", day: "all", badge: "結尾" },
    { id: "s11", section: "後段 結尾", text: "2. 切換各功能組報告簡報", day: "all", badge: "結尾" },
    { id: "s12", section: "後段 結尾", text: "3. 切換總結簡報", day: "all", badge: "結尾" },
    { id: "s13", section: "後段 結尾", text: "4. 切換布達明日早會內容簡報，與結束早會簡報", day: "all", badge: "結尾" }
  ],
  host: [
    // 前一週與前一天
    { id: "h1", section: "前一週與前一天", text: "訪問講師：提前一週與講師邀約，進行課程前訪問與溝通", day: "all", badge: "前一週" },
    { id: "h2", section: "前一週與前一天", text: "提醒事宜：晚上七點前，致電講師，且確認課程 PPT 檔案已提供給音控", day: "all", badge: "前一天" },
    { id: "h3", section: "前一週與前一天", text: "晚上七點前，於大群組佈達明日課程，並 tag 壽險件 case 分享人員", day: "all", badge: "前一天" },
    { id: "h4", section: "前一週與前一天", text: "座位規範：除 case 分享時間可坐臨時座位外，其他時間請坐主持人專屬座位 (第一排最左側)", day: "all", badge: "前一天" },
    { id: "h5", section: "前一週與前一天", text: "晚上七點前，與音控核對明日細節", day: "all", badge: "前一天" },
    { id: "h6", section: "前一週與前一天", text: "當天有課程請在課程結束後，邀請協理頒發感謝卡並與講師合影", day: "all", badge: "前一天" },
    
    // 前段 準備 & 主持開始
    { id: "h7", section: "前段 (準備 & 主持開始)", text: "穿著正式服裝 (主持人是整場之靈魂，請以專業形象呈現)", day: "all", badge: "準備" },
    { id: "h8", section: "前段 (準備 & 主持開始)", text: "準備 2 則笑話或時事 (特殊突發情況時墊時間用)", day: "all", badge: "準備" },
    { id: "h9", section: "前段 (準備 & 主持開始)", text: "調整狀態：聲音宏亮、流程清晰、展現自信與滿滿活力", day: "all", badge: "準備" },
    { id: "h10", section: "前段 (準備 & 主持開始)", text: "08:40 到公司並準備就位，請音控拉開投影布幕 (若有急事，請 08:45 前找人交接並通知組長)", day: "all", badge: "08:40 就位" },
    { id: "h11", section: "前段 (準備 & 主持開始)", text: "08:50 與音控 (DJ) 核對簡報、麥克風、簡報筆、講師備水、白板主題布條、當天日期", day: "all", badge: "08:50 設備確認" },
    { id: "h12", section: "前段 (準備 & 主持開始)", text: "08:55 廣播提醒同仁：「早會將於五分鐘後開始，請同仁往前就坐」", day: "all", badge: "08:55 廣播" },
    { id: "h13", section: "前段 (準備 & 主持開始)", text: "08:57 廣播提醒同仁：「早會將於三分鐘後開始，請同仁往前就坐」", day: "all", badge: "08:57 廣播" },
    
    // 中段 週一 週盤點
    { id: "h_mon_1", section: "中段早會項目 (週一 週盤點)", text: "A. 準時開場問候、自我介紹 (我是本週主持人xxx)、宣告日期、星期、截績/競賽倒數天數、說明早會主題", day: "Mon", badge: "週一" },
    { id: "h_mon_2", section: "中段早會項目 (週一 週盤點)", text: "B. 關掉前方燈光", day: "Mon", badge: "週一" },
    { id: "h_mon_3", section: "中段早會項目 (週一 週盤點)", text: "C. 邀請各功能組上台佈達 (早會組、活動組、講座組、訓練組、競賽組、總務組、組發組、商品組)", day: "Mon", badge: "週一" },
    { id: "h_mon_4", section: "中段早會項目 (週一 週盤點)", text: "D. 邀請副總上台帶定聯與進行分組盤點 (盤點至 10:00)", day: "Mon", badge: "週一" },
    { id: "h_mon_5", section: "中段早會項目 (週一 週盤點)", text: "E. 昨日舉績壽險人員分享", day: "Mon", badge: "週一" },
    { id: "h_mon_6", section: "中段早會項目 (週一 週盤點)", text: "F. (早會結束)", day: "Mon", badge: "週一" },
    
    // 中段 週二 課程
    { id: "h_tue_1", section: "中段早會項目 (週二 課程)", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日課程主題", day: "Tue", badge: "週二" },
    { id: "h_tue_2", section: "中段早會項目 (週二 課程)", text: "B. 09:00 - 10:00 講師課程分享 (介紹講師後關閉前方燈光)", day: "Tue", badge: "週二" },
    { id: "h_tue_3", section: "中段早會項目 (週二 課程)", text: "C. 09:50 舉牌提醒講師剩餘時間十分鐘", day: "Tue", badge: "週二" },
    { id: "h_tue_4", section: "中段早會項目 (週二 課程)", text: "D. 09:55 舉牌提醒講師剩餘時間五分鐘", day: "Tue", badge: "週二" },
    { id: "h_tue_5", section: "中段早會項目 (週二 課程)", text: "E. (早會結束)", day: "Tue", badge: "週二" },
    
    // 中段 週三 聯合早會
    { id: "h_wed_1", section: "中段早會項目 (週三 中區聯合早會)", text: "A. 開場問候、宣告日期、星期、截績/競賽倒數天數、說明今日主題：中區聯合早會", day: "Wed", badge: "週三" },
    { id: "h_wed_2", section: "中段早會項目 (週三 中區聯合早會)", text: "B. 介紹講師與課程 (介紹順序：課程名稱 -> 大綱 -> 講師介紹，結束後關閉前方燈光)", day: "Wed", badge: "週三" },
    { id: "h_wed_3", section: "中段早會項目 (週三 中區聯合早會)", text: "C. 10:20 舉牌提醒講師剩餘時間十分鐘", day: "Wed", badge: "週三" },
    { id: "h_wed_4", section: "中段早會項目 (週三 中區聯合早會)", text: "D. 10:25 舉牌提醒講師剩餘時間五分鐘", day: "Wed", badge: "週三" },
    { id: "h_wed_5", section: "中段早會項目 (週三 中區聯合早會)", text: "E. 請講師留步，邀請長官上台致贈感謝卡", day: "Wed", badge: "週三" },
    { id: "h_wed_6", section: "中段早會項目 (週三 中區聯合早會)", text: "F. 結語講師內容並與講師合影 (結語著重於課程金句與加深同仁印象，非評論課程，最多兩段)", day: "Wed", badge: "週三" },
    { id: "h_wed_7", section: "中段早會項目 (週三 中區聯合早會)", text: "G. (早會結束)", day: "Wed", badge: "週三" },
    
    // 中段 週四 財經學習
    { id: "h_thu_1", section: "中段早會項目 (週四 財經學習)", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日早會主題", day: "Thu", badge: "週四" },
    { id: "h_thu_2", section: "中段早會項目 (週四 財經學習)", text: "B. 09:00 - 09:30 財經學習 (播放影片或宣讀)", day: "Thu", badge: "週四" },
    { id: "h_thu_3", section: "中段早會項目 (週四 財經學習)", text: "C. 09:30 - 10:00 財經分組研討 (協助同仁分組並指引研討場地)", day: "Thu", badge: "週四" },
    { id: "h_thu_4", section: "中段早會項目 (週四 財經學習)", text: "D. 10:10 集合各組，邀請各組代表分享研討心得 (分享完後主持人做簡單收尾結語)", day: "Thu", badge: "週四" },
    { id: "h_thu_5", section: "中段早會項目 (週四 財經學習)", text: "E. (早會結束)", day: "Thu", badge: "週四" },
    
    // 中段 週五 課程
    { id: "h_fri_1", section: "中段早會項目 (週五 課程)", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日早會主題", day: "Fri", badge: "週五" },
    { id: "h_fri_2", section: "中段早會項目 (週五 課程)", text: "B. 介紹講師與課程 (介紹順序：課程名稱 -> 大綱 -> 講師介紹，結束後關閉前方燈光)", day: "Fri", badge: "週五" },
    { id: "h_fri_3", section: "中段早會項目 (週五 課程)", text: "C. 09:50 舉牌提醒講師剩餘時間十分鐘", day: "Fri", badge: "週五" },
    { id: "h_fri_4", section: "中段早會項目 (週五 課程)", text: "D. 09:55 舉牌提醒講師剩餘時間五分鐘", day: "Fri", badge: "週五" },
    { id: "h_fri_5", section: "中段早會項目 (週五 課程)", text: "E. 請講師留步，邀請長官上台致贈感謝卡", day: "Fri", badge: "週五" },
    { id: "h_fri_6", section: "中段早會項目 (週五 課程)", text: "F. 結語講師內容並與講師合影 (結語著重於課程金句與加深同仁印象，非評論課程，最多兩段)", day: "Fri", badge: "週五" },
    { id: "h_fri_7", section: "中段早會項目 (週五 課程)", text: "G. (早會結束)", day: "Fri", badge: "週五" },
    
    // 後段 結尾
    { id: "h14", section: "後段 結尾", text: "1. 昨日舉績壽險人員分享：上台時請同仁邊拍手齊說「FYB」(所有分享者分享完後做一簡單結語)", day: "all", badge: "結尾" },
    { id: "h15", section: "後段 結尾", text: "2. 詢問各功能組是否有其他宣達事項", day: "all", badge: "結尾" },
    { id: "h16", section: "後段 結尾", text: "3. 邀請副總上台進行最後總結", day: "all", badge: "結尾" },
    { id: "h17", section: "後段 結尾", text: "4. 布達明日早會內容簡報，並請下週主持音控核對流程", day: "all", badge: "結尾" },
    { id: "h18", section: "後段 結尾", text: "5. 321結束早會", day: "all", badge: "結尾" }
  ]
};

// Application state
let scheduleData = []; // Array of weeks parsed from Excel
let selectedWeek = null; // Currently selected week object
let currentRole = null;
let currentDayFilter = 'all'; // 'all', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'
let checkedItems = {}; // mapping of item.id -> boolean
let isConfirmed = false;

// DOM Elements
const weekSelect = document.getElementById('week-select');
const weekInfoPanel = document.getElementById('week-info-panel');
const schedHost = document.getElementById('sched-host');
const schedDj = document.getElementById('sched-dj');
const weeklyDaysList = document.getElementById('weekly-days-list');

const usernameInput = document.getElementById('username');
const tabSound = document.getElementById('tab-sound');
const tabHost = document.getElementById('tab-host');
const checklistContainer = document.getElementById('checklist-container');
const actionsContainer = document.getElementById('actions-container');
const confirmAgreement = document.getElementById('confirm-agreement');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');
const progressRatio = document.getElementById('progress-ratio');
const successOverlay = document.getElementById('success-overlay');
const resetBtn = document.getElementById('reset-btn');

// Load saved username
if (localStorage.getItem('huanchen_username')) {
  usernameInput.value = localStorage.getItem('huanchen_username');
}

// Fetch schedule on load
fetch('/api/schedule')
  .then(res => res.json())
  .then(data => {
    scheduleData = data;
    populateWeekSelect();
    
    // Auto-select the closest week (smart default)
    if (scheduleData.length > 0) {
      weekSelect.value = scheduleData[0].weekId;
      selectWeek(scheduleData[0].weekId);
    }
  })
  .catch(err => {
    console.error('Failed to load schedule from server:', err);
    weekSelect.innerHTML = '<option value="">無法載入課表...</option>';
  });

// Event Listeners
weekSelect.addEventListener('change', (e) => selectWeek(e.target.value));
usernameInput.addEventListener('input', checkNameMatchRole);

tabSound.addEventListener('click', () => selectRole('sound'));
tabHost.addEventListener('click', () => selectRole('host'));

confirmAgreement.addEventListener('click', () => {
  if (submitBtn.classList.contains('ready')) {
    isConfirmed = !isConfirmed;
    confirmAgreement.classList.toggle('checked', isConfirmed);
    updateSubmitButtonState();
  }
});

submitBtn.addEventListener('click', submitData);
resetBtn.addEventListener('click', resetForm);

// Populate week selector
function populateWeekSelect() {
  let html = '<option value="" disabled>-- 請選擇早會週次 --</option>';
  scheduleData.forEach(week => {
    html += `<option value="${week.weekId}">${week.label}</option>`;
  });
  weekSelect.innerHTML = html;
}

// Handle week selection
function selectWeek(weekId) {
  selectedWeek = scheduleData.find(w => w.weekId === weekId);
  if (!selectedWeek) {
    weekInfoPanel.style.display = 'none';
    return;
  }
  
  // Render weekly information card
  schedHost.textContent = selectedWeek.host || '未排定';
  schedDj.textContent = selectedWeek.dj || '未排定';
  
  let daysHtml = '';
  selectedWeek.days.forEach(d => {
    daysHtml += `
      <div style="display: flex; gap: 0.5rem; padding: 0.25rem 0; border-bottom: 1px solid rgba(230, 126, 34, 0.05);">
        <span style="font-weight: 700; width: 60px; color: var(--primary);">週${d.day} (${d.date})</span>
        <span style="flex: 1; word-break: break-all;">${d.activity}</span>
      </div>
    `;
  });
  weeklyDaysList.innerHTML = daysHtml;
  weekInfoPanel.style.display = 'block';
  
  // Perform name match
  checkNameMatchRole();
  
  // Re-render checklist if role is selected to update any dynamic labels
  if (currentRole) {
    renderChecklist();
  }
}

// Check if name matches Host or DJ and auto select role
function checkNameMatchRole() {
  if (!selectedWeek) return;
  const name = usernameInput.value.trim();
  if (!name) return;
  
  // Check Host match (check contains to be helpful with nicknames or full names)
  if (selectedWeek.host && (selectedWeek.host.includes(name) || name.includes(selectedWeek.host))) {
    if (currentRole !== 'host') {
      selectRole('host');
      showRoleMatchGlow('tab-host');
    }
  } 
  // Check DJ match
  else if (selectedWeek.dj && (selectedWeek.dj.includes(name) || name.includes(selectedWeek.dj))) {
    if (currentRole !== 'sound') {
      selectRole('sound');
      showRoleMatchGlow('tab-sound');
    }
  }
}

// Visual effect on matching role tab
function showRoleMatchGlow(tabId) {
  const tab = document.getElementById(tabId);
  if (tab) {
    tab.style.transform = 'scale(1.05)';
    tab.style.borderColor = 'var(--success)';
    tab.style.boxShadow = '0 0 15px var(--success-glow)';
    setTimeout(() => {
      tab.style.transform = '';
      tab.style.borderColor = '';
      tab.style.boxShadow = '';
    }, 1500);
  }
}

// Function to select role
function selectRole(role) {
  currentRole = role;
  
  if (role === 'sound') {
    tabSound.classList.add('active');
    tabHost.classList.remove('active');
  } else {
    tabHost.classList.add('active');
    tabSound.classList.remove('active');
  }
  
  // Reset checked items when switching roles
  checkedItems = {};
  isConfirmed = false;
  confirmAgreement.classList.remove('checked');
  
  actionsContainer.style.display = 'flex';

  renderChecklist();
}

// Render the checklist based on current role and day filter
function renderChecklist() {
  if (!currentRole) return;
  
  const items = checklistData[currentRole];
  // Filter items: must be 'all' (applies to all days) OR matches the selected day filter.
  const filteredItems = items.filter(item => {
    if (currentDayFilter === 'all') return true;
    return item.day === 'all' || item.day === currentDayFilter;
  });
  
  if (filteredItems.length === 0) {
    checklistContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-folder-open"></i>
        <p>此篩選條件下沒有工作項目。</p>
      </div>
    `;
    updateProgress();
    return;
  }
  
  // Group by sections to render them cleanly
  const sections = {};
  filteredItems.forEach(item => {
    if (!sections[item.section]) {
      sections[item.section] = [];
    }
    sections[item.section].push(item);
  });
  
  let html = '';
  
  // If a specific day is selected, render a helpful header displaying today's早會主題
  if (currentDayFilter !== 'all' && selectedWeek) {
    const dayNameMap = { 'Mon': '一', 'Tue': '二', 'Wed': '三', 'Thu': '四', 'Fri': '五' };
    const targetDayObj = selectedWeek.days.find(d => d.day === dayNameMap[currentDayFilter]);
    if (targetDayObj) {
      html += `
        <div style="background: var(--accent-soft); border: 1px solid var(--primary); border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem; animation: slideUp 0.3s ease;">
          <i class="fa-solid fa-bullhorn" style="font-size: 1.2rem; color: var(--primary);"></i>
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--primary);">今日早會主題 (${targetDayObj.date} 週${targetDayObj.day})</div>
            <div style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 2px;">${targetDayObj.activity}</div>
          </div>
        </div>
      `;
    }
  }
  
  for (const [sectionName, sectionItems] of Object.entries(sections)) {
    // Count how many are checked in this section
    const checkedInSection = sectionItems.filter(item => checkedItems[item.id]).length;
    
    html += `
      <div class="section-container" id="section-${sectionName.replace(/\s+/g, '-')}">
        <div class="section-header" onclick="toggleSection('section-body-${sectionName.replace(/\s+/g, '-')}', this)">
          <div class="section-title">
            ${sectionName}
            <span class="badge">${checkedInSection}/${sectionItems.length} 已核對</span>
          </div>
          <div class="section-toggle">
            <i class="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div class="checklist-items" id="section-body-${sectionName.replace(/\s+/g, '-')}">
    `;
    
    sectionItems.forEach(item => {
      const isChecked = checkedItems[item.id] ? 'checked' : '';
      const dayBadgeClass = item.day !== 'all' ? 'badge-day' : '';
      
      // Personalize/replace text if it mentions "xxx" or "講師" with Excel schedule info if available
      let itemDisplayText = item.text;
      if (selectedWeek) {
        if (itemDisplayText.includes('xxx')) {
          itemDisplayText = itemDisplayText.replace('xxx', usernameInput.value.trim() || '您');
        }
        
        // Dynamic course insertion
        if (item.day !== 'all' && (itemDisplayText.includes('課程') || itemDisplayText.includes('聯合早會') || itemDisplayText.includes('財經學習'))) {
          const dayNameMap = { 'Mon': '一', 'Tue': '二', 'Wed': '三', 'Thu': '四', 'Fri': '五' };
          const dayObj = selectedWeek.days.find(d => d.day === dayNameMap[item.day]);
          if (dayObj && dayObj.activity && !dayObj.activity.includes('無特別')) {
            itemDisplayText += ` <span style="display:block; font-size:0.8rem; color:var(--primary); font-weight:600; margin-top:4px;"><i class="fa-solid fa-link"></i> 當日主題：${dayObj.activity}</span>`;
          }
        }
      }
      
      html += `
        <div class="item-row ${isChecked}" data-id="${item.id}" onclick="toggleItem('${item.id}')">
          <div class="item-content">
            ${item.day !== 'all' ? `<span class="item-badge ${dayBadgeClass}">週${getDayChinese(item.day)}</span>` : ''}
            ${item.badge && item.day === 'all' ? `<span class="item-badge">${item.badge}</span>` : ''}
            <div class="item-text">${itemDisplayText}</div>
          </div>
          <div class="checkbox-container">
            <div class="custom-checkbox">
              <i class="fa-solid fa-check"></i>
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  }
  
  checklistContainer.innerHTML = html;
  updateProgress();
}

function getDayChinese(day) {
  const map = { 'Mon': '一', 'Tue': '二', 'Wed': '三', 'Thu': '四', 'Fri': '五' };
  return map[day] || '';
}

// Collapsible sections
window.toggleSection = function(bodyId, headerEl) {
  const body = document.getElementById(bodyId);
  const icon = headerEl.querySelector('.section-toggle i');
  
  if (body.style.display === 'none') {
    body.style.display = 'flex';
    icon.style.transform = 'rotate(0deg)';
  } else {
    body.style.display = 'none';
    icon.style.transform = 'rotate(-90deg)';
  }
};

// Toggle checklist item checked state
window.toggleItem = function(id) {
  checkedItems[id] = !checkedItems[id];
  
  const row = document.querySelector(`.item-row[data-id="${id}"]`);
  if (row) {
    row.classList.toggle('checked', checkedItems[id]);
  }
  
  updateSectionBadges();
  updateProgress();
};

function updateSectionBadges() {
  const sectionContainers = document.querySelectorAll('.section-container');
  sectionContainers.forEach(container => {
    const rows = container.querySelectorAll('.item-row');
    const checked = container.querySelectorAll('.item-row.checked').length;
    const badge = container.querySelector('.section-title .badge');
    if (badge) {
      badge.textContent = `${checked}/${rows.length} 已核對`;
    }
  });
}

// Calculate and update progress
function updateProgress() {
  if (!currentRole) return;
  
  const items = checklistData[currentRole];
  const filteredItems = items.filter(item => {
    if (currentDayFilter === 'all') return true;
    return item.day === 'all' || item.day === currentDayFilter;
  });
  
  const total = filteredItems.length;
  if (total === 0) {
    progressBar.style.width = '0%';
    progressPercent.textContent = '0%';
    progressRatio.textContent = '0 / 0 已核對';
    return;
  }
  
  let checkedCount = 0;
  filteredItems.forEach(item => {
    if (checkedItems[item.id]) {
      checkedCount++;
    }
  });
  
  const percent = Math.round((checkedCount / total) * 100);
  progressBar.style.width = `${percent}%`;
  progressPercent.textContent = `${percent}%`;
  progressRatio.textContent = `${checkedCount} / ${total} 已核對`;
  
  if (percent === 100) {
    submitBtn.classList.add('ready');
  } else {
    submitBtn.classList.remove('ready');
    isConfirmed = false;
    confirmAgreement.classList.remove('checked');
    updateSubmitButtonState();
  }
}

function updateSubmitButtonState() {
  if (isConfirmed && submitBtn.classList.contains('ready')) {
    submitBtn.style.opacity = '1';
    submitBtn.style.pointerEvents = 'auto';
  } else {
    submitBtn.style.opacity = '0.7';
    if (!submitBtn.classList.contains('ready')) {
      submitBtn.style.pointerEvents = 'none';
    }
  }
}

// Submit data to server
function submitData() {
  const name = usernameInput.value.trim();
  
  if (!name) {
    alert('請輸入您的姓名！');
    usernameInput.focus();
    return;
  }
  
  if (!selectedWeek) {
    alert('請選擇早會週次！');
    return;
  }
  
  if (!currentRole) {
    alert('請選擇角色！');
    return;
  }
  
  if (!isConfirmed) {
    alert('請勾選最下方的「確認清楚了解所有流程」複選框以完成核對！');
    return;
  }
  
  // Save name to localStorage
  localStorage.setItem('huanchen_username', name);
  
  const submissionData = {
    name,
    role: currentRole === 'sound' ? '音控' : '主持',
    weekId: selectedWeek.weekId,
    weekLabel: selectedWeek.label,
    dayFilter: currentDayFilter,
    items: checkedItems,
    progress: 100
  };
  
  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';
  
  fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submissionData)
  })
  .then(res => res.json())
  .then(data => {
    submitBtn.disabled = false;
    submitBtn.textContent = '確認送出';
    
    if (data.success) {
      successOverlay.classList.add('active');
    } else {
      alert('儲存失敗：' + (data.error || '未知錯誤'));
    }
  })
  .catch(err => {
    submitBtn.disabled = false;
    submitBtn.textContent = '確認送出';
    console.error(err);
    alert('網路連線失敗，請稍後再試！');
  });
}

// Reset form
function resetForm() {
  checkedItems = {};
  isConfirmed = false;
  confirmAgreement.classList.remove('checked');
  successOverlay.classList.remove('active');
  
  renderChecklist();
}
