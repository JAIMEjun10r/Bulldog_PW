import { test as setup, expect } from '@playwright/test'

const authFile = '.auth/user.json'

setup('Login', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Enter username').fill('pythonista');
    await page.getByPlaceholder('Enter password').fill('I<3testing');
    await page.getByTestId('login-button').click()
    await expect(page.locator('#logout-form')).toBeVisible()
    await page.context().storageState({ path: authFile})
});