import { Locator, Page } from '@playwright/test';
export class InventoryPage {
  private readonly page: Page;
  private readonly inventoryItems: Locator;
  constructor(page: Page) {
    this.page = page; 
    this.inventoryItems = page.locator('.inventory_list .inventory_item');
  }

  async addAllItemsToCart(onItemAdded?: (index: number, screenshot: Buffer) => Promise<void> | void): Promise<void> {

    // 1. Wait for the first item to ensure the list has loaded
    await this.inventoryItems.first().waitFor({ state: 'visible' });

    // 2. Get the total count of items
    const itemCount: number = await this.inventoryItems.count();
    console.log(`Number of items found: ${itemCount}`);

    // 3. Loop through each item by index and click its specific button
    for (let i = 0; i < itemCount; i++) {
      // Scope the locator to the specific item at index 'i'
      const itemButton = this.inventoryItems.nth(i).locator('.btn_inventory');
      await itemButton.click();
      // Take a screenshot and attach it to the Playwright Report
      if (onItemAdded) {
        const screenshot = await this.page.screenshot();
        await onItemAdded(i, screenshot);
      }
      console.log(`Clicked "Add to Cart" for item at index ${i+1}`);
    }
  }

}
