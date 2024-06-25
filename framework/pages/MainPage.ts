import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MainPage extends BasePage {
    readonly loginBtn: Locator;
    readonly signUpBtn: Locator;

    constructor(currentPage: Page) {
        super(currentPage);

        this.loginBtn = this.currentPage
        .getByRole('link')
        .filter({ hasText: 'Log In' });

        this.signUpBtn = this.currentPage
        .getByRole('link')
        .filter({ hasText: 'Sign Up' });
    }

//   async openTermsModal() {
//     await this.termsLink.click();
//     expect(this.termsModal.locator).toBeVisible();
//   }

//   async openPrivacyPolicy() {
//     await this.privacyPolicyLink.click();
//     expect(this.privacyPolicyModal.locator).toBeVisible();
//   }
}