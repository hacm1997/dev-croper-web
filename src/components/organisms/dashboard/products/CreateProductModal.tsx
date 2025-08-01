import Modal from "@/components/molecules/modals/Modal";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  useCreateProduct,
  useProductById,
  useUpdateProduct,
} from "@/hooks/products";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { toast } from "react-toastify";

type CreateProductModalProps = {
  modalVisible: boolean;
  isEdit?: boolean;
  productId?: string; // Optional, used if editing a product
  setModalVisible: (visible: boolean) => void;
  onProductCreated?: () => void;
};

type FormValues = {
  name: string;
  description: string;
  price: number;
  category: string;
};

export default function CreateProductModal({
  modalVisible,
  setModalVisible,
  onProductCreated,
  isEdit = false,
  productId,
}: CreateProductModalProps) {
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();
  const {
    selectedProduct,
    getProductById,
    loading: loadingProduct,
  } = useProductById();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load product data when editing
  useEffect(() => {
    if (isEdit && productId && modalVisible) {
      getProductById(productId);
    }
  }, [isEdit, productId, modalVisible, getProductById]);

  // Set form values when product data is loaded
  useEffect(() => {
    if (isEdit && selectedProduct && modalVisible) {
      setValue("name", selectedProduct.name);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("category", selectedProduct.category);
    } else if (!isEdit && modalVisible) {
      reset();
    }
  }, [isEdit, selectedProduct, modalVisible, setValue, reset]);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    try {
      if (isEdit && productId) {
        await updateProduct(productId, data);
        toast.success("Product updated successfully");
      } else {
        await createProduct(data);
        toast.success("Product created successfully");
      }
      reset();
      setModalVisible(false);
      if (onProductCreated) onProductCreated();
    } catch (err: unknown) {
      setSubmitError(
        (err as Error)?.message ||
          (isEdit ? "Error updating product" : "Error creating product")
      );
      toast.error(isEdit ? "Error updating product" : "Error creating product");
    }
  };

  return (
    <Modal
      visible={modalVisible}
      setVisible={setModalVisible}
      header={
        <div className="p-4">{isEdit ? "Edit Product" : "New Product"}</div>
      }
    >
      <div className="border-t w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-7 py-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <InputText
                  id="name"
                  {...field}
                  value={field.value ?? ""}
                  className={
                    errors.name
                      ? "p-invalid w-full"
                      : "w-full border rounded-[8px] h-10 px-2"
                  }
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <InputTextarea
                  id="description"
                  {...field}
                  value={field.value ?? ""}
                  className={
                    errors.description
                      ? "p-invalid w-full"
                      : "w-full border rounded-[8px] px-2"
                  }
                  autoResize
                  rows={3}
                />
              )}
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price">Price</label>
            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <InputNumber
                  id="price"
                  value={field.value ?? 0}
                  onValueChange={(e) => field.onChange(e.value)}
                  className={
                    errors.price
                      ? "p-invalid w-full"
                      : "w-full border rounded-[8px] h-10 px-2"
                  }
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  min={0}
                />
              )}
            />
            {errors.price && (
              <span className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category">Category</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <InputText
                  id="category"
                  {...field}
                  value={field.value ?? ""}
                  className={
                    errors.category
                      ? "p-invalid w-full"
                      : "w-full border rounded-[8px] h-10 px-2"
                  }
                />
              )}
            />
            {errors.category && (
              <span className="text-red-500 text-xs">
                {errors.category.message}
              </span>
            )}
          </div>
          {submitError && (
            <div className="text-red-500 text-xs">{submitError}</div>
          )}

          <div className="flex justify-end gap-3">
            <PrimaryButton
              label={
                isEdit
                  ? isSubmitting
                    ? "Updating..."
                    : "Update Product"
                  : isSubmitting
                  ? "Creating..."
                  : "Create Product"
              }
              type="submit"
              loading={isSubmitting || loadingProduct}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}
