import { test as base, expect } from '@playwright/test';
import { MainPage } from '../framework/pages';
import { SignCard } from '../framework/components';

const test = base.extend<{ mainPage: MainPage, cardPage: SignCard }>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
    cardPage: async ({ page }, use) => {
        const cardPage = new SignCard(page);
        await use(cardPage);
    },
});

test.describe('Avito base features check', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Search bikes check', async ({ page, mainPage, cardPage }) => {
        await test.step('You are on main page, search bikes', async () => {
            const searchData = { type: 'мотоцикл', brand: 'Yamaha', year: 2013 };
            await mainPage.searchInput.set(
                `${searchData.type} ${searchData.brand} ${searchData.year}`,
            );
            await mainPage.searchBtn.click();
            await mainPage.currentPage.waitForLoadState();

            await mainPage.searchResultLinks.initializeCardTitleLinks(page, 'item-title');
            await mainPage.searchResultLinks.clickSignCard();           
            await cardPage.testSignCard(searchData);
        });
    });
});