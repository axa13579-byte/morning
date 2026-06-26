const XLSX = require('xlsx');

const file1 = "/Users/stanley/Downloads/2026寰辰早會課表.xlsx";
const workbook = XLSX.readFile(file1);

['主持表', '音控表'].forEach(sheetName => {
  console.log(`\n================ Sheet: ${sheetName} ================`);
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  let validRowsCount = 0;
  rows.forEach((row, i) => {
    // Filter out rows that are entirely empty or just have empty strings
    const hasData = row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== '');
    if (hasData) {
      validRowsCount++;
      if (validRowsCount <= 30) {
        console.log(`Row ${i + 1}:`, row);
      }
    }
  });
  console.log(`Total valid rows with content: ${validRowsCount}`);
});
