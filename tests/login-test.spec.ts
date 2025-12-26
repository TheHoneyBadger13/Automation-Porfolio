// @ts-check
import { test, expect, Page } from '@playwright/test';
import {LoginPage} from '../pageObjects/LoginPage';

test('SauceDemo login test', async ({ page }):Promise<void> => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');
  // Expect a title "to contain" a substring.
  await expect (page).toHaveURL('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'standard_user');
});
