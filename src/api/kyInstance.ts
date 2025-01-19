import ky from 'ky';

const kyInstance = ky.create({
    prefixUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5240/api/", // Base URL for the API
    credentials: 'include', // Include cookies for authentication
    headers: {
        'Content-Type': 'application/json',
    },
    hooks: {
        beforeRequest: [
            (request) => {
                console.log(`Making request to ${request.url}`);
            },
        ],
        afterResponse: [
            async (request, options, response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('API Error:', errorData);
                }
            },
        ],
    },
});

export default kyInstance;
