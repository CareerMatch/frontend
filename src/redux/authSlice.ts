// src/redux/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/api/authService';

interface AuthState {
    user: any | null; // Can hold user information or null
    isAuthenticated: boolean; // Tracks authentication state
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Tracks request status
    error: string | null; // Error message, if any
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
};

// Thunks for login and logout
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await authService.login(email, password);
            return response; // Expected response with user data and token
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await authService.logout();
        return true;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

export const register = createAsyncThunk(
    'auth/register',
    async (
        { firstName, lastName, dob, email, password }: { firstName: string; lastName: string; dob: string; email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await authService.signup({ firstName, lastName, dob, email, password });
            return response; // Expected response with user data
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.status = 'idle';
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isAuthenticated = true; // Automatically authenticate after registration
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;