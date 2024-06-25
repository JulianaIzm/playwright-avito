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

    test('Registration check', async ({ page, mainPage }) => {
        const registrationPage = new RegistrationPage(page);
        await test.step('You are on main page, click on "Sign Up"', async () => {
        await mainPage.signUpBtn.click();
        // registration form is visible
        await registrationPage.testDefaultState();
        });

        const email = `${Date.now()}@test.com`;
        await test.step('Fill required fields', async () => {
        await registrationPage.nameInput.set(`Test${Date.now()}`);
        await registrationPage.emailInput.set(email);
        const pass = `Test$${Date.now()}`;
        await registrationPage.passwordInput.set(pass);
        await registrationPage.repeatPassInput.set(pass);
        await registrationPage.agreementCheckbox.click();
        });

        await test.step('Initialize verification', async () => {
        await registrationPage.signUpBtn.click();
        await expect(page.locator('h1')).toHaveText('Verify your email');
        await expect(
            page.getByRole('link').filter({ hasText: email })
        ).toBeVisible();
        await expect(page).toHaveURL(/verify\/info/);
        });
    });

    test('"Try it for free" check', async ({ page, mainPage }) => {
        const registrationPage = new RegistrationPage(page);
        await mainPage.tryForFreeBtn.click();
        await registrationPage.testDefaultState();
    });

    test('Privacy policy check', async ({ page, mainPage }) => {
        await test.step('Test on main page', async () => {
        await mainPage.openPrivacyPolicy();
        await mainPage.privacyPolicyModal.test();
        await mainPage.privacyPolicyModal.confirm();
        });

        await test.step('Test on registration page', async () => {
        await mainPage.goto('signup');
        const registrationPage = new RegistrationPage(page);
        await registrationPage.openPrivacyPolicy();
        await registrationPage.privacyPolicyModal.test();
        });
    });
});