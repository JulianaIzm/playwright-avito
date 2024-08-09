import { test as base, expect } from '@playwright/test';
import { MainPage } from '../framework/pages';
import { AnnouncementPage } from '../framework/pages';

const test = base.extend<{ mainPage: MainPage }>({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
});

test.describe('Avito base features check', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', {waitUntil: "commit"});
    });

    test('Search bikes check', async ({ page, mainPage }) => {
        await test.step('You are on main page, search bikes', async () => {
            const searchData = { brand: 'BMW', model: 'R1200R', year: 2013 , timePeriod: {start: 2010, end: 2014}};
            await mainPage.searchInput.set(
                `${searchData.brand} ${searchData.model} ${searchData.year}`,
            );
            await mainPage.searchBtn.click();
            await mainPage.currentPage.waitForLoadState();

            await mainPage.searchResultLinks.initializeCardTitleLinks(page, 'item-title');
            await mainPage.searchResultLinks.clickSearchResultCard(); 
            
            const announcement = new AnnouncementPage(mainPage.currentPage);
            await announcement.test(searchData);
        });
    });
});