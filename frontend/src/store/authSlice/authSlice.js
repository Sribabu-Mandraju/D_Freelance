import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  token: null,
  user: null,
  userExists: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk to call /api/auth/verify
export const verifyWalletAuth = createAsyncThunk(
  'auth/verifyWalletAuth',
  async ({ address, signature, nonce }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature, nonce }),
      });

      if (!response.ok) {
        throw new Error(`Verify request failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Verification failed');
      }

      // Save token in localStorage (optional)
      localStorage.setItem('authToken', data.token);

      return {
        token: data.token,
        user: data.user,
        userExists: data.userExists,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.userExists = false;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyWalletAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyWalletAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userExists = action.payload.userExists;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyWalletAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Verification failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
