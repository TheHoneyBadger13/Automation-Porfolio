const { setWorldConstructor, Before, After, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

class CustomWorld extends World {
  async launchBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.launchBrowser();
});

After(async function () {
  await this.closeBrowser();
});
