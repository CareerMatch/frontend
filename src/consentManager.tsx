import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

const ConsentManager = () => {
    useEffect(() => {
        CookieConsent.run({
            autoShow: true, // Automatically show the modal on load
            guiOptions: {
                consentModal: {
                    layout: 'box', // Box layout for the modal
                    position: 'bottom right', // Position at the bottom right
                },
                preferencesModal: {
                    layout: 'box', // Box layout for preferences modal
                    position: 'center', // Centered preferences modal
                },
            },
            categories: {
                necessary: {
                    enabled: true, // Enabled by default
                    readOnly: true, // Cannot be disabled
                },
                analytics: {
                    enabled: false, // Disabled by default
                    autoClear: {
                        cookies: [
                            { name: /^_ga/ }, // Clear cookies matching this regex
                            { name: '_gid' },
                        ],
                        reloadPage: true, // Reload page after clearing cookies
                    },
                },
            },
            language: {
                default: 'en', // Set default language to English
                translations: {
                    en: {
                        consentModal: {
                            title: 'We use cookies',
                            description:
                                'We use cookies to ensure proper website functionality and to improve user experience. Click "Accept all" to consent or manage your preferences below.',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage preferences',
                        },
                        preferencesModal: {
                            title: 'Manage your cookie preferences',
                            description:
                                'Adjust your cookie preferences below. Necessary cookies are always enabled to ensure proper website functionality.',
                            savePreferencesBtn: 'Save preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            sections: [
                                {
                                    title: 'Necessary Cookies',
                                    description:
                                        'Necessary cookies are required for the website to function properly and cannot be disabled.',
                                    linkedCategory: 'necessary', // Links to the necessary category
                                },
                                {
                                    title: 'Performance and Analytics',
                                    description:
                                        'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
                                    linkedCategory: 'analytics', // Links to the analytics category
                                },
                                {
                                    title: 'More Information',
                                    description:
                                        'For more details on how we use cookies, please visit our <a href="#privacy-policy">Privacy Policy</a>.',
                                },
                            ],
                        },
                    },
                },
            },
            cookie: {
                name: 'career_match_cookie', // Custom cookie name
                domain: window.location.hostname, // Automatically set to current domain
                path: '/', // Cookie path
                secure: true, // Set secure flag for HTTPS
                expiresAfterDays: 182, // Expiration period in days
                sameSite: 'Lax', // Set SameSite attribute
            },
            onFirstConsent: ({ cookie }) => {
                console.log('First consent given:', cookie);
            },
            onConsent: ({ cookie }) => {
                console.log('Consent updated:', cookie);
            },
            onChange: ({ changedCategories }) => {
                console.log('Categories changed:', changedCategories);
                if (changedCategories.includes('analytics')) {
                    if (CookieConsent.acceptedCategory('analytics')) {
                        console.log('Analytics enabled');
                        // Initialize analytics scripts here
                    } else {
                        console.log('Analytics disabled');
                        // Disable analytics scripts here
                    }
                }
            },
        });
    }, []); // Run once when the component is mounted

    return null; // This component doesn't render anything
};

export default ConsentManager;