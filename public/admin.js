// Copy of checklistData for rendering details, loaded dynamically from server
let checklistData = { sound: [], host: [] };
let editorTemplates = { sound: [], host: [] };
let activeEditorRole = 'sound'; // 'sound' or 'host'


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
fetchTemplatesAndSubmissions();

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

// ==========================================
// Template Editor Management Logic
// ==========================================

const editorSoundTab = document.getElementById('editor-sound-tab');
const editorHostTab = document.getElementById('editor-host-tab');
const templateEditorRows = document.getElementById('template-editor-rows');
const editorAddItemBtn = document.getElementById('editor-add-item-btn');
const editorSaveBtn = document.getElementById('editor-save-btn');
const editorSaveStatus = document.getElementById('editor-save-status');

// Fetch templates and then submissions from server
function fetchTemplatesAndSubmissions() {
  fetch('/api/templates')
    .then(res => res.json())
    .then(templates => {
      checklistData = templates;
      editorTemplates = JSON.parse(JSON.stringify(templates));
      renderEditor();
      fetchSubmissions();
    })
    .catch(err => {
      console.error('Failed to load templates:', err);
      fetchSubmissions();
    });
}

// Tab Switching
editorSoundTab.addEventListener('click', () => {
  activeEditorRole = 'sound';
  editorSoundTab.classList.add('active');
  editorHostTab.classList.remove('active');
  renderEditor();
});

editorHostTab.addEventListener('click', () => {
  activeEditorRole = 'host';
  editorHostTab.classList.add('active');
  editorSoundTab.classList.remove('active');
  renderEditor();
});

// Render the editor table rows
function renderEditor() {
  const items = editorTemplates[activeEditorRole] || [];
  if (items.length === 0) {
    templateEditorRows.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">
          <i class="fa-regular fa-folder-open" style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem; color: var(--border-color);"></i>
          尚未建立任何項目，請點擊下方的「新增核對項目」！
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  items.forEach((item, idx) => {
    // Dropdown for Weekday
    const dayOptions = [
      { val: 'all', text: '每日 / 結尾' },
      { val: 'Mon', text: '週一' },
      { val: 'Tue', text: '週二' },
      { val: 'Wed', text: '週三' },
      { val: 'Thu', text: '週四' },
      { val: 'Fri', text: '週五' }
    ];
    let daySelectHtml = `<select onchange="updateEditorField(${idx}, 'day', this.value)" style="padding: 0.35rem 0.5rem; border-radius: 6px; border: 1px solid var(--border-color);">`;
    dayOptions.forEach(opt => {
      const selected = item.day === opt.val ? 'selected' : '';
      daySelectHtml += `<option value="${opt.val}" ${selected}>${opt.text}</option>`;
    });
    daySelectHtml += `</select>`;

    html += `
      <tr data-index="${idx}">
        <td>
          <input type="text" value="${escapeHtml(item.section || '')}" placeholder="例如：前一週與前一天" oninput="updateEditorField(${idx}, 'section', this.value)">
        </td>
        <td>
          <input type="text" value="${escapeHtml(item.badge || '')}" placeholder="例如：前一週" oninput="updateEditorField(${idx}, 'badge', this.value)">
        </td>
        <td>
          <input type="text" value="${escapeHtml(item.text || '')}" placeholder="請輸入核對項目內容描述..." oninput="updateEditorField(${idx}, 'text', this.value)">
        </td>
        <td>
          ${daySelectHtml}
        </td>
        <td>
          <div class="editor-controls" style="justify-content: center;">
            <button type="button" class="editor-action-btn" title="上移" onclick="moveEditorItem(${idx}, -1)" ${idx === 0 ? 'disabled style="opacity: 0.2; cursor: not-allowed;"' : ''}>
              <i class="fa-solid fa-arrow-up"></i>
            </button>
            <button type="button" class="editor-action-btn" title="下移" onclick="moveEditorItem(${idx}, 1)" ${idx === items.length - 1 ? 'disabled style="opacity: 0.2; cursor: not-allowed;"' : ''}>
              <i class="fa-solid fa-arrow-down"></i>
            </button>
            <button type="button" class="editor-action-btn btn-delete-row" title="刪除" onclick="deleteEditorItem(${idx})">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  templateEditorRows.innerHTML = html;
}

// Field updates from inputs
window.updateEditorField = function(idx, field, value) {
  if (editorTemplates[activeEditorRole][idx]) {
    editorTemplates[activeEditorRole][idx][field] = value;
  }
};

// Delete row
window.deleteEditorItem = function(idx) {
  editorTemplates[activeEditorRole].splice(idx, 1);
  renderEditor();
};

// Move row up/down
window.moveEditorItem = function(idx, direction) {
  const list = editorTemplates[activeEditorRole];
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= list.length) return;
  
  // Swap items
  const temp = list[idx];
  list[idx] = list[targetIdx];
  list[targetIdx] = temp;
  
  renderEditor();
};

// Add Row
editorAddItemBtn.addEventListener('click', () => {
  const list = editorTemplates[activeEditorRole];
  const prefix = activeEditorRole === 'sound' ? 's_custom_' : 'h_custom_';
  const newId = prefix + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
  
  // Auto fill last row's section and badge to speed up data entry
  let defaultSection = '中段早會項目';
  let defaultBadge = '流程';
  if (list.length > 0) {
    defaultSection = list[list.length - 1].section;
    defaultBadge = list[list.length - 1].badge;
  }

  list.push({
    id: newId,
    section: defaultSection,
    badge: defaultBadge,
    text: '',
    day: 'all'
  });
  
  renderEditor();
  
  // Auto-scroll inside editor table container
  const container = document.querySelector('.template-editor-table-wrapper');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
});

// Save all templates to server
editorSaveBtn.addEventListener('click', () => {
  // Validate fields
  let hasEmptyField = false;
  const roles = ['sound', 'host'];
  
  for (const r of roles) {
    const list = editorTemplates[r] || [];
    for (const item of list) {
      if (!item.section.trim() || !item.text.trim()) {
        hasEmptyField = true;
        break;
      }
    }
  }

  if (hasEmptyField) {
    alert('分類區段與核對項目文字為必填，請確保所有欄位皆已填寫！');
    return;
  }

  showSaveStatus('正在儲存設定...', 'info');
  editorSaveBtn.disabled = true;

  fetch('/api/templates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editorTemplates)
  })
  .then(res => res.json())
  .then(data => {
    editorSaveBtn.disabled = false;
    if (data.success) {
      // Sync local copy
      checklistData = JSON.parse(JSON.stringify(editorTemplates));
      showSaveStatus('儲存成功！前台已即時同步更新。', 'success');
      setTimeout(() => {
        editorSaveStatus.style.display = 'none';
      }, 3000);
    } else {
      showSaveStatus('儲存失敗：' + (data.error || '未知錯誤'), 'danger');
    }
  })
  .catch(err => {
    editorSaveBtn.disabled = false;
    console.error(err);
    showSaveStatus('網路連線失敗，無法儲存模板！', 'danger');
  });
});

function showSaveStatus(message, type) {
  editorSaveStatus.style.display = 'inline';
  editorSaveStatus.textContent = message;
  
  if (type === 'success') {
    editorSaveStatus.style.color = 'var(--success)';
  } else if (type === 'danger') {
    editorSaveStatus.style.color = 'var(--danger)';
  } else {
    editorSaveStatus.style.color = 'var(--primary)';
  }
}

