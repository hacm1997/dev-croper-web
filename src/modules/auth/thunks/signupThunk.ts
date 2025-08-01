import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

interface SignUpDto {
  email: string;
  password: string;
  role: string;
}

export const loginThunk = createAsyncThunk(
  'auth/register',
  async (data: SignUpDto) => {
    const res = await axios.post('/auth/register', data);
    return res.data; 
  }
);
