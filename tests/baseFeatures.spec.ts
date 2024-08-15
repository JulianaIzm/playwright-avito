import { test as base } from '@playwright/test';
import { AnnouncementPage, MainPage } from '../framework/pages';
import { SearchResultPage } from '../framework/pages/SearchResultPage';

const test = base.extend<{ mainPage: MainPage, searchResultPage: SearchResultPage }>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
    searchResultPage: async ({ page }, use) => {
        const searchResultPage = new SearchResultPage(page);
        await use(searchResultPage);
    },
});

test.describe('Avito base features check', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', {waitUntil: "commit"});
    });

    test('Search bikes check', async ({ mainPage, searchResultPage, context }) => {
        await test.step('You are on main page, search bikes', async () => {
            const searchData = { brand: 'BMW', model: 'R1200R', year: 2013 , timePeriod: {start: 2010, end: 2014}};

            await mainPage.categoryForAuto.click();
            await mainPage.currentPage.waitForLoadState("domcontentloaded");
            await mainPage.categoryForMoto.click();
            await mainPage.currentPage.waitForLoadState("domcontentloaded");
            await mainPage.searchInput.set(`${searchData.brand} ${searchData.model} ${searchData.year}`);
            await mainPage.searchBtn.click();
            await mainPage.currentPage.waitForLoadState("domcontentloaded");

            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                searchResultPage.clickRandomCard()
            ]);
            const annPage = new AnnouncementPage(newPage);
            await annPage.test(searchData);
        })
    })
});