import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

export interface VerifySessionResponse {
  authenticated: boolean;
  user?: {
    email: string;
  };
}

export const verifySessionThunk = createAsyncThunk<
  VerifySessionResponse,
  void,
  { rejectValue: string }
>('auth/verifySession', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<VerifySessionResponse>('/auth/verify');
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Session verification failed');
  }
});
