"use client";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import AlertModal from "@/components/molecules/modals/AlertModal";
import CreateProductModal from "@/components/organisms/dashboard/products/CreateProductModal";
import ProductDeatilModal from "@/components/organisms/dashboard/products/ProductDeatilModal";
import ProductTable from "@/components/organisms/dashboard/products/ProductTable";
import { useDeleteProduct, useProducts } from "@/hooks/products";
import { deleteProductThunk } from "@/modules/products/thunks/ProductsThunk";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(5);
  const { products, loading, error, totalItems, fetchProducts } = useProducts(
    page,
    rows
  );
  const { deleteProduct, loading: deleteLoading } = useDeleteProduct();
  const [modalVisible, setModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPageChange = (event: any) => {
    setPage(Math.floor(event.first / event.rows) + 1);
    setRows(event.rows);
  };

  const handleDelete = async () => {
    if (!productId) {
      throw new Error("Product ID is required");
    }
    const resultAction = await deleteProduct(productId);

    if (deleteProductThunk.rejected.match(resultAction)) {
      const errorMessage = resultAction.payload || "Error deleting product";
      toast.error(
        errorMessage === "Forbidden resource"
          ? "You do not have permission to delete this product"
          : errorMessage
      );
    } else {
      toast.success("Product deleted successfully");
      fetchProducts();
    }
    setProductId(undefined);
    setShowAlert(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl">Product List</h1>
        <PrimaryButton
          label="New product"
          type="button"
          onAction={() => {
            setModalVisible(true);
          }}
        />
      </div>
      <ProductTable
        products={products}
        loading={loading}
        error={error}
        totalItems={totalItems}
        page={page}
        rows={rows}
        onPageChange={onPageChange}
        onEdit={(id: string) => {
          setProductId(id);
          setIsEdit(true);
          setModalVisible(true);
        }}
        onDetails={(id: string) => {
          setProductId(id);
          setShowDetails(true);
        }}
        onDelete={(id: string) => {
          setProductId(id);
          setShowAlert(true);
        }}
      />
      <CreateProductModal
        modalVisible={modalVisible}
        setModalVisible={() => {
          setModalVisible(false);
          setIsEdit(false);
          setProductId(undefined);
        }}
        onProductCreated={fetchProducts}
        isEdit={isEdit}
        productId={productId}
      />
      <ProductDeatilModal
        productId={productId}
        modalVisible={showDetails}
        setModalVisible={() => {
          setShowDetails(false);
          setProductId(undefined);
        }}
      />
      <AlertModal
        modalVisible={showAlert}
        setModalVisible={() => setShowAlert(false)}
        header="Delete Product"
        message="Are you sure you want to delete this product?"
        onClick={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
