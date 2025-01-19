import kyInstance from './kyInstance.ts';
// import { kyInstance}  from "@/api/kyInstance.ts";

export const authService = {
    login: async (email: string, password: string) => {
        try {
            const response = await kyInstance.post('auth/Login', {
                json: { email, password },
                credentials: 'include', // Ensures cookies are sent with the request
            }).json();
            return response;
        } catch (error) {
            handleError(error, 'Invalid credentials');
        }
    },

    signup: async (userDetails: object) => {
        return await kyInstance.post('auth/register', {
            json: userDetails,
        }).json();
    },

    logout: async () => {
        return await kyInstance.post('auth/logout');
    },

    // Fetch all users (Admin only)
    getAllUsers: async () => {
        try {
            const response = await kyInstance.get('auth/users', {
                credentials: 'include', // Ensure cookies are sent for authentication
            }).json();
            return response;
        } catch (error) {
            handleError(error, 'Failed to fetch all users');
        }
    },


    // Fetch user by ID (Admin or Self)
    getUserById: async (userId: string) => {
        try {
            const response = await kyInstance.get(`auth/users/${userId}`, {
                credentials: 'include',
            }).json();
            return response;
        } catch (error) {
            handleError(error, 'Failed to fetch user details');
        }
    },


};


// Utility function for handling errors
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