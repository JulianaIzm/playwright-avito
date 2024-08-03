import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AnnouncementPage extends BasePage{
    readonly locator: Locator;
    readonly title: Locator;
    readonly model: Locator;
    readonly year: Locator;

    constructor(currentPage: Page, container?: Locator) {
        super(currentPage);
        this.locator = container? container :  currentPage.locator('[class = "js-item-view-title-info"]');
        this.title = currentPage.getByTestId('item-view/title-info');
        this.model = currentPage.getByTestId('item-view/item-params').locator('ul > li > span').filter({ hasText: 'Марка' });
        this.year = currentPage.getByTestId('item-view/item-params').locator('ul > li > span').filter({ hasText: 'Год выпуска' });
    }

    async testDefaultState() {
        await expect(this.locator).toBeVisible();
    }

    async test(searchData) {
        await this.title.isVisible();
        await this.model.isVisible();
        await this.year.isVisible();
        
        expect(await this.title.textContent()).toBe(searchData.type);
        expect(await this.model.textContent()).toBe(searchData.brand);
        //expect(yearText).toBeGreaterThanOrEqual(2010);
        //expect(yearText).toBeLessThan(2015);
    }
}