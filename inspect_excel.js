const XLSX = require('xlsx');
const path = require('path');

const files = [
  "/Users/stanley/Downloads/2026寰辰早會課表.xlsx",
  "/Users/stanley/Downloads/2026寰辰早會課表-2.xlsx"
];

files.forEach(file => {
  console.log(`\n================ Inspecting File: ${file} ================`);
  try {
    const workbook = XLSX.readFile(file);
    console.log("Sheets in workbook:", workbook.SheetNames);
    
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      // Convert to JSON
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(`\nSheet "${sheetName}" - Row Count: ${data.length}`);
      // Print first 10 rows
      console.log("First 10 rows:");
      data.slice(0, 10).forEach((row, i) => {
        console.log(`Row ${i + 1}:`, row);
      });
    });
  } catch (err) {
    console.error("Error reading file:", err);
  }
});
