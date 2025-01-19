import { test, expect } from '@playwright/test';

// Mock data for authentication and user service APIs
const mockAuthResponse = [
    {
        userId: "132ad009-5d05-4f69-8a8c-eb5d2e381ead",
        email: "agus.rana@gmail.com",
        role: "Admin",
    },
];

const mockUserResponse = [
    {
        userId: "132ad009-5d05-4f69-8a8c-eb5d2e381ead",
        firstName: "Agus",
        lastName: "Rana",
        dateOfBirth: "2000-01-01",
    },
];

test.describe('Dashboard Page E2E Test with Mocks', () => {
    test.beforeEach(async ({ page }) => {
        // Mock the login API
        await page.route('http://localhost:5240/api/auth/login', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    accessToken: 'mockAccessToken',
                    refreshToken: 'mockRefreshToken',
                }),
            });
        });

        // Mock the auth service API
        await page.route('http://localhost:5240/api/auth/users', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockAuthResponse),
            });
        });

        // Mock the user service API
        await page.route('http://localhost:5240/api/users', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockUserResponse),
            });
        });

    });

    test('should display user data table with mocked data', async ({ page }) => {
        // Navigate to the dashboard
        await page.goto('http://localhost:5173/dashboard');

        // // Verify loading state
        // await expect(page.locator('text=Loading...')).toBeVisible();

        // Wait for the table to load
        await page.waitForSelector('#user-row-132ad009-5d05-4f69-8a8c-eb5d2e381ead', { timeout: 10000 });
        await expect(page.locator('#user-row-132ad009-5d05-4f69-8a8c-eb5d2e381ead')).toBeVisible();

        // Verify data for a specific user
        const firstRow = page.locator('#user-row-132ad009-5d05-4f69-8a8c-eb5d2e381ead');
        await expect(firstRow.locator('#user-firstName-132ad009-5d05-4f69-8a8c-eb5d2e381ead')).toHaveText('Agus'); // First Name
        await expect(firstRow.locator('#user-lastName-132ad009-5d05-4f69-8a8c-eb5d2e381ead')).toHaveText('Rana'); // Last Name
        await expect(firstRow.locator('#user-email-132ad009-5d05-4f69-8a8c-eb5d2e381ead')).toHaveText('agus.rana@gmail.com'); // Email
        await expect(firstRow.locator('#user-dob-132ad009-5d05-4f69-8a8c-eb5d2e381ead')).toHaveText('2000-01-01'); // Date of Birth
    });

});