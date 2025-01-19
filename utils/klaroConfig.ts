export const klaroConfig = {
    // Define the privacy policy link
    privacyPolicy: '/privacy-policy',

    // Show consent modal directly or via an explicit trigger
    showModalOnStart: true,

    // Cookies and services to manage
    services: [
        {
            name: 'essentialCookies',
            title: 'Essential Cookies',
            purposes: ['functional'],
            cookies: [
                'session_id', // Example cookie for session management
                'XSRF-TOKEN', // Example CSRF protection cookie
            ],
            default: true, // Always enabled since they're essential
            required: true, // Cannot be disabled
        },
        {
            name: 'userPreferences',
            title: 'User Preferences',
            purposes: ['preferences'],
            cookies: ['user_language', 'theme_preference'], // Example cookies
            default: true, // Enabled by default
        },
    ],

    // Translation for different languages
    translations: {
        en: {
            consentModal: {
                title: 'We value your privacy',
                description:
                    'We use cookies to enhance your experience and store user preferences. Customize your preferences below.',
            },
            purposes: {
                functional: 'Functional Cookies',
                preferences: 'User Preferences',
            },
            service: {
                essentialCookies: {
                    description: 'Cookies required for website functionality (e.g., session management).',
                },
                userPreferences: {
                    description: 'Cookies for storing your language and theme preferences.',
                },
            },
        },
    },

    // Optional: Appearance configuration
    styling: {
        theme: ['light', 'custom'], // Use light mode or custom styles
    },
};