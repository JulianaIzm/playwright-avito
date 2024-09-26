import { Page } from '@playwright/test';
import { MainPage } from '.';

export class SearchResultPage extends MainPage {
    constructor(currentPage: Page) {
        super(currentPage);
    }

    async getSearchResults() {
        const searchResults = await this.currentPage.getByTestId('item').all();
        return searchResults;
    }

    async clickRandomCard() {
        const searchResults = await this.getSearchResults();
        const randomIndex = Math.floor(Math.random() * searchResults.length);
        const randomCardTitle = searchResults[randomIndex];
        await randomCardTitle.click();
    }
}