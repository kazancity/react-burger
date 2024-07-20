import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { GridLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  const { isLoading } = useSelector((store) => store.orderDetails);

  useEffect(() => {
    const closeEsc = (e) => {
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
          <ModalOverlay onClick={null} />
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
    document.getElementById("modals"),
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
};

export default Modal;
