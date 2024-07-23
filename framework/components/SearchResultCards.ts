import { Locator, Page, expect } from '@playwright/test';

export class SearchResultCards {
    readonly locator: Locator;
    private cardTitleLinks: Locator[] = [];
    constructor(currentPage: Page, searchString: string) {
        this.locator = currentPage.getByTestId(searchString);
        this.initializeCardTitleLinks(currentPage, 'item-title');
    }

    async initializeCardTitleLinks(currentPage: Page, searchString: string) {
        this.cardTitleLinks = await currentPage.getByTestId(searchString).all();
    }

    async testDefaultState() {
        await expect(this.locator).toBeVisible();
    }

    async clickSignCard() {
        const randomIndices = [];
        while (randomIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * this.cardTitleLinks.length);
            if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
            }
        }

        for (const index of randomIndices) {
            const randomH3 = this.cardTitleLinks[index];
            await randomH3.click();
        }
    }

    async test() {
        await this.testDefaultState();
    }
}