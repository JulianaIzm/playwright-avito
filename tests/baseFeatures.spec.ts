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
        await mainPage.searchInput.set('Мотоциклы')
        await mainPage.searchBtn.click();
        
        await expect(page.locator('xpath=//h1')).toBeVisible();
        });

        await test.step('Check if only Motorcycles in search result', async () => {
            // Assuming there's a title or class on the search results
            const searchResults = page.locator('xpath=//h1');
            await expect(searchResults).toBeVisible();
            const searchResultTitles = await searchResults.allTextContents();
            
            for (const title of searchResultTitles) {
                // Ensure every title contains "Мотоцикл"
                expect(title).toContain('Мотоцикл');
            }
        });
    });
});