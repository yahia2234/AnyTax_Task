import { test, expect } from '@playwright/test';

test.describe('Task 1: API Automation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com');
        await page.setContent(`
            <button id="transfer">Transfer</button>
            <div id="result"></div>
            <script>
                document.getElementById('transfer').onclick = async () => {
                    try {
                        const res = await fetch('/api/transfer', { method: 'POST' });
                        const data = await res.json();
                        document.getElementById('result').innerText = data.status || data.error;
                        console.log('Transfer result:', data);
                    } catch (e) {
                        document.getElementById('result').innerText = 'Error: ' + e.message;
                    }
                };
            </script>
        `);
    });

    test('Test A: Success Mocking', async ({ page }) => {
        await page.route('**/api/transfer', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ status: 'success', transactionId: '12345' }),
            });
        });

        await page.click('#transfer');
        await expect(page.locator('#result')).toHaveText('success');
    });

    test('Test B: Failure Mocking', async ({ page }) => {
        await page.route('**/api/transfer', async (route) => {
            await route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Insufficient funds' }),
            });
        });

        await page.click('#transfer');
        await expect(page.locator('#result')).toHaveText('Insufficient funds');
    });
});
