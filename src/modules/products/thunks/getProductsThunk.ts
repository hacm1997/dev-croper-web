import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  __v: number;
}

export interface ProductsResponse {
  data: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const getProductsThunk = createAsyncThunk<
  ProductsResponse,
  { page?: number; limit?: number },
  { rejectValue: string }
>('products/getAll', async (params, { rejectWithValue }) => {
  try {
    const { page = 1, limit = 10 } = params || {};
    const response = await axios.get<ProductsResponse>(
      `/products?page=${page}&limit=${limit}`
    );
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Error fetching products');
  }
});
