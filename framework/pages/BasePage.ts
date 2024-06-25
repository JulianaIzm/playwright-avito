import { Page } from '@playwright/test';

export abstract class BasePage {
    constructor(readonly currentPage: Page) {}

    async goto(url: string) {
        await this.currentPage.goto(url, { waitUntil: 'load' });
    }
}