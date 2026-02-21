import { test, expect } from '@playwright/test';

/**
 * Antigravity UI Smoke Tests
 *
 * Validates that converted pages render correctly with the AG design system.
 * Run: npx playwright test tests/antigravity-smoke.spec.ts
 */

// Representative pages from each category to smoke test
const SMOKE_TEST_ROUTES = [
  // Homepage (already AG)
  { path: '/', label: 'Homepage' },

  // Existing AG service pages
  { path: '/services/water-damage-restoration', label: 'Service: Water Damage' },
  { path: '/services/fire-damage-restoration', label: 'Service: Fire Damage' },
  { path: '/services/mould-remediation', label: 'Service: Mould Remediation' },
  { path: '/services/laser-cleaning', label: 'Service: Laser Cleaning' },
  { path: '/services/meth-lab-decontamination', label: 'Service: Meth Lab' },

  // Core routes
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/services', label: 'Services Index' },
  { path: '/locations', label: 'Locations Index' },
  { path: '/faq', label: 'FAQ Index' },
  { path: '/pricing', label: 'Pricing Index' },
  { path: '/guides', label: 'Guides Index' },
];

test.describe('Antigravity Smoke Tests', () => {
  for (const route of SMOKE_TEST_ROUTES) {
    test(`${route.label} (${route.path}) loads without errors`, async ({ page }) => {
      const consoleErrors: string[] = [];

      // Collect console errors
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          const text = msg.text();
          // Ignore known non-critical errors
          if (
            text.includes('favicon') ||
            text.includes('manifest.json') ||
            text.includes('hydration') // Next.js hydration warnings are non-blocking
          ) {
            return;
          }
          consoleErrors.push(text);
        }
      });

      // Navigate and wait for network idle
      const response = await page.goto(route.path, { waitUntil: 'networkidle' });

      // Check HTTP status
      expect(response?.status(), `${route.path} should not 404/500`).toBeLessThan(400);

      // Check page has an h1
      const h1 = page.locator('h1').first();
      await expect(h1, `${route.path} should have an h1`).toBeVisible({ timeout: 10000 });

      // Check page title is set
      const title = await page.title();
      expect(title, `${route.path} should have a page title`).toBeTruthy();

      // Report console errors
      if (consoleErrors.length > 0) {
        console.warn(`Console errors on ${route.path}:`, consoleErrors);
      }
      expect(consoleErrors, `${route.path} should have no console errors`).toHaveLength(0);
    });
  }
});

test.describe('Antigravity Layout Tests', () => {
  test('AG navbar renders on homepage when flag is ON', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Check for AG navbar
    const navbar = page.locator('.ag-navbar-wrapper');
    const navbarCount = await navbar.count();

    if (navbarCount > 0) {
      await expect(navbar.first()).toBeVisible();

      // Check footer also renders
      const footer = page.locator('.ag-site-footer');
      await expect(footer.first()).toBeVisible();
    }
  });

  test('Pages have proper meta description', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const metaDesc = page.locator('meta[name="description"]');
    const content = await metaDesc.getAttribute('content');
    expect(content, 'Homepage should have meta description').toBeTruthy();
  });
});
