import { Page } from '@playwright/test';

export abstract class BasePage {
    constructor(readonly currentPage: Page) {}

    async goto(url: string) {
        await this.currentPage.goto(url, { waitUntil: 'load' });
    }

    async navigateBack() {
        await this.currentPage.goBack();
        }

    async navigateForward() {
        await this.currentPage.goForward();
    }

    async clear(selector) {
        await this.currentPage.fill(selector, '');
    }

    async getText(selector) {
        return await this.currentPage.$eval(selector, el => el.textContent);
    }

    async getAttribute(selector, attribute) {
        return await this.currentPage.$eval(selector, el => el.getAttribute(attribute));
    }

    async waitForElementVisible(selector, options = {}) {
        await this.currentPage.waitForSelector(selector, options);
    }

    async waitForElementHidden(selector, options = {}) {
        await this.currentPage.waitForSelector(selector, options);
    }
}