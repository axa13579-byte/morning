const XLSX = require('xlsx');

const file = "/Users/stanley/Downloads/2026寰辰早會課表.xlsx";

function parseExcelSchedule(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets['115.7'];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
    // Find the header row (typically has '日期', '星期', etc.)
    let headerRowIdx = -1;
    for (let i = 0; i < rawRows.length; i++) {
      if (rawRows[i].includes('日期') && rawRows[i].includes('星期')) {
        headerRowIdx = i;
        break;
      }
    }
    
    if (headerRowIdx === -1) {
      throw new Error("Could not find header row in Excel sheet '115.7'");
    }
    
    const headers = rawRows[headerRowIdx];
    const dataRows = rawRows.slice(headerRowIdx + 1);
    
    const weeks = [];
    let currentWeek = null;
    
    dataRows.forEach(row => {
      // Skip empty rows or rows that do not have a valid day of the week
      const dateVal = row[0];
      const dayOfWeek = row[1];
      if (!dateVal || !dayOfWeek) return;
      
      const dateStr = String(dateVal).trim();
      const dayStr = String(dayOfWeek).trim();
      
      // If it is Monday (一), start a new week
      if (dayStr === '一' || !currentWeek) {
        if (currentWeek) {
          weeks.push(currentWeek);
        }
        
        // Find host and DJ (they are listed on the Monday row)
        const host = row[2] ? String(row[2]).trim() : '';
        const dj = row[3] ? String(row[3]).trim() : '';
        
        // Get week label, e.g. "6/29 - 7/4"
        // Let's figure out the dates. If it's Monday, it starts a week.
        currentWeek = {
          weekId: `week-${weeks.length + 1}`,
          startDate: dateStr.includes('.') ? dateStr : `7.${dateStr}`,
          endDate: '', // Will be filled by the last day of the week
          host: host,
          dj: dj,
          days: []
        };
      }
      
      // Format the date nicely. If it doesn't contain '.', it's July.
      let formattedDate = dateStr;
      if (!dateStr.includes('.')) {
        formattedDate = `7.${dateStr}`;
      }
      
      // Update week end date as we scan the week
      currentWeek.endDate = formattedDate;
      
      // Combine activities
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
    
    // Add date range labels to weeks
    weeks.forEach(w => {
      w.label = `${w.startDate} ~ ${w.endDate} (主持: ${w.host} / 音控: ${w.dj})`;
    });
    
    return weeks;
  } catch (err) {
    console.error("Error parsing schedule:", err);
    return null;
  }
}

const schedule = parseExcelSchedule(file);
console.log(JSON.stringify(schedule, null, 2));
