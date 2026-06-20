import { expect, test } from '@playwright/test';

test.describe('home-page with HAR', () => {
  test('should create order with dragged ingredients and show modals', async ({
    page,
  }) => {
    const BUN_TEXT = 'Краторная булка N-200i';
    const MAIN_TEXT = 'Хрустящие минеральные кольца';
    const ORDER_NUMBER = 12345;

    await page.routeFromHAR('./e2e/hars/ingredients.har', {
      url: '**/api/**',
      update: false,
    });

    await page.addInitScript(() => {
      window.localStorage.setItem('accessToken', 'Bearer test-access-token');
      window.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await page.goto('/');

    const bunIngredient = page.getByText(BUN_TEXT).first();
    const mainIngredient = page.getByText(MAIN_TEXT);
    const constructorItems = page.locator('.constructor-element');
    const constructorContainer = page.getByTestId('constructor-container');
    const modalRoot = page.locator('#modal');
    const modalCloseButton = page.getByRole('button', { name: 'Закрыть' });
    const ingredientDetailsTitle = modalRoot.getByText('Детали ингредиента');
    const orderButton = page.getByRole('button', { name: 'Оформить заказ' });
    const orderNumber = modalRoot.getByText(String(ORDER_NUMBER));
    const emptyConstructorText = page.getByText(
      'Перетащи сюда ингредиенты, чтобы собрать бургер!'
    );

    await expect(bunIngredient).toBeVisible();

    await bunIngredient.click();
    await expect(ingredientDetailsTitle).toBeVisible();
    await expect(modalRoot.getByRole('heading', { name: BUN_TEXT })).toBeVisible();
    await expect(modalRoot.getByText('Калории,ккал')).toBeVisible();
    await expect(modalRoot.getByText('420')).toBeVisible();
    await expect(modalRoot.getByText('Белки, г')).toBeVisible();
    await expect(modalRoot.getByText('80')).toBeVisible();
    await expect(modalRoot.getByText('Жиры, г')).toBeVisible();
    await expect(modalRoot.getByText('24')).toBeVisible();
    await expect(modalRoot.getByText('Углеводы, г')).toBeVisible();
    await expect(modalRoot.getByText('53')).toBeVisible();

    await modalCloseButton.click();
    await expect(ingredientDetailsTitle).not.toBeVisible();

    await expect(constructorItems).toHaveCount(3);

    await bunIngredient.dragTo(constructorContainer);

    await expect(constructorItems.nth(0)).toContainText(BUN_TEXT);
    await expect(constructorItems.nth(1)).not.toContainText(BUN_TEXT);
    await expect(constructorItems.nth(2)).toContainText(BUN_TEXT);

    await mainIngredient.dragTo(constructorContainer);

    await expect(constructorItems.nth(0)).toContainText(BUN_TEXT);
    await expect(constructorItems.nth(1)).toContainText(MAIN_TEXT);
    await expect(constructorItems.nth(2)).toContainText(BUN_TEXT);

    const orderRequest = page.waitForRequest('**/orders');
    await orderButton.click();

    await expect(orderNumber).toBeVisible();
    await expect(modalRoot.getByText('идентификатор заказа')).toBeVisible();
    expect((await orderRequest).postDataJSON()).toEqual({
      ingredients: [
        '692889f16bf770001bfeb4cc',
        '692889f16bf770001bfeb4d6',
        '692889f16bf770001bfeb4cc',
      ],
    });

    await modalCloseButton.click();
    await expect(orderNumber).not.toBeVisible();
    await expect(emptyConstructorText).toBeVisible();
  });
});
