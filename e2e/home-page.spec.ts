import { expect, test } from '@playwright/test';

test.describe('home-page with HAR', () => {
  test('should create order with dragged ingredients and show modals', async ({
    page,
  }) => {
    const BUN_TEXT = 'Краторная булка N-200i';
    const MAIN_TEXT = 'Хрустящие минеральные кольца';
    const ORDER_NUMBER = 12345;

    // Начинаем запись HAR
    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**/ingredients',
      update: false, // Режим записи
    });

    await page.route('**/auth/user', async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.ru', name: 'Test User' },
        }),
      });
    });

    await page.route('**/orders', async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          name: 'test burger',
          order: { number: ORDER_NUMBER },
        }),
      });
    });

    await page.addInitScript(() => {
      window.localStorage.setItem('accessToken', 'Bearer test-access-token');
      window.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.goto('/');

    // Ждём загрузки данных
    await expect(page.getByText(BUN_TEXT)).toBeVisible();

    await page.getByText(BUN_TEXT).click();
    await expect(page.getByText('Детали ингредиента')).toBeVisible();
    await expect(page.getByRole('heading', { name: BUN_TEXT })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByText('Детали ингредиента')).not.toBeVisible();

    const items = page.locator('.constructor-element');
    await expect(items).toHaveCount(3);

    const bun = page.getByText(BUN_TEXT);
    const main = page.getByText(MAIN_TEXT);
    const container = page.getByTestId('constructor-container');

    await bun.dragTo(container);

    await expect(items.nth(0)).toContainText(BUN_TEXT);
    await expect(items.nth(1)).not.toContainText(BUN_TEXT);
    await expect(items.nth(2)).toContainText(BUN_TEXT);

    await main.dragTo(container);

    await expect(items.nth(0)).toContainText(BUN_TEXT);
    await expect(items.nth(1)).toContainText(MAIN_TEXT);
    await expect(items.nth(2)).toContainText(BUN_TEXT);

    const orderRequest = page.waitForRequest('**/orders');
    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByText(String(ORDER_NUMBER))).toBeVisible();
    await expect(page.getByText('идентификатор заказа')).toBeVisible();
    expect((await orderRequest).postDataJSON()).toEqual({
      ingredients: [
        '692889f16bf770001bfeb4cc',
        '692889f16bf770001bfeb4d6',
        '692889f16bf770001bfeb4cc',
      ],
    });

    await page.getByRole('button', { name: 'Закрыть' }).click();
    await expect(page.getByText(String(ORDER_NUMBER))).not.toBeVisible();
    await expect(
      page.getByText('Перетащи сюда ингредиенты, чтобы собрать бургер!')
    ).toBeVisible();
  });
});
