import { Button } from "primereact/button";
import Modal from "./Modal";

type AlertModalProps = {
  modalVisible: boolean;
  header: string;
  message: string;
  loading?: boolean;
  setModalVisible: (visible: boolean) => void;
  onClick: () => void;
};

export default function AlertModal({
  header,
  modalVisible,
  message,
  loading,
  setModalVisible,
  onClick,
}: AlertModalProps) {
  return (
    <Modal
      visible={modalVisible}
      setVisible={setModalVisible}
      header={<div className="p-4">{header}</div>}
      className="w-[80%] md:w-[30%]"
    >
      <div className="border-t w-full">
        <div className="flex flex-col p-4">
          <h4 className="text-lg font-bold mb-2">{message}</h4>

          <div className="flex justify-end gap-2">
            <Button
              className="bg-gray-700 text-white p-2 rounded-md"
              loading={loading}
              onClick={() => setModalVisible(false)}
              type="button"
              label="Cancel"
            />
            <Button
              className="bg-red-500 text-white p-2 rounded-md"
              loading={loading}
              onClick={onClick}
              type="button"
              label="Delete"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
