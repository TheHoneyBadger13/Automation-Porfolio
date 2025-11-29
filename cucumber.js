module.exports = {
  default: {
    require: [
      "./stepDefinitions/**/*.js",
      "./world.js"
    ],
    format: ["progress"],
    publishQuiet: true
  }
};
