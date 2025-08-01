import { createSlice } from '@reduxjs/toolkit';
import {
  getProductsThunk,
  createProductThunk,
  getProductByIdThunk,
  updateProductThunk,
  deleteProductThunk,
} from '../thunks/ProductsThunk';
import { Product } from '../dto/product.dto';

interface ProductsState {
  data: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
  selectedProduct?: Product | null;
}

const initialState: ProductsState = {
  data: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  loading: false,
  error: null,
  selectedProduct: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching products';
      })
      // Crear producto
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data.unshift(action.payload);
        state.totalItems += 1;
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error creating product';
      })
      // Obtener producto por id
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching product';
        state.selectedProduct = null;
      })
      // Actualizar producto
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.data.findIndex(p => p._id === action.payload._id);
        if (idx !== -1) {
          state.data[idx] = action.payload;
        }
        if (state.selectedProduct && state.selectedProduct._id === action.payload._id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error updating product';
      })
      // Eliminar producto
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(p => p._id !== action.payload.id);
        state.totalItems -= 1;
        if (state.selectedProduct && state.selectedProduct._id === action.payload.id) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error deleting product';
      });
  },
});

export default productsSlice.reducer;
