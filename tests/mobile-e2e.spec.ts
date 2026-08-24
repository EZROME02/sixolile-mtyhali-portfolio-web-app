import { test, expect } from '@playwright/test';

test('EZROME mobile smoke flow', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('body')).not.toContainText('Internal Server Error');
  await page.screenshot({ path: 'mobile-e2e.png', fullPage: true });
  await context.close();
});
