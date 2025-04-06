import { test, expect } from '@playwright/test';


test('Check Powr Pricing page availability and pricing values', async ({ page }) => {

  await page.goto('https://powr.io/pricing');

  const pricingLocator = page.locator('h1.pricing-page__header.margin-top-l');
  await expect(pricingLocator).toBeVisible();
  
  const yearlyTab = page.locator('div.toggle__switcher toggle__switcher--off');
  if (await yearlyTab.isVisible()) {
    await yearlyTab.click();
  }
  const freePlanTitle = page.getByRole('heading', { name: 'Free' })
  await expect(freePlanTitle).toBeVisible();
  const startPlanTitle = page.getByRole('heading', { name: 'Starter' })
  await expect(startPlanTitle).toContainText('Starter');
  const priceStarterElement = page.getByText('$4').first()
  await expect(priceStarterElement).toContainText('$4');
  const proPlanTitle = page.getByText('Pro', { exact: true }).first()
  await expect(proPlanTitle).toContainText('Pro');
  const proPrice = page.getByText('$12').first()
  await expect(proPrice).toContainText('$12');
  const businessPlanTitle = page.locator('.pricing-page__lighter-font.f2', { hasText: 'The business' });
  await expect(businessPlanTitle).toBeVisible;
  const priceBusinessElement = page.getByText('$80').first()
  await expect(priceStarterElement).toBeVisible;
  
  const monthlyTab = page.locator('div.toggle__switcher toggle__switcher--on');
  if (await monthlyTab.isVisible()) {
    await monthlyTab.click();
  }

  const freePlanTitleMonthly = page.getByRole('heading', { name: 'Free' })
  await expect(freePlanTitleMonthly).toBeVisible();
  const startPlanTitleMontly = page.getByRole('heading', { name: 'Starter' })
  await expect(startPlanTitleMontly).toContainText('Starter');
  const priceStarterElementmonthly = page.getByText('$5').first()
  await expect(priceStarterElementmonthly).toContainText('$5');
  const proPlanTitlemonthly = page.getByText('Pro', { exact: true }).first()
  await expect(proPlanTitlemonthly).toContainText('Pro');
  const proPriceMonthly = page.getByText('$13').first()
  await expect(proPriceMonthly).toContainText('$13');
  const businessPlanTitleMonthly = page.locator('.pricing-page__lighter-font.f2', { hasText: 'The business' });
  await expect(businessPlanTitleMonthly).toBeVisible;
  const priceBusinessElemenMonthly = page.getByText('$89').first()
  await expect(priceBusinessElemenMonthly).toBeVisible;

});

test('POWR.io - Try Free, Build Form, Publish, and Validate Live App', async ({ page, context }) => {
  await page.goto('https://powr.io/pricing');

  const pricingLocator = page.locator('h1.pricing-page__header.margin-top-l');
  await expect(pricingLocator).toBeVisible();
  // Step b: Click “Try Free” on Form Builder (assume it's labeled clearly)
  await page.goto('https://www.powr.io/demo');
  //const closeButton = await page.locator('//span[text()="Start from scratch"]').isVisible();
  //if(closeButton){
  //  await page.locator('//span[text()="Start from scratch"]').click();
  //}
  //const initButton = await page.locator('//button[@data-app-slug="form-builder"]').isVisible();
  //if (initButton) {
  //  await page.locator('//button[@data-app-slug="form-builder"]').click();
  //}

  await page.locator('//button[@data-app-slug="form-builder"]').first().click();

  await page.getByText("Select Template").first().click();

  await page.locator('//*[@data-qa="button-next"]').first().click();
  await page.locator('//*[@data-qa="button-prev"]').isVisible;
  await page.locator('//*[@data-qa="button-next"]').first().click();
  await page.locator('//*[@data-qa="button-prev"]').isVisible;
  await page.locator('//*[@data-qa="button-next"]').first().click();

  // Step c: Wait for redirect to builder or signup/login page
  await page.waitForLoadState('networkidle');

  // If login/signup is required, use social auth or fill out fake credentials
  const emailInput = page.locator('input[type="email"]');
  if (await emailInput.isVisible()) {
    await emailInput.fill(`testuser+${Date.now()}@example.com`);
    await page.locator('input[type="password"]').fill('Test1234!');
    await page.getByRole('button', { name: /sign up/i }).click();
  }

  // Step d: Select “New Scratch” template (assume it's visible in modal or dashboard)
  await page.getByText('New Scratch').click();

  // Wait for the builder to load
  await page.waitForSelector('#builder-container');

  // Step e: Change background color (assuming a button or style panel is available)
  await page.getByRole('button', { name: /design/i }).click();
  const bgColorInput = page.locator('input[type="color"]');
  await bgColorInput.fill('#ffcccc'); // light pink background

  // Step f: Publish the app
  await page.getByRole('button', { name: /publish/i }).click();

  // Wait for publish success and get the shared link
  const sharedLink = await page.locator('a:has-text("View App")').getAttribute('href');
  expect(sharedLink).toContain('https://www.powr.io/plugins/');

  // Step g: Open the shared/live link in a new context
  const livePage = await context.newPage();
  await livePage.goto(sharedLink!);

  // Validate content — could compare screenshots or key content
  await expect(livePage.locator('#plugin-root')).toBeVisible();
});

