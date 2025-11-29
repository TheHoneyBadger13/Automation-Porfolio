const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../../pageObjects/LoginPage');

let loginPage;

Given('the user navigates to the SauceDemo login page', async function () {
  loginPage = new LoginPage(this.page);
  await this.page.goto('https://www.saucedemo.com/');
});

Then('the login page URL should be correct', async function () {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/');
});

When('the user logs in with username {string} and password {string}', async function (username, password) {
  await loginPage.login(username, password);
});

When('the user logs in with incorrect username {string} and password {string}', async function (username, password) {
  await loginPage.login(username, password);
});

Then('the user is redirected to the inventory page', async function () {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});