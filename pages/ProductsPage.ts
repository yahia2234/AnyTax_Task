import { Page } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) { }

    async addFirstProductToCart() {
        await this.page.click('.inventory_item:first-child button');
    }

    async goToCart() {
        await this.page.click('.shopping_cart_link');
    }
}
