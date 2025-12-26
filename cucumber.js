module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      "./stepDefinitions/**/*.ts",
      "./world.ts"
    ],
    format: [
      "progress",                       // Shows progress in terminal
      "summary",                            // Shows summary at the end
      "html:reports/cucumber-report.html",  // HTML report
      "allure-cucumberjs/reporter"               // Allure report
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: [
      './features/**/*.feature'
    ],
    publishQuiet: true,
    strict: true,
  }
};