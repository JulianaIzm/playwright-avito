import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Input } from '../controls/Input';

export class MainPage extends BasePage {
    readonly loginBtn: Locator;
    readonly searchBtn: Locator;
    readonly searchInput: Input;
    readonly categoryForAuto: Locator;
    readonly categoryForMoto: Locator;


    constructor(currentPage: Page) {
        super(currentPage);

        this.loginBtn = this.currentPage
        .getByRole('link')
        .filter({ hasText: 'Вход и регистрация' });

        this.searchBtn = this.currentPage
        .getByRole('button')
        .filter({ hasText: 'Найти' });

        this.searchInput = new Input(this.currentPage, 'search-form/suggest');
        this.categoryForAuto = this.currentPage.getByTestId('visual-rubricator/block-Авто').first();
        this.categoryForMoto = this.currentPage.getByTestId('visual-rubricator/block-Мотоциклы и мототехника').first();
    }
}