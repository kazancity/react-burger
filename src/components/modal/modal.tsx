import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { PropsWithChildren, ReactPortal, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useSelector } from "../../hooks/hooks-types";
import { GridLoader } from "react-spinners";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface ModalProps {
  onClose: () => void;
}

const Modal = ({
  children,
  onClose,
}: PropsWithChildren<ModalProps>): ReactPortal => {
  const { isLoading } = useSelector((store) => store.orderDetails);

  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeEsc);
    return () => document.removeEventListener("keydown", closeEsc);
    // eslint-disable-next-line
  }, []);

  return createPortal(
    <>
      {isLoading ? (
        <>
          <ModalOverlay />
          <GridLoader
            color="#8585ad"
            loading={isLoading}
            cssOverride={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate('-50%', '-50%')",
            }}
          />
        </>
      ) : (
        <>
          <ModalOverlay onClick={onClose} />
          <div className={styles.modal}>
            <span className={styles.close} onClick={onClose}>
              <CloseIcon type="primary" />
            </span>
            {children}
          </div>
        </>
      )}
    </>,
    document.getElementById("modals") as HTMLElement,
  );
};

export default Modal;
