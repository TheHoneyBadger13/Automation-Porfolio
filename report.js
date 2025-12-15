const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports',          // folder with cucumber-report.json
  reportPath: 'reports/html',  // output folder for HTML report
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