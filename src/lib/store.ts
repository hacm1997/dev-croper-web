import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/modules/auth/slices/authSlice';
import productsReducer from '@/modules/products/slices/productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
