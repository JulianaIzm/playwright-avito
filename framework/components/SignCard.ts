import { Locator, Page, expect } from '@playwright/test';

export class SignCard {
    readonly locator: Locator; // to be improved
    constructor(readonly currentPage: Page, readonly searchStr: string) {
        this.locator = currentPage.getByTestId(searchStr);;
    }

    async testDefaultState() {
        await expect(this.locator).toBeVisible();
    }

    async testSignTitle(text: string) {
        const searchResults = this.locator;
        const searchResultTitles = await searchResults.allTextContents();
        const wordRegex = new RegExp(`${text}`);
            
        for (const title of searchResultTitles) {
            expect(title).toMatch(wordRegex);
        }
    }

    async test() {
        await this.testDefaultState();
    }
}