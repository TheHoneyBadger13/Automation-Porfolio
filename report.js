const reporter = require('multiple-cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

const now = new Date();
const timeZone = 'Asia/Manila'; // Philippine Time

// Manually build the timestamp in "DD Mon YYYY - HH-MM AM/PM" format
// to ensure it's file-system safe (replacing ':' with '-').
const options = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
  timeZone: timeZone
};
const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
const dateParts = parts.reduce((acc, part) => {
  acc[part.type] = part.value;
  return acc;
}, {});
// e.g., "16 Dec 2025 - 05-40-PM"
const timestamp = `${dateParts.day} ${dateParts.month} ${dateParts.year} - ${dateParts.hour}-${dateParts.minute}-${dateParts.dayPeriod}`;
const reportPath = path.join('reports', 'html', timestamp);
const reportFilename = `${timestamp}.html`;

// Generate a more readable report title for inside the HTML report
const reportTitle = `Test Report - ${now.toLocaleString('en-US', { timeZone: timeZone, dateStyle: 'full', timeStyle: 'long' })}`;

reporter.generate({
  jsonDir: 'reports',          // folder with cucumber-report.json
  reportPath: reportPath,      // output folder with timestamped name
  reportName: reportTitle,     // Sets the title inside the report
  displayDuration: true,
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '11'
    }
  }
});

// Rename the generated index.html to match the folder name
const oldPath = path.join(reportPath, 'index.html');
const newPath = path.join(reportPath, reportFilename);

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.error(`Error renaming report file: ${err}`);
    return;
  }
  console.log(`Report successfully generated and renamed to: ${newPath}`);
});