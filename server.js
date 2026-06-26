const express = require('express');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const UPLOAD_FILE = path.join(__dirname, 'active_schedule.xlsx');

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

// Initialize db.json if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ submissions: [] }, null, 2));
}

// Fallback mock schedule in case Excel files are missing
function getFallbackSchedule() {
  return [
    {
      "weekId": "week-1",
      "startDate": "6.29",
      "endDate": "7.4",
      "host": "芫綺",
      "dj": "子津",
      "days": [
        { "date": "6.29", "day": "一", "activity": "每週事項佈達 + 定聯+分組盤點" },
        { "date": "6.30", "day": "二", "activity": "截績日" },
        { "date": "7.1", "day": "三", "activity": "聯合早會—高峰競賽勢必達成-啓鴻協理 (課程到10:30)" },
        { "date": "7.2", "day": "四", "activity": "財經學習 + 分組討論" },
        { "date": "7.3", "day": "五", "activity": "伍強伍傑頒獎典禮" },
        { "date": "7.4", "day": "六", "activity": "考場開發日" }
      ],
      "label": "6.29 ~ 7.4 (主持: 芫綺 / 音控: 子津)"
    },
    {
      "weekId": "week-2",
      "startDate": "7.6",
      "endDate": "7.11",
      "host": "宣佑",
      "dj": "秀珍",
      "days": [
        { "date": "7.6", "day": "一", "activity": "每週事項佈達 + 定聯+分組盤點" },
        { "date": "7.7", "day": "二", "activity": "組織發展-劉秋敏副總" },
        { "date": "7.8", "day": "三", "activity": "策劃會報" },
        { "date": "7.9", "day": "四", "activity": "財經學習 + 分組討論" },
        { "date": "7.10", "day": "五", "activity": "董事長座談-黃奕綱董事長" },
        { "date": "7.11", "day": "六", "activity": "考場開發日" }
      ],
      "label": "7.6 ~ 7.11 (主持: 宣佑 / 音控: 秀珍)"
    },
    {
      "weekId": "week-3",
      "startDate": "7.13",
      "endDate": "7.18",
      "host": "啓洋",
      "dj": "逸寧",
      "days": [
        { "date": "7.13", "day": "一", "activity": "每週事項佈達 + 定聯+分組盤點" },
        { "date": "7.14", "day": "二", "activity": "組織發展-劉秋敏副總" },
        { "date": "7.15", "day": "三", "activity": "聯合早會—招募實戰：從接觸到報聘-家頤協理 (課程到10:30)" },
        { "date": "7.16", "day": "四", "activity": "每月說法-駱冀耕 執行長" },
        { "date": "7.17", "day": "五", "activity": "AI新手村：從認識到應用-張啓洋 總監" },
        { "date": "7.18", "day": "六", "activity": "考場開發日" }
      ],
      "label": "7.13 ~ 7.18 (主持: 啓洋 / 音控: 逸寧)"
    },
    {
      "weekId": "week-4",
      "startDate": "7.20",
      "endDate": "7.25",
      "host": "婉柔",
      "dj": "乙浩",
      "days": [
        { "date": "7.20", "day": "一", "activity": "每週事項佈達 + 定聯+分組盤點" },
        { "date": "7.21", "day": "二", "activity": "組織發展-張啓洋總監" },
        { "date": "7.22", "day": "三", "activity": "聯合早會—中區聯合頒獎 (課程到10:30) [遠傳電信課程後10分鐘]" },
        { "date": "7.23", "day": "四", "activity": "財經學習 + 分組討論" },
        { "date": "7.24", "day": "五", "activity": "複雜稅務簡單行銷-老蕭老師" },
        { "date": "7.25", "day": "六", "activity": "考場開發日" }
      ],
      "label": "7.20 ~ 7.25 (主持: 婉柔 / 音控: 乙浩)"
    },
    {
      "weekId": "week-5",
      "startDate": "7.27",
      "endDate": "7.31",
      "host": "騰駿",
      "dj": "鈞惠",
      "days": [
        { "date": "7.27", "day": "一", "activity": "每週事項佈達 + 定聯+分組盤點" },
        { "date": "7.28", "day": "二", "activity": "第一金人壽-商品優勢與銷售實務 [新人班]" },
        { "date": "7.29", "day": "三", "activity": "聯合早會—競賽背後的事業藍圖-品如副總 (課程到10:30) [新人班]" },
        { "date": "7.30", "day": "四", "activity": "財經學習 + 分組討論" },
        { "date": "7.31", "day": "五", "activity": "截績日" }
      ],
      "label": "7.27 ~ 7.31 (主持: 騰駿 / 音控: 鈞惠)"
    }
  ];
}

// Function to dynamically parse the Excel files
function parseExcelSchedule() {
  const file1 = "/Users/stanley/Downloads/2026寰辰早會課表.xlsx";
  const file2 = "/Users/stanley/Downloads/2026寰辰早會課表-2.xlsx";
  let fileToRead = null;

  // Prioritize reading the uploaded active_schedule.xlsx file!
  if (fs.existsSync(UPLOAD_FILE)) {
    fileToRead = UPLOAD_FILE;
  } else if (fs.existsSync(file1)) {
    fileToRead = file1;
  } else if (fs.existsSync(file2)) {
    fileToRead = file2;
  }

  if (!fileToRead) {
    console.log("No Excel schedule file found. Loading default mock data.");
    return getFallbackSchedule();
  }

  try {
    const workbook = XLSX.readFile(fileToRead);
    
    // Auto-detect the sheet containing schedule data
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
    
    // If not found, use first sheet that isn't the config sheets
    if (!sheetName) {
      sheetName = workbook.SheetNames.find(name => name !== '輪值表' && name !== '主持表' && name !== '音控表') || workbook.SheetNames[0];
    }
    
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      console.log("Could not find a valid schedule sheet in Excel workbook. Loading default mock data.");
      return getFallbackSchedule();
    }

    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    let headerRowIdx = -1;
    for (let i = 0; i < rawRows.length; i++) {
      if (rawRows[i].includes('日期') && rawRows[i].includes('星期')) {
        headerRowIdx = i;
        break;
      }
    }

    if (headerRowIdx === -1) {
      console.log("Could not find header row with '日期' and '星期'. Loading default mock data.");
      return getFallbackSchedule();
    }

    // Try to extract month prefix from the sheet name (e.g. "115.8" -> month "8", "8月份" -> month "8")
    const monthMatch = sheetName.match(/\d+/g);
    let monthPrefix = '7'; // default
    if (monthMatch && monthMatch.length > 0) {
      monthPrefix = monthMatch[monthMatch.length - 1]; // get the last number as the month
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

      // Starts a new week on Monday (一) or if no week exists yet
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

      // Combine activities cleanly
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
    console.error("Error reading/parsing Excel. Using fallback mock data:", err);
    return getFallbackSchedule();
  }
}

// Helper to read DB
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file:', err);
    return { submissions: [] };
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
  
  // Re-parse the uploaded file to ensure it's valid
  try {
    const workbook = XLSX.readFile(UPLOAD_FILE);
    if (workbook.SheetNames.length === 0) {
      throw new Error("Excel file contains no sheets.");
    }
    
    res.json({ success: true, message: '課表上傳成功！已載入全新月份的早會行程。' });
  } catch (err) {
    // If it fails, delete the invalid file
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
