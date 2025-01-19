// utils/mockRoutes.ts
export async function mockLoginRoute(page: any) {
    await page.route('http://localhost:5240/api/auth/login', (route) => {
        const requestBody = JSON.parse(route.request().postData() || '{}');

        if (
            requestBody.email === 'admin@example.com' &&
            requestBody.password === 'WrongPassword123'
        ) {
            route.fulfill({
                status: 401,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Invalid credentials',
                }),
            });
        } else {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    user: { name: 'Admin', email: 'admin@example.com' },
                    accessToken: 'mockAccessToken123',
                }),
            });
        }
    });
}