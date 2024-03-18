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
        // await this.page.locator('div')
        //     .filter({ hasText: 'Reminder Lists Filha New list Filha' })
        //     .getByRole('img')
        //     .nth(3)
        //     .click()
        const confirmar = this.page.locator('div').filter({ hasText: 'Reminder Lists Aniversário New list Aniversário' }).getByRole('img').nth(3)
        await confirmar.waitFor()
        await confirmar.click()
        await expect(this.page.locator('body')).toContainText(reminderName)
    }

    async checkingExistenceOflist() {
        const maxIterations = 10;

        for (let i = 0; i < maxIterations; i++) {
            // Obtenha todos os elementos da linha de lembrete
            const reminderRows = await this.page.$$('.reminder-row');

            // Se houver apenas uma linha de lembrete (ou seja, apenas "New list"), saia do loop
            if (reminderRows.length === 1) {
                break;
            }

            // Caso contrário, clique na terceira imagem da primeira linha de lembrete
            const imgElement = await reminderRows[0].$('img:nth-child(3)');
            if (imgElement) {
                await imgElement.click();
            }

            // Aguarde um pouco para a página atualizar
            await this.page.waitForTimeout(1000);
        }
    }

}





