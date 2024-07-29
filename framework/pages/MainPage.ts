import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Input } from '../controls/Input';
import { SearchResultCards, SignCard } from '../components';

export class MainPage extends BasePage {
    readonly loginBtn: Locator;
    readonly searchBtn: Locator;
    readonly searchInput: Input;
    readonly searchResultLinks: SearchResultCards;
    readonly signCard: SignCard;

    constructor(currentPage: Page) {
        super(currentPage);

        this.loginBtn = this.currentPage
        .getByRole('link')
        .filter({ hasText: 'Вход и регистрация' });

        this.searchBtn = this.currentPage
        .getByRole('button')
        .filter({ hasText: 'Найти' });

        this.searchInput = new Input(this.currentPage, 'search-form/suggest');
        //this.searchResultLinks = new SearchResultCards(this.currentPage, 'item-title');
        this.signCard = new SignCard(this.currentPage);
    }
}