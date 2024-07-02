import { test as base, expect } from '@playwright/test';
import { MainPage } from '../framework/pages';

const test = base.extend<{ mainPage: MainPage }>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
});

test.describe('Avito base features check', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Search bikes check', async ({ page, mainPage }) => {
        await test.step('You are on main page, search bikes', async () => {
        await mainPage.searchInput.set('мото')
        await mainPage.searchBtn.click();
        
        await mainPage.searchResults.testSignTitle(await mainPage.searchInput.value());
        });
    });
});