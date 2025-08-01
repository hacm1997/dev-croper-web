import { Dialog } from "primereact/dialog";
import { ReactNode } from "react";

interface ModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  header?: ReactNode;
  footerContent?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  visible,
  setVisible,
  header,
  footerContent,
  children,
  className = "w-[86%] md:w-[50vw]",
}: ModalProps) {
  return (
    <Dialog
      header={header}
      visible={visible}
      className={className}
      onHide={() => setVisible(false)}
      footer={footerContent}
    >
      {children}
    </Dialog>
  );
}
