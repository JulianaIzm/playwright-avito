import { Locator, Page, expect } from '@playwright/test';

export class SearchResultCard {
    readonly locator: Locator;
    readonly title: Locator;
    readonly model: Locator;
    readonly year: Locator;
    constructor(currentPage: Page, container?: Locator) {
    this.locator = container? container :  currentPage.getByTestId('item-title');
    this.title = this.locator.getByTestId('item-view/title-info');
    this.model = this.locator.getByTestId('item-view/item-params').filter({ hasText: 'Марка' });
    this.year = this.locator.getByTestId('item-view/item-params').filter({ hasText: 'Год выпуска' });
    }

    async openSignCard() {
        await this.title.click();
        expect(this.model).toBeVisible();
        expect(this.year).toBeVisible();
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

    async test() {
        await this.testDefaultState();
    }
}