import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Task 2: E2E UI Flow (Public Demo Site)', () => {
    test('Complete purchase flow and verify price format', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        // 1. Login with standard_user
        await loginPage.goto();
        await loginPage.login('standard_user');

        // 2. Add a product to the cart
        await productsPage.addFirstProductToCart();

        // 3. Go to the Cart and verify the item is there
        await productsPage.goToCart();
        await expect(cartPage.getItemName().first()).toBeVisible();

        // 4. Fintech Twist: Verify that the price is a valid number format (e.g., contains a $ and decimals)
        const priceText = await cartPage.getItemPrice().first().innerText();

        // Regex explanation: 
        // ^\$ starting with $
        // \d+ one or more digits
        // \.\d{2} followed by a dot and exactly two digits (standard currency format)
        expect(priceText).toMatch(/^\$\d+\.\d{2}$/);

        // Also verify it's a valid number after stripping the $
        const priceValue = parseFloat(priceText.replace('$', ''));
        expect(isNaN(priceValue)).toBe(false);
    });
});
