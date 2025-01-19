import kyInstance from './kyInstance.ts';

export const userService = {
    // Get all users (Admin only)
    getAllUsers: async () => {
        try {
            const response = await kyInstance.get('users', {
                credentials: 'include', // Ensures cookies are sent with the request
            }).json();
            return response;
        } catch (error) {
            handleError(error, 'Failed to fetch all users');
        }
    },

    // Get user by ID (Admin or Self)
    getUserById: async (userId: string) => {
        try {
            const response = await kyInstance.get(`users/${userId}`, {
                credentials: 'include',
            }).json();
            return response;
        } catch (error) {
            handleError(error, 'Failed to fetch user details');
        }
    },

    // Update user (Admin or Self)
    updateUser: async (userId: string, userDetails: object) => {
        try {
            const response = await kyInstance.put(`users/${userId}`, {
                json: userDetails,
                credentials: 'include',
            }).json();
            return response;
        } catch (error) {
            handleError(error, 'Failed to update user details');
        }
    },
};

// Error handling function
function handleError(error: any, defaultMessage: string) {
    if (error instanceof Error) {
        if ('response' in error) {
            const errorResponse = (error as any).response;
            if (errorResponse) {
                throw new Error(errorResponse.message || defaultMessage);
            }
        }
        throw new Error(error.message || defaultMessage);
    } else {
        throw new Error(defaultMessage);
    }
}