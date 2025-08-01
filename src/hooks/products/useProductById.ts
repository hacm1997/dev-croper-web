import { useCallback } from 'react';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { getProductByIdThunk } from '@/modules/products/thunks/ProductsThunk';

export const useProductById = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector((state) => state.products);

  const getProductById = useCallback((id: string) => {
    dispatch(getProductByIdThunk(id));
  }, [dispatch]);

  return { selectedProduct, loading, error, getProductById };
};
