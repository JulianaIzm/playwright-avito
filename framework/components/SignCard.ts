import { Locator, Page, expect } from '@playwright/test';

export class SignCard {
    readonly locator: Locator;
    readonly title: Locator;
    readonly model: Locator;
    readonly year: Locator;

    constructor(currentPage: Page, container?: Locator) {
        this.locator = container? container :  currentPage.getByTestId('styles-module-theme-rOnN1');
        this.title = this.locator.getByTestId('item-view/title-info');
        this.model = this.locator.getByTestId('item-view/item-params').filter({ hasText: 'Марка' });
        this.year = this.locator.getByTestId('item-view/item-params').filter({ hasText: 'Год выпуска' });
    }

    async testDefaultState() {
        await expect(this.locator).toBeVisible();
    }

    async testSignCard(text: string) {
        const searchResults = this.locator;
        const searchResultsData = await searchResults.allTextContents();
        const wordRegex = new RegExp(`${text}`);
            
        for (const result of searchResultsData) {
            expect(result).toMatch(wordRegex);
        }
    }
}