const XLSX = require('xlsx');

const file1 = "/Users/stanley/Downloads/2026寰辰早會課表.xlsx";
const workbook = XLSX.readFile(file1);
const sheet = workbook.Sheets['115.7'];
const rows = XLSX.utils.sheet_to_json(sheet);
console.log(`Printing remaining rows 25 to 30:`);
rows.slice(24, 30).forEach((row, i) => {
  console.log(`Row ${i+25}:`, JSON.stringify(row));
});
