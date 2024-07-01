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
        await expect(this.locator).toContainText(text);
    }

    async test() {
        await this.testDefaultState();
    }
}