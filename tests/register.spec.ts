import { test, expect } from '@playwright/test';



test('user can successfully register (mocked)', async ({ page }) => {
    // Intercept the API call to simulate a successful registration
    await page.route('http://localhost:5240/api/auth/register', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'User registered successfully',
            }),
        });
    });



    // Navigate to the registration page
    await page.goto('http://localhost:5173/signup'); // Update URL as needed

    // Fill in the registration form
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#dob', '1990-01-01');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#password', 'Password123');

    // Check the "agree to terms and conditions" checkbox
    await page.check('#agreeToTerms');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify that the user is redirected to the homepage
    await expect(page).toHaveURL('http://localhost:5173/');
});