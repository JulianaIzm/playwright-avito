import { test, expect, Locator } from '@playwright/test';

test.describe('Avito', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('https://www.avito.ru/');
  })
  /* Проверка доступности страницы:
  - Шаги:
    1. Открыть браузер.
    2. Ввести URL: https://www.avito.ru/.
  - Ожидаемый результат: 
    - Страница успешно загружается без ошибок.*/

  test('loads successfully', async ({ page }) => {
        //Ensures the page is navigated to the given URL.
    await expect(page).toHaveURL('https://www.avito.ru/');
  });

  test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Авито: недвижимость, транспорт, работа, услуги, вещи");
  });

  /* Проверка наличия логотипа Avito:
  - Шаги:
  1. Открыть главную страницу Avito.
  - Ожидаемый результат: 
  - На странице присутствует логотип Avito в верхней части страницы.*/

  test('logo is visible', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Авито — сайт объявлений' })).toBeVisible();
  });

  /* Проверка видимости поля поиска:
  - Шаги:
  1. Открыть главную страницу Avito.
  - Ожидаемый результат: 
  - Поле поиска видимо и доступно для ввода.*/
  test('search input is visible', async ({ page }) => {
        await expect(page.locator('label').first()).toBeVisible();
  });

  /* Проверка аутентификации при нажатии на кнопку "Подать объявление":
  - Шаги:
  1. Открыть главную страницу Avito.
  2. Нажать на кнопку "Подать объявление".
  - Ожидаемый результат: 
  - Пользователь перенаправляется на страницу для размещения объявления.*/
  test('authentication dialog is visible', async ({ page }) => {
      await page.locator('div').filter({ hasText: /^Разместить объявление$/ }).getByRole('link', { }).click();

      await expect(page).toHaveURL('https://www.avito.ru/#login?next=%2Fadditem&authsrc=ca');
      await expect(page.getByRole('dialog')).toBeVisible();
  });


  /* Проверка наличия разделов категорий:
  - Шаги:
  1. Открыть главную страницу Avito.
  - Ожидаемый результат: 
  - На странице присутствуют разделы с категориями товаров и услуг.*/

  test('has categories', async ({ page }) => {
      await expect(page.getByText('АвтоНедвижи- мостьРаботаОдежда, обувь, аксессуарыХобби и отдыхЖивотныеГотовый би').first()).toBeVisible();
  });


  /* Проверка возможности входа в аккаунт пользователя:
  - Шаги:
  1. Открыть главную страницу Avito.
  2. Нажать на ссылку "Вход и регистрация".
  - Ожидаемый результат: 
  - Пользователь перенаправляется на страницу входа в аккаунт.*/

  test('redirects to login page', async ({ page }) => {
    await page.getByText('Вход и регистрация').click();

    await expect(page).toHaveURL('https://www.avito.ru/#login?authsrc=h');
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  /*  сценарий поиска на Авито мотоцикла BMW R1200R от 2010 до 2014 года, 
  и проверку результатов (что релевантны) */
  test('finds bike BMW R1200R 2010-2014', async ({ page }) => {
    test.setTimeout(120000);
    
    // Установка фильтров для поиска
    await page.locator('input[data-marker="search-form/suggest"]').fill("Мотоцикл BMW R1200R");
    await page.locator('button[data-marker="search-form/submit-button"]').click();
    await page.locator('a[data-category-id="14"]').click();
    await page.locator('a[data-category-id="14"]').click();
    await page.locator('input[data-marker="params[122967]/from/input"]').fill("2010");
    await page.locator('input[data-marker="params[122967]/to/input"]').fill("2014");
    await page.locator('button[data-marker="search-filters/submit-button"]').click();

    const elements = await page.$$('div.index-root-KVurS');

    //trying to loop through elements 
    for (let element of elements) {

      await element.click();
      const year = await page.getByText('Год выпуска:').textContent();
      await expect(page.locator('h1[data-marker="item-view/title-info"]')).toContainText('BMW R1200R');
      await expect(parseInt(year)).toBeGreaterThanOrEqual(2010);
      await expect(parseInt(year)).toBeLessThanOrEqual(2014);
    }

  });
})
