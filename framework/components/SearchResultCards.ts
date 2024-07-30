import { Locator, Page, expect } from '@playwright/test';

export class SearchResultCards {
    readonly locator: Locator;
    private cardTitleLinks: Locator[] = [];
    constructor(currentPage: Page, searchString: string) {
        this.locator = currentPage.getByTestId(searchString);
    }

    async initializeCardTitleLinks(currentPage: Page, searchString: string) {
        if (this.cardTitleLinks.length === 0) {
            this.cardTitleLinks = await currentPage.getByTestId('item-title').all();
        }
        this.cardTitleLinks = await currentPage.getByTestId(searchString).all();
    }

    async testDefaultState() {
        await expect(this.locator).toBeVisible();
    }

    async clickSignCard() {
        const randomIndex = Math.floor(Math.random() * this.cardTitleLinks.length);
        const randomCardTitle = this.cardTitleLinks[randomIndex];
        await randomCardTitle.click();
    }

    async test() {
        await this.testDefaultState();
    }
}