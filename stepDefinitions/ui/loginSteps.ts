import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/LoginPage';
import { ICustomWorld } from '../../world'; // Adjust this path to your world.ts

Given('the user navigates to the SauceDemo login page', async function (this: ICustomWorld): Promise<void> {
  await this.page.goto('https://www.saucedemo.com/');
});

Then('the login page URL should be correct', async function (this: ICustomWorld):Promise<void> {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/');
});

When('the user logs in with username {string} and password {string}', async function (this: ICustomWorld,username: string, password: string): Promise<void> {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

When('the user logs in with incorrect username {string} and password {string}', async function (this: ICustomWorld, username: string, password: string): Promise<void> {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

Then('the user is redirected to the inventory page', async function (this: ICustomWorld):Promise<void> {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  const inventoryList = this.page.locator('.inventory_list');
  await expect(inventoryList).toBeVisible();
  const screenshot = await this.page.screenshot();
  await this.attach(screenshot, 'image/png');
});

