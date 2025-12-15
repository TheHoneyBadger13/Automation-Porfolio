module.exports = {
  default: {
    require: [
      "./stepDefinitions/**/*.js",
      "./world.js"
    ],
    format: [
      "json:reports/cucumber-report.json"   // generate JSON with attachments
    ],
    publishQuiet: true
  }
};
