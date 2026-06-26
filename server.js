const express = require('express');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const UPLOAD_FILE = path.join(__dirname, 'active_schedule.xlsx');

// Default templates for sound and host checklists
const DEFAULT_TEMPLATES = {
  sound: [
    { id: "s1", section: "前一週與前一天", text: "訪問講師：提前一週與講師邀約課程前訪問", day: "all", badge: "前一週" },
    { id: "s2", section: "前一週與前一天", text: "提醒事宜：晚上七點前，致電講師，並且確認拿取明日課程ＰＰＴ (確認檔案類型)", day: "all", badge: "前一天" },
    { id: "s3", section: "前一週與前一天", text: "晚上七點前，與主持人核對明日細節", day: "all", badge: "前一天" },
    { id: "s4", section: "前段 (準備 & 主持開始)", text: "熟悉電腦操作，確認簡報與影片檔案", day: "all", badge: "準備" },
    { id: "s5", section: "前段 (準備 & 主持開始)", text: "模擬明日流程，確認那些環節需要播放音樂/影片", day: "all", badge: "準備" },
    { id: "s6", section: "前段 (準備 & 主持開始)", text: "08:40 到公司並且準備就位！播放背景音樂、拉開投影布幕 (若有事，請於 08:45 前找人交接並通知組長)", day: "all", badge: "08:40 就位" },
    { id: "s7", section: "前段 (準備 & 主持開始)", text: "08:50 確認簡報、麥克風、簡報筆，以及投影與電視是否同步", day: "all", badge: "08:50 設備確認" },
    { id: "s8", section: "前段 (準備 & 主持開始)", text: "08:57 提早三分鐘播放「環太平洋音樂」(提醒同仁往前就坐)", day: "all", badge: "08:57 提醒音樂" },
    { id: "s9", section: "前段 (準備 & 主持開始)", text: "09:00 準時開始早會，播放「早操影片」", day: "all", badge: "09:00 開始" },
    { id: "s_mon_1", section: "中段早會項目 (週一 週盤點)", text: "A. 開啟週一簡報連結", day: "Mon", badge: "週一" },
    { id: "s_mon_2", section: "中段早會項目 (週一 週盤點)", text: "B. 各功能組佈達 (早會、活動、講座、訓練、競賽、總務、組發、商品)，確認進出場音樂", day: "Mon", badge: "週一" },
    { id: "s_mon_3", section: "中段早會項目 (週一 週盤點)", text: "C. 請副總上台帶定聯與盤點 (播放進出場音樂)", day: "Mon", badge: "週一" },
    { id: "s_mon_4", section: "中段早會項目 (週一 週盤點)", text: "D. 09:55 播放結束前五分鐘提醒音樂", day: "Mon", badge: "週一" },
    { id: "s_tue_1", section: "中段早會項目 (週二 課程)", text: "A. 開啟講師檔案", day: "Tue", badge: "週二" },
    { id: "s_tue_2", section: "中段早會項目 (週二 課程)", text: "B. 準備並播放講師進出場音樂", day: "Tue", badge: "週二" },
    { id: "s_wed_1", section: "中段早會項目 (週三 中區聯合早會)", text: "A. 開啟週三聯合早會檔案", day: "Wed", badge: "週三" },
    { id: "s_wed_2", section: "中段早會項目 (週三 中區聯合早會)", text: "B. 準備講師進出場音樂，調整講師麥克風音量 (音樂開至第五格)", day: "Wed", badge: "週三" },
    { id: "s_wed_3", section: "中段早會項目 (週三 中區聯合早會)", text: "D. 邀請頒發感謝卡時，播放頒獎音樂", day: "Wed", badge: "週三" },
    { id: "s_thu_1", section: "中段早會項目 (週四 財經學習)", text: "A. 開啟財經學習影片", day: "Thu", badge: "週四" },
    { id: "s_thu_2", section: "中段早會項目 (週四 財經學習)", text: "B. 播放財經講師簡報首頁或海報", day: "Thu", badge: "週四" },
    { id: "s_thu_3", section: "中段早會項目 (週四 財經學習)", text: "C. 09:55 分組研討結束前，播放結束前五分鐘提醒音樂", day: "Thu", badge: "週四" },
    { id: "s_fri_1", section: "中段早會項目 (週五 課程)", text: "A. 播放講師簡報首頁或海報", day: "Fri", badge: "週五" },
    { id: "s_fri_2", section: "中段早會項目 (週五 課程)", text: "B. 準備講師進出場音樂，調整講師麥克風音量 (音樂開至第五格)", day: "Fri", badge: "週五" },
    { id: "s10", section: "後段 結尾", text: "1. 昨日舉績壽險人員分享：切換分享簡報，準備好進出場音樂", day: "all", badge: "結尾" },
    { id: "s11", section: "後段 結尾", text: "2. 切換各功能組報告簡報", day: "all", badge: "結尾" },
    { id: "s12", section: "後段 結尾", text: "3. 切換總結簡報", day: "all", badge: "結尾" },
    { id: "s13", section: "後段 結尾", text: "4. 切換布達明日早會內容簡報，與結束早會簡報", day: "all", badge: "結尾" }
  ],
  host: [
    { id: "h1", section: "前一週與前一天", text: "訪問講師：提前一週與講師邀約，進行課程前訪問與溝通", day: "all", badge: "前一週" },
    { id: "h2", section: "前一週與前一天", text: "提醒事宜：晚上點前，致電講師，且確認課程 PPT 檔案已提供給音控", day: "all", badge: "前一天" },
    { id: "h3", section: "前一週與前一天", text: "晚上七點前，於大群組佈達明日課程，並 tag 壽險件 case 分享人員", day: "all", badge: "前一天" },
    { id: "h4", section: "前一週與前一天", text: "座位規範：除 case 分享時間可坐臨時座位外，其他時間請坐主持人專屬座位 (第一排最左側)", day: "all", badge: "前一天" },
    { id: "h5", section: "前一週與前一天", text: "晚上七點前，與音控核對明日細節", day: "all", badge: "前一天" },
    { id: "h6", section: "前一週與前一天", text: "當天有課程請在課程結束後，邀請協理頒發感謝卡並與講師合影", day: "all", badge: "前一天" },
    { id: "h7", section: "前段 (準備 & 主持開始)", text: "穿著正式服裝 (主持人是整場之靈魂，請以專業形象呈現)", day: "all", badge: "準備" },
    { id: "h8", section: "前段 (準備 & 主持開始)", text: "準備 2 則笑話或時事 (特殊突發情況時墊時間用)", day: "all", badge: "準備" },
    { id: "h9", section: "前段 (準備 & 主持開始)", text: "調整狀態：聲音宏亮、流程清晰、展現自信與滿滿活力", day: "all", badge: "準備" },
    { id: "h10", section: "前段 (準備 & 主持開始)", text: "08:40 到公司並準備就位，請音控拉開投影布幕 (若有急事，請 08:45 前找人交接並通知組長)", day: "all", badge: "08:40 就位" },
    { id: "h11", section: "前段 (準備 & 主持開始)", text: "08:50 與音控 (DJ) 核對簡報、麥克風、簡報筆、講師備水、白板主題布條、當天日期", day: "all", badge: "08:50 設備確認" },
    { id: "h12", section: "前段 (準備 & 主持開始)", text: "08:55 廣播提醒同仁：「早會將於五分鐘後開始，請同仁往前就坐」", day: "all", badge: "08:55 廣播" },
    { id: "h13", section: "前段 (準備 & 主持開始)", text: "08:57 廣播提醒同仁：「早會將於三分鐘後開始，請同仁往前就坐」", day: "all", badge: "08:57 廣播" },
    { id: "h_mon_1", section: "中段早會項目 (週一 週盤點)", text: "A. 準時開場問候、自我介紹 (我是本週主持人xxx)、宣告日期、星期、截績/競賽倒數天數、說明早會主題", day: "Mon", badge: "週一" },
    { id: "h_mon_2", section: "中段早會項目 (週一 週盤點)", text: "B. 關掉前方燈光", day: "Mon", badge: "週一" },
    { id: "h_mon_3", section: "中段早會項目 (週一 週盤點)", text: "C. 邀請各功能組上台佈達 (早會組、活動組、講座組、訓練組、競賽組、總務組、組發組、商品組)", day: "Mon", badge: "週一" },
    { id: "h_mon_4", section: "中段早會項目 (週一 週盤點)", text: "D. 邀請副總上台帶定聯與進行分組盤點 (盤點至 10:00)", day: "Mon", badge: "週一" },
    { id: "h_mon_5", section: "中段早會項目 (週一 週盤點)", text: "E. 昨日舉績壽險人員分享", day: "Mon", badge: "週一" },
    { id: "h_mon_6", section: "中段早會項目 (週一 週盤點)", text: "F. (早會結束)", day: "Mon", badge: "週一" },
    { id: "h_tue_1", section: "中段早會項目 (週二 課程)", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日課程主題", day: "Tue", badge: "週二" },
    { id: "h_tue_2", section: "中段早會項目 (週二 課程)", text: "B. 09:00 - 10:00 講師課程分享 (介紹講師後關閉前方燈光)", day: "Tue", badge: "週二" },
    { id: "h_tue_3", section: "中段早會項目 (週二 課程)", text: "C. 09:50 舉牌提醒講師剩餘時間十分鐘", day: "Tue", badge: "週二" },
    { id: "h_tue_4", section: "中段早會項目 (週二 課程)", text: "D. 09:55 舉牌提醒講師剩餘時間五分鐘", day: "Tue", badge: "週二" },
    { id: "h_tue_5", section: "中段早會項目 (週二 課程)", text: "E. (早會結束)", day: "Tue", badge: "週二" },
    { id: "h_wed_1", section: "中段早會項目 (週三 中區聯合早會)", text: "A. 開場問候、宣告日期、星期、截績/競賽倒數天數、說明今日主題：中區聯合早會", day: "Wed", badge: "週三" },
    { id: "h_wed_2", section: "中段早會項目 (週三 中區聯合早會)", text: "B. 介紹講師與課程 (介紹順序：課程名稱 -> 大綱 -> 講師介紹，結束後關閉前方燈光)", day: "Wed", badge: "週三" },
    { id: "h_wed_3", section: "中段早會項目 (週三 中區聯合早會)", text: "C. 10:20 舉牌提醒講師剩餘時間十分鐘", day: "Wed", badge: "週三" },
    { id: "h_wed_4", section: "中段早會項目 (週三 中區聯合早會)", text: "D. 10:25 舉牌提醒講師剩餘時間五分鐘", day: "Wed", badge: "週三" },
    { id: "h_wed_5", section: "中段早會項目 (週三 中區聯合早會)", text: "E. 請講師留步，邀請長官上台致贈感謝卡", day: "Wed", badge: "週三" },
    { id: "h_wed_6", section: "中段早會項目 (週三 中區聯合早會)", text: "F. 結語講師內容並與講師合影 (結語著重於課程金句與加深同仁印象，非評論課程，最多兩段)", day: "Wed", badge: "週三" },
    { id: "h_wed_7", section: "中段早會項目 (週三 中區聯合早會)", text: "G. (早會結束)", day: "Wed", badge: "週三" },
    { id: "h_thu_1", section: "中段早會項目 (週四 財經學習)", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日早會主題", day: "Thu", badge: "週四" },
    { id: "h_thu_2", section: "中段早會項目 (週四 財經學習)", text: "B. 09:00 - 09:30 財經學習 (播放影片或宣讀)", day: "Thu", badge: "週四" },
    { id: "h_thu_3", section: "中段早會項目 (週四 財經學習)", text: "C. 09:30 - 10:00 財經分組研討 (協助同仁分組並指引研討場地)", day: "Thu", badge: "週四" },
    { id: "h_thu_4", section: "中段早會項目 (週四 財經學習)", text: "D. 10:10 集合各組，邀請各組代表分享研討心得 (分享完後主持人做簡單收尾結語)", day: "Thu", badge: "週四" },
    { id: "h_thu_5", section: "中段早會項目 (週四 財經學習)", text: "E. (早會結束)", day: "Thu", badge: "週四" },
    { id: "h_fri_1", section: "中段早會項目 (週五 課程)", text: "A. 準時開場問候、自我介紹、宣告日期、星期、截績/競賽倒數天數、說明今日早會主題", day: "Fri", badge: "週五" },
    { id: "h_fri_2", section: "中段早會項目 (週五 課程)", text: "B. 介紹講師與課程 (介紹順序：課程名稱 -> 大綱 -> 講師介紹，結束後關閉前方燈光)", day: "Fri", badge: "週五" },
    { id: "h_fri_3", section: "中段早會項目 (週五 課程)", text: "C. 09:50 舉牌提醒講師剩餘時間十分鐘", day: "Fri", badge: "週五" },
    { id: "h_fri_4", section: "中段早會項目 (週五 課程)", text: "D. 09:55 舉牌提醒講師剩餘時間五分鐘", day: "Fri", badge: "週五" },
    { id: "h_fri_5", section: "中段早會項目 (週五 課程)", text: "E. 請講師留步，邀請長官上台致贈感謝卡", day: "Fri", badge: "週五" },
    { id: "h_fri_6", section: "中段早會項目 (週五 課程)", text: "F. 結語講師內容並與講師合影 (結語著重於課程金句與加深同仁印象，非評論課程，最多兩段)", day: "Fri", badge: "週五" },
    { id: "h_fri_7", section: "中段早會項目 (週五 課程)", text: "G. (早會結束)", day: "Fri", badge: "週五" },
    { id: "h14", section: "後段 結尾", text: "1. 昨日舉績壽險人員分享：上台時請同仁邊拍手齊說「FYB」(所有分享者分享完後做一簡單結語)", day: "all", badge: "結尾" },
    { id: "h15", section: "後段 結尾", text: "2. 詢問各功能組是否有其他宣達事項", day: "all", badge: "結尾" },
    { id: "h16", section: "後段 結尾", text: "3. 邀請副總上台進行最後總結", day: "all", badge: "結尾" },
    { id: "h17", section: "後段 結尾", text: "4. 布達明日早會內容簡報，並請下週主持音控核對流程", day: "all", badge: "結尾" },
    { id: "h18", section: "後段 結尾", text: "5. 321結束早會", day: "all", badge: "結尾" }
  ]
};

// Configure Multer storage to save the uploaded file directly as active_schedule.xlsx
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);
  },
  filename: function (req, file, cb) {
    cb(null, 'active_schedule.xlsx');
  }
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize db.json if it doesn't exist or is empty
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ submissions: [], templates: DEFAULT_TEMPLATES }, null, 2));
  } else {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      if (!data.templates) {
        data.templates = DEFAULT_TEMPLATES;
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
      }
    } catch (e) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ submissions: [], templates: DEFAULT_TEMPLATES }, null, 2));
    }
  }
}
initDB();

// Helper to read DB
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return { submissions: [], templates: DEFAULT_TEMPLATES };
  }
}

// Helper to write DB
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing to database file:', err);
    return false;
  }
}

// GET templates (Checklist configurations)
app.get('/api/templates', (req, res) => {
  const db = readDB();
  res.json(db.templates || DEFAULT_TEMPLATES);
});

// POST save templates
app.post('/api/templates', (req, res) => {
  const { sound, host } = req.body;
  if (!sound || !host) {
    return res.status(400).json({ error: 'Sound and Host templates are required.' });
  }

  const db = readDB();
  db.templates = { sound, host };
  
  if (writeDB(db)) {
    res.json({ success: true, message: '核對項目模板更新成功！' });
  } else {
    res.status(500).json({ error: 'Failed to save templates.' });
  }
});

// GET parsed schedule
app.get('/api/schedule', (req, res) => {
  const schedule = parseExcelSchedule();
  res.json(schedule);
});

// POST upload schedule Excel file
app.post('/api/upload', upload.single('schedule'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an Excel file.' });
  }
  
  try {
    const workbook = XLSX.readFile(UPLOAD_FILE);
    if (workbook.SheetNames.length === 0) {
      throw new Error("Excel file contains no sheets.");
    }
    res.json({ success: true, message: '課表上傳成功！已載入全新月份的早會行程。' });
  } catch (err) {
    if (fs.existsSync(UPLOAD_FILE)) {
      fs.unlinkSync(UPLOAD_FILE);
    }
    res.status(400).json({ error: '無效的 Excel 檔案！請確保它是合法的課表格式。' });
  }
});

// GET all submissions (for Admin)
app.get('/api/submissions', (req, res) => {
  const db = readDB();
  res.json(db.submissions);
});

// POST submit a checklist
app.post('/api/submit', (req, res) => {
  const { name, role, items, progress, weekId, weekLabel, dayFilter } = req.body;
  
  if (!name || !role || !items || !weekId) {
    return res.status(400).json({ error: 'Name, role, weekId, and checked items are required.' });
  }

  const db = readDB();
  
  const newSubmission = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    name,
    role, // '音控' or '主持'
    weekId,
    weekLabel: weekLabel || '',
    dayFilter: dayFilter || 'all',
    items, // object mapping item ID to boolean
    progress: progress || 0,
    timestamp: new Date().toISOString()
  };

  db.submissions.unshift(newSubmission);
  
  if (writeDB(db)) {
    res.json({ success: true, submission: newSubmission });
  } else {
    res.status(500).json({ error: 'Failed to save submission.' });
  }
});

// POST delete a submission (for Admin)
app.post('/api/delete', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Submission ID is required.' });
  }

  const db = readDB();
  const initialLength = db.submissions.length;
  db.submissions = db.submissions.filter(sub => sub.id !== id);

  if (db.submissions.length === initialLength) {
    return res.status(404).json({ error: 'Submission not found.' });
  }

  if (writeDB(db)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to delete submission.' });
  }
});

// Function to dynamically parse the Excel files
function parseExcelSchedule() {
  const file1 = "/Users/stanley/Downloads/2026寰辰早會課表.xlsx";
  const file2 = "/Users/stanley/Downloads/2026寰辰早會課表-2.xlsx";
  let fileToRead = null;

  if (fs.existsSync(UPLOAD_FILE)) {
    fileToRead = UPLOAD_FILE;
  } else if (fs.existsSync(file1)) {
    fileToRead = file1;
  } else if (fs.existsSync(file2)) {
    fileToRead = file2;
  }

  if (!fileToRead) {
    return getFallbackSchedule();
  }

  try {
    const workbook = XLSX.readFile(fileToRead);
    
    let sheetName = null;
    for (const name of workbook.SheetNames) {
      if (name === '輪值表' || name === '主持表' || name === '音控表') continue;
      const sh = workbook.Sheets[name];
      const rawRows = XLSX.utils.sheet_to_json(sh, { header: 1 });
      const hasHeaders = rawRows.some(row => row.includes('日期') && row.includes('星期'));
      if (hasHeaders) {
        sheetName = name;
        break;
      }
    }
    
    if (!sheetName) {
      sheetName = workbook.SheetNames.find(name => name !== '輪值表' && name !== '主持表' && name !== '音控表') || workbook.SheetNames[0];
    }
    
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return getFallbackSchedule();

    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    let headerRowIdx = -1;
    for (let i = 0; i < rawRows.length; i++) {
      if (rawRows[i].includes('日期') && rawRows[i].includes('星期')) {
        headerRowIdx = i;
        break;
      }
    }

    if (headerRowIdx === -1) return getFallbackSchedule();

    const monthMatch = sheetName.match(/\d+/g);
    let monthPrefix = '7';
    if (monthMatch && monthMatch.length > 0) {
      monthPrefix = monthMatch[monthMatch.length - 1];
    }

    const dataRows = rawRows.slice(headerRowIdx + 1);
    const weeks = [];
    let currentWeek = null;

    dataRows.forEach(row => {
      const dateVal = row[0];
      const dayOfWeek = row[1];
      if (!dateVal || !dayOfWeek) return;

      const dateStr = String(dateVal).trim();
      const dayStr = String(dayOfWeek).trim();

      if (dayStr === '一' || !currentWeek) {
        if (currentWeek) {
          weeks.push(currentWeek);
        }

        const host = row[2] ? String(row[2]).trim() : '';
        const dj = row[3] ? String(row[3]).trim() : '';

        currentWeek = {
          weekId: `week-${weeks.length + 1}`,
          startDate: dateStr.includes('.') ? dateStr : `${monthPrefix}.${dateStr}`,
          endDate: '',
          host: host,
          dj: dj,
          days: []
        };
      }

      let formattedDate = dateStr;
      if (!dateStr.includes('.')) {
        formattedDate = `${monthPrefix}.${dateStr}`;
      }

      currentWeek.endDate = formattedDate;

      const event1 = row[4] ? String(row[4]).trim() : '';
      const event2 = row[5] ? String(row[5]).trim() : '';
      const note = row[6] ? String(row[6]).trim() : '';
      const special = row[7] ? String(row[7]).trim() : '';

      let activity = event1;
      if (event2) activity += (activity ? ' + ' : '') + event2;
      if (note) activity += ` (${note})`;
      if (special) activity += ` [${special}]`;

      currentWeek.days.push({
        date: formattedDate,
        day: dayStr,
        activity: activity || '無特別課程/事項'
      });
    });

    if (currentWeek) {
      weeks.push(currentWeek);
    }

    weeks.forEach(w => {
      w.label = `${w.startDate} ~ ${w.endDate} (主持: ${w.host} / 音控: ${w.dj})`;
    });

    return weeks.length > 0 ? weeks : getFallbackSchedule();
  } catch (err) {
    return getFallbackSchedule();
  }
}

// Fallback schedule in case Excel files are missing or parse fails
function getFallbackSchedule() {
  return [
    {
      weekId: "week-fallback",
      startDate: "7.1",
      endDate: "7.5",
      host: "尚未設定",
      dj: "尚未設定",
      label: "7.1 ~ 7.5 (暫無課表，請由後台管理員上傳 Excel)",
      days: [
        { date: "7.1", day: "一", activity: "無特別課程" },
        { date: "7.2", day: "二", activity: "無特別課程" },
        { date: "7.3", day: "三", activity: "無特別課程" },
        { date: "7.4", day: "四", activity: "無特別課程" },
        { date: "7.5", day: "五", activity: "無特別課程" }
      ]
    }
  ];
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
