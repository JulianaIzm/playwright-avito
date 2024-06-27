import { Locator, Page } from '@playwright/test';

/**
 * Class for text input elements
 * @param {Page} currentPage - page context
 * @param {string} locatorStr - locator
 */
export class Input {
    readonly locator: Locator; // to be improved
    constructor(readonly currentPage: Page, readonly locatorStr: string) {
        this.locator = currentPage.getByText(locatorStr);
    }

    async clear(): Promise<void> {
        await this.locator.fill('');
    }

    async value(): Promise<string> {
        const inputValue = await this.locator.inputValue();
        return inputValue;
    }

    async set(value: string | number, typeSequently = false): Promise<void> {
        await this.clear();
        if (typeSequently) {
        await this.locator.pressSequentially(String(value), { delay: 100 });
        } else {
        await this.locator.fill(String(value));
        }
    }
}