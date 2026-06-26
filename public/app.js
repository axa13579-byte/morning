// Checklist data structures, loaded dynamically from server templates
let checklistData = { sound: [], host: [] };

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

// Fetch templates and schedule on load
function initApp() {
  fetch('/api/templates')
    .then(res => res.json())
    .then(templates => {
      checklistData = templates;
      return fetch('/api/schedule');
    })
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
      console.error('Failed to load data from server:', err);
      weekSelect.innerHTML = '<option value="">無法載入課表...</option>';
    });
}
initApp();

// Event Listeners
weekSelect.addEventListener('change', (e) => selectWeek(e.target.value));
usernameInput.addEventListener('input', checkNameMatchRole);

tabSound.addEventListener('click', () => selectRole('sound'));
tabHost.addEventListener('click', () => selectRole('host'));

confirmAgreement.addEventListener('click', () => {
  if (!submitBtn.classList.contains('ready')) {
    alert('請先勾選上方所有核對項目，進度達 100% 才能勾選確認！');
    return;
  }
  isConfirmed = !isConfirmed;
  confirmAgreement.classList.toggle('checked', isConfirmed);
  updateSubmitButtonState();
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
      document.body.style.overflow = 'hidden';
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
  document.body.style.overflow = '';
  
  renderChecklist();
}
