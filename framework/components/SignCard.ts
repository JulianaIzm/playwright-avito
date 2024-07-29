import { Locator, Page, expect } from '@playwright/test';

export class SignCard {
    readonly locator: Locator;
    readonly title: Locator;
    readonly model: Locator;
    readonly year: Locator;

    constructor(currentPage: Page, container?: Locator) {
        this.locator = container? container :  currentPage.getByTestId('styles-module-theme-rOnN1');
        this.title = currentPage.getByTestId('item-view/title-info');
        this.model = currentPage.getByTestId('item-view/item-params').filter({ hasText: 'Марка' });
        this.year = currentPage.getByTestId('item-view/item-params').filter({ hasText: 'Год выпуска' });
    }

    async testDefaultState() {
        await expect(this.locator).toBeVisible();
    }

    async testSignCard(searchData) {
        const titleText = await this.title.textContent();
        const modelText = await this.model.textContent();
        const yearText = await this.year.textContent();
        expect(titleText).toBe(searchData.type);
        expect(modelText).toBe(searchData.brand);
        expect(yearText).toBeGreaterThanOrEqual(2010);
        expect(yearText).toBeLessThan(2015);
    }
}