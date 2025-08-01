import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { getProductsThunk } from '@/modules/products/thunks/ProductsThunk';

export const useProducts = (page: number = 1, limit: number = 10) => {
  const dispatch = useAppDispatch();
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
  } = useAppSelector((state) => state.products);

  const fetchProducts = useCallback(() => {
    dispatch(getProductsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products: data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    fetchProducts,
  };
};
