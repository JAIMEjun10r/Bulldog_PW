import { Page, expect } from "@playwright/test"

export class Utils {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async creatingList(nomeLista: string) {
        await this.page.getByRole('img').nth(1).click()
        await this.page.getByPlaceholder('New list').fill(nomeLista)
        await this.page.getByRole('img').nth(1).click()
        await expect(this.page.locator('body')).toContainText(nomeLista);
    }

    async creatingReminder(reminderName: string) {
        await this.page.getByRole('img').nth(4).click()
        await this.page.getByPlaceholder('New reminder').fill(reminderName)
        const confirmar = this.page.locator('div').filter({ hasText: 'Reminder Lists Aniversário New list Aniversário' }).getByRole('img').nth(3)
        await confirmar.waitFor()
        await confirmar.click()
        await expect(this.page.locator('body')).toContainText(reminderName)
    }

    async checkingExistenceOflist() {
        const maxIterations = 10;

        for (let i = 0; i < maxIterations; i++) {
            const reminderRows = await this.page.$$('.reminder-row');

            // Se houver apenas uma linha de lembrete (ou seja, apenas "New list"), o script vai sair do loop
            if (reminderRows.length === 1) {
                break;
            }

            const imgElement = await reminderRows[0].$('img:nth-child(3)');
            if (imgElement) {
                await imgElement.click();
            }

            //Coloquei uma timeout para esperar (sei que não é o ideal, mas deixei assim por enquanto)
            await this.page.waitForTimeout(1000);
        }
    }

}





