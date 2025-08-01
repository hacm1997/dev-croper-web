/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';
import { Product, ProductsResponse } from '../dto/product.dto';

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
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Error fetching products');
  }
});

// Crear producto
export const createProductThunk = createAsyncThunk<
  Product,
  Omit<Product, '_id' | '__v'>,
  { rejectValue: string }
>('products/create', async (productData, { rejectWithValue }) => {
  try {
    const response = await axios.post<Product>('/products', productData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Error creating product');
  }
});

// Obtener producto por ID
export const getProductByIdThunk = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>('products/getById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Error fetching product');
  }
});

// Actualizar producto
export const updateProductThunk = createAsyncThunk<
  Product,
  { id: string; data: Partial<Omit<Product, '_id' | '__v'>> },
  { rejectValue: string }
>('products/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.patch<Product>(`/products/${id}`, data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Error updating product');
  }
});

// Eliminar producto
export const deleteProductThunk = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>('products/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/products/${id}`);
    return { id };
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Error deleting product');
  }
});
