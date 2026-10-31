import { expect, test } from '@playwright/test';

test('starts on the level path and can open level 1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('ion-title')).toContainText('Match Game');
  await expect(page.getByText('Tap a bright level to play it, or press Play.')).toBeVisible();
  await expect(page.getByText('Level 1 selected')).toBeVisible();
  await expect(page.locator('.game-host canvas')).toBeVisible();

  await page.getByRole('button', { name: 'Play level 1' }).click();
  await expect(page.getByText('Draw a line from each circle to the picture of the same color.')).toBeVisible();
  await expect(page.getByText('Matched 0 of 5')).toBeVisible();
  await expect(page.locator('.timer')).toHaveText('Time 00:00');
  await expect(page.locator('.timer')).toHaveText('Time 00:01');
});

test('opens level 4 with colored circles matched to birds', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('match-app-cleared', JSON.stringify({ cleared: [1, 2, 3] }));
  });
  await page.goto('/');

  await expect(page.getByText('Level 4 selected')).toBeVisible();
  await page.getByRole('button', { name: 'Play level 4' }).click();
  await expect(page.locator('ion-title')).toContainText('Level 4');
  await expect(page.getByText('Draw a line from each colored circle to the bird of the same color.')).toBeVisible();
  await expect(page.getByText('Matched 0 of 5')).toBeVisible();
});

test('opens level 5 with baby animals matched to grown-up animals', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('match-app-cleared', JSON.stringify({ cleared: [1, 2, 3, 4] }));
  });
  await page.goto('/');

  await expect(page.getByText('Level 5 selected')).toBeVisible();
  await page.getByRole('button', { name: 'Play level 5' }).click();
  await expect(page.locator('ion-title')).toContainText('Level 5');
  await expect(page.getByText('Match each baby animal to its grown-up.')).toBeVisible();
  await expect(page.getByText('Matched 0 of 5')).toBeVisible();
});

test('opens level 6 with colored squares matched to vehicles', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('match-app-cleared', JSON.stringify({ cleared: [1, 2, 3, 4, 5] }));
  });
  await page.goto('/');

  await expect(page.getByText('Level 6 selected')).toBeVisible();
  await page.getByRole('button', { name: 'Play level 6' }).click();
  await expect(page.locator('ion-title')).toContainText('Level 6');
  await expect(page.getByText('Match each colored square to a vehicle of the same color.')).toBeVisible();
  await expect(page.getByText('Matched 0 of 5')).toBeVisible();
});
