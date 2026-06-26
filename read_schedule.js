const XLSX = require('xlsx');

const file1 = "/Users/stanley/Downloads/2026寰辰早會課表.xlsx";
const file2 = "/Users/stanley/Downloads/2026寰辰早會課表-2.xlsx";

function dumpSchedule(file) {
  console.log(`\n================ File: ${file} ================`);
  const workbook = XLSX.readFile(file);
  const sheet = workbook.Sheets['115.7'];
  const rows = XLSX.utils.sheet_to_json(sheet);
  console.log(`Total JSON rows: ${rows.length}`);
  
  // Let's print the first 25 rows with non-empty properties
  rows.slice(0, 25).forEach((row, i) => {
    console.log(`Row ${i+1}:`, JSON.stringify(row));
  });
}

dumpSchedule(file1);
dumpSchedule(file2);
