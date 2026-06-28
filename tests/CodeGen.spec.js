import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').fill('Saif');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('Saif@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456789');
  await page.locator('form div').filter({ hasText: 'Check me out if you Love' }).check();
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByRole('radio', { name: 'Employed' }).check();
  await page.locator('input[name="bday"]').fill('2026-06-27');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('× Success! The Form has been').click();
});