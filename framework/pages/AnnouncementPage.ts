import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AnnouncementPage extends BasePage{
    readonly brand: Locator;
    readonly model: Locator;
    readonly year: Locator;

    constructor(currentPage: Page) {
        super(currentPage);
        this.brand = currentPage.getByTestId('item-view/item-params').locator('ul > li').filter({ hasText: 'Марка' });
        this.model = currentPage.getByTestId('item-view/item-params').locator('ul > li').filter({ hasText: 'Модель' });
        this.year = currentPage.getByTestId('item-view/item-params').locator('ul > li').filter({ hasText: 'Год выпуска' });
    }

    async test(searchData) {
        const [brandText, modelText, yearText] = await Promise.all([
            this.brand.textContent(),
            this.model.textContent(),
            this.year.textContent(),
        ]);

        const brand = brandText?.match(/(?<=Марка:\s*)\w+/)?.[0];
        const model = modelText?.match(/(?<=Модель:\s*)\w+(?:\s+\w+)*/)?.[0]?.replace(/\s/g, '');
        const yearMatch = yearText?.match(/(?<=Год выпуска:\s*)\d+/);
        const year = yearMatch ? parseInt(yearMatch[0]) : null;
        
        expect(brand).toBe(searchData.brand);
        expect(model).toBe(searchData.model);
        expect(year).toBeGreaterThanOrEqual(searchData.timePeriod.start);
        expect(year).toBeLessThan(searchData.timePeriod.end);
    }
}