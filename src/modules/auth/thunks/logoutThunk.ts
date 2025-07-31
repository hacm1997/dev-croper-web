import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    await axios.post('/auth/logout');
    // No necesitas devolver nada, solo asegurarte que la cookie se borre en el backend
  }
);
