import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

interface LoginDto {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginDto) => {
    const res = await axios.post('/auth/login', data);
    return res.data; // { access_token }
  }
);
