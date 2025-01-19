import { test, expect } from '@playwright/test';
import { mockLoginRoute } from '../utils/mockRoutes';

test('login page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/signin'); // Update URL as needed

    // Expect the login form to be visible
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
});

test('user can log in (mocked)', async ({ page }) => {
    await mockLoginRoute(page); // Mock the login API

    await page.goto('http://localhost:5173/signin'); // Ensure the page URL is correct

    // Fill in the login form using IDs
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'Admin123');

    // Submit the form
    await page.click('button[type="submit"]');

    // Expect to navigate to the homepage after login
    await expect(page).toHaveURL('http://localhost:5173/');
});

test('user cannot log in with incorrect password (mocked)', async ({ page }) => {
    await mockLoginRoute(page); // Mock the login API

    await page.goto('http://localhost:5173/signin');

    // Fill in the login form with incorrect credentials
    await page.fill('#email', 'admin@example.com');
    await page.fill('#password', 'WrongPassword123');

    // Submit the form
    await page.click('button[type="submit"]');

    // Expect an error message to be displayed
    await expect(page.locator('.text-red-500')).toHaveText('Invalid credentials');
});