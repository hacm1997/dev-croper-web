import { useCallback } from 'react';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { updateProductThunk } from '@/modules/products/thunks/ProductsThunk';
import { Product } from '@/modules/products/dto/product.dto';

export const useUpdateProduct = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);

  const updateProduct = useCallback(
    (id: string, updateData: Partial<Omit<Product, '_id' | '__v'>>) =>
      dispatch(updateProductThunk({ id, data: updateData })),
    [dispatch]
  );

  return { updateProduct, loading, error };
};
