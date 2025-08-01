import Modal from "@/components/molecules/modals/Modal";
import { useProductById } from "@/hooks/products";
import { Skeleton } from "primereact/skeleton";
import { useEffect } from "react";

type ProductDetailModalProps = {
  productId?: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export default function ProductDeatilModal({
  productId,
  modalVisible,
  setModalVisible,
}: ProductDetailModalProps) {
  const { selectedProduct, loading, getProductById } = useProductById();

  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <Modal
      visible={modalVisible}
      setVisible={setModalVisible}
      header={
        <div className="p-4">
          <span>Product details</span>
        </div>
      }
      className="w-[90%] md:w-[30%]"
    >
      {loading ? (
        <Skeleton className="py-4 h-[300px] w-[90%]" />
      ) : (
        <div className="flex flex-col gap-4 border-t w-full">
          <div className="flex justify-around flex-wrap px-4 md:px-8 py-4 ">
            <div className="flex gap-3">
              <span>Name: </span>
              <span className="font-bold">{selectedProduct?.name}</span>
            </div>
            <div className="flex gap-3">
              <span>Price: </span>
              <span className="font-bold">
                {selectedProduct?.price &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(selectedProduct.price)}
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
