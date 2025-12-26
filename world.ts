import { setWorldConstructor, Before, After, World, IWorldOptions, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(60000);
export interface ICustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  launchBrowser(): Promise<void>; 
  closeBrowser(): Promise<void>;
  takeScreenshot(name: string): Promise<string>;
}

class CustomWorld extends World implements ICustomWorld {

  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  constructor(options: IWorldOptions) {
    // super(options) links this class to Cucumber's internal engine.
    super(options);
  }
  public async launchBrowser(): Promise<void> {
    const isHeadless = process.env.PLAYWRIGHT_HEADLESS === 'true';
    this.browser = await chromium.launch({ 
      headless: isHeadless,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Improved stability for CI
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  public async closeBrowser(): Promise<void> {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }

  public async takeScreenshot(name: string): Promise<string> {
      const screenshotDir = path.join(process.cwd(), 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const filename = `${screenshotDir}/${name}-${timestamp}.png`;
      await this.page.screenshot({ path: filename, fullPage: true });
      return filename;
    }
}

setWorldConstructor(CustomWorld);

Before({ timeout: 30000 }, async function (this: CustomWorld) {
  await this.launchBrowser();
});

After(async function (this: CustomWorld, { result, pickle }) {
  // 1. Handle Failures & Screenshots
  if (result?.status === Status.FAILED) {
    try {
      // Create a filesystem safe name
      const safeName = pickle.name.replace(/\W/g, '_');
      const screenshotPath = await this.takeScreenshot(`failed-${safeName}`);
      const image = fs.readFileSync(screenshotPath);
      // Attach to Cucumber (Allure & HTML Reporter both listen to this)
      this.attach(image, 'image/png'); 
      
      // Optional: Attach the error message text for easier debugging in Allure
      if (result.message) {
        this.attach(`Error Message: ${result.message}`, 'text/plain');
      }
    } catch (error) {
      console.error('Failed to take failure screenshot:', error);
    }
  }

  // 2. Graceful Cleanup
  await this.closeBrowser();
  
  // 3. Optional: Brief pause to ensure filesystem writes the JSON stream
  // This prevents "Empty Chart" syndrome in post-test reporting
  await new Promise(resolve => setTimeout(resolve, 500));
});
