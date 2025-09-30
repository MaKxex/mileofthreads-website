import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { CustomDesign } from './CustomDesign';

test.use({ viewport: { width: 1024, height: 768 } });

test('should render the custom design form and allow interaction', async ({ mount, page }) => {
  const component = await mount(<CustomDesign />);

  // Check if the main title is visible
  await expect(component.locator('h2:has-text("Создай свой ДИЗАЙН!")')).toBeVisible();

  // Check if the product selection buttons are visible
  await expect(component.getByRole('button', { name: 'Футболка' })).toBeVisible();
  await expect(component.getByRole('button', { name: 'Толстовка' })).toBeVisible();
  await expect(component.getByRole('button', { name: 'Нашивка' })).toBeVisible();

  // Interact with the form
  await component.getByRole('button', { name: 'Толстовка' }).click();

  // Check that the hoodie mockup is now visible
  await expect(page.locator('img[alt="hoodie front mockup"]')).toBeVisible();

  // Select a different area
  await component.getByRole('button', { name: 'Спина' }).click();

  // Check that the back of the hoodie is now visible
  await expect(page.locator('img[alt="hoodie back mockup"]')).toBeVisible();

  // Fill out the form
  await component.getByPlaceholder('Твое имя').fill('Jules');
  await component.getByPlaceholder('Твоя фамилия').fill('Bot');
  await component.getByPlaceholder('твой@email.com').fill('jules@example.com');

  // Take a screenshot for visual verification
  await page.screenshot({ path: 'jules-scratch/verification/verification.png' });
});