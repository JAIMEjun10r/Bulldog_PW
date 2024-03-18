import { test, expect } from '@playwright/test';
import { Utils } from '../utils/helper';

let utils: Utils
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  utils = new Utils(page)
  await utils.checkingExistenceOflist()
  
});

test('Creating List', async ({ page }) => {
  
  await utils.creatingList('Aniversário')

});

test('Creating a reminder', async ({ page }) => {
  await utils.creatingList('Aniversário')
  await utils.creatingReminder('Convidados')

});

test('Creating and deleting a list', async ({ page }) => {
  await utils.creatingList('Filha');
});
