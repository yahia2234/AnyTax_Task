import { Page, Locator } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) { }

    getItemName(): Locator {
        return this.page.locator('.inventory_item_name');
    }

    getItemPrice(): Locator {
        return this.page.locator('.inventory_item_price');
    }
}
