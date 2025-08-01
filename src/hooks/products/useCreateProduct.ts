import { useCallback } from 'react';
import { useAppDispatch } from '../useAppDispatch';
import { createProductThunk } from '@/modules/products/thunks/ProductsThunk';
import { Product } from '@/modules/products/dto/product.dto';

export const useCreateProduct = () => {
  const dispatch = useAppDispatch();

  const createProduct = useCallback(
    (productData: Omit<Product, '_id' | '__v'>) =>
      dispatch(createProductThunk(productData)),
    [dispatch]
  );

  return { createProduct };
};
