import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { getProductsThunk } from '@/modules/products/thunks/getProductsThunk';

export const useProducts = (page: number = 1, limit: number = 10) => {
  const dispatch = useAppDispatch();
  const { data, loading, error, currentPage, totalPages, totalItems } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  return {
    products: data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
  };
};
