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
            const searchData = { type: 'мотоцикл', brand: 'Yamaha', model: 'Stryker' };
            await mainPage.searchInput.set(
                `${searchData.type} ${searchData.brand} ${searchData.model}`,
            );
            await mainPage.searchBtn.click();
            await mainPage.currentPage.waitForLoadState();

            const elementLocator = mainPage.searchResultCards.title;

            await elementLocator.waitForElementState('visible');
            await mainPage.currentPage.locator('item-view/title-info').waitForElementState('visible');
            await mainPage.searchResultCards.openSignCard()            
            await mainPage.searchResultCards.testSignCard(await mainPage.searchInput.value());
        });
    });
});