import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from '../thunks/loginThunk';
import { logoutThunk } from '../thunks/logoutThunk';
import { verifySessionThunk } from '../thunks/verifySessionThunk';


interface AuthState {
  loading: boolean;
  error: string | null;
  email: string | null;
}


const initialState: AuthState = {
  loading: false,
  error: null,
  email: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        // Limpia el estado al cerrar sesión
        state.loading = false;
        state.error = null;
        state.email = null;
      })
      .addCase(verifySessionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySessionThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.authenticated && action.payload.user?.email) {
          state.email = action.payload.user.email;
        } else {
          state.email = null;
        }
      })
      .addCase(verifySessionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Session verification failed';
        state.email = null;
      });
  },
});

// No se exporta logout, solo se usa logoutThunk
export default authSlice.reducer;
