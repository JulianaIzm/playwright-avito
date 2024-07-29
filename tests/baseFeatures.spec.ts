import { test as base, expect } from '@playwright/test';
import { MainPage } from '../framework/pages';
import { SearchResultCards } from '../framework/components';

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
            const searchData = { type: 'мотоцикл', brand: 'Yamaha', year: 2013 };
            await mainPage.searchInput.set(
                `${searchData.type} ${searchData.brand} ${searchData.year}`,
            );
            await mainPage.searchBtn.click();
            await mainPage.currentPage.waitForLoadState();

            await mainPage.searchResultLinks.initializeCardTitleLinks(page, 'item-title');
            await mainPage.searchResultLinks.clickSignCard();           
            await mainPage.signCard.testSignCard(searchData);
        });
    });
});