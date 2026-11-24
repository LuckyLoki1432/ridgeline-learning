import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const widths = [320, 390, 768, 1200, 1440];

test('all required sections render and internal navigation works', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /build skills/i })).toBeVisible();
  await expect(page.locator('#benefits')).toBeVisible();
  await expect(page.locator('#programs')).toBeVisible();
  await expect(page.locator('#register')).toBeVisible();
  await expect(page.locator('#faq')).toBeVisible();
  await page.getByRole('link', { name: 'Programs', exact: true }).first().click();
  await expect(page).toHaveURL(/#programs$/);
  expect(pageErrors).toEqual([]);
});

for (const width of widths) {
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });
}

test('mobile menu supports keyboard dismissal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: /open menu/i });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('registration reports invalid fields and confirms locally when valid', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /send enquiry/i }).click();
  await expect(page.getByText(/enter a name between 2 and 80 characters/i)).toBeVisible();
  await page.getByLabel('Full name').fill('Alex Learner');
  await page.getByLabel('Email address').fill('alex@example.com');
  await page.getByLabel('Program interest').selectOption('Foundations of Digital Work');
  await page.getByLabel(/agree to be contacted/i).check();
  await page.getByRole('button', { name: /send enquiry/i }).click();
  await expect(page.getByRole('status')).toContainText(/no message has been sent/i);
});

test('page has no automatically detectable WCAG 2.1 AA violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
});
