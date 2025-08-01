import { useCallback } from "react";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";
import { deleteProductThunk } from "@/modules/products/thunks/ProductsThunk";

export const useDeleteProduct = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.products);

  const deleteProduct = useCallback(
    (id: string) => {
      return dispatch(deleteProductThunk(id)); // ✅ Retorna el resultado del thunk
    },
    [dispatch]
  );

  return { deleteProduct, loading, error };
};
