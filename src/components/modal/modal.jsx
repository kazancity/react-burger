import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ children, closeModWin, text }) => {
  const rootBody = document.getElementById("modals");

  useEffect((_) => {
    const closeEsc = (e) => {
      if (e.key === "Escape") closeModWin();
    };
    document.addEventListener("keydown", closeEsc);
    return (_) => document.removeEventListener("keydown", closeEsc);
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={closeModWin} />
      <div className={styles.modal}>
        {text && (
          <h2
            className={`${styles.header} ${styles.text} ${styles.text_main_large}`}
          >
            {text}
          </h2>
        )}
        <span className={styles.close} onClick={closeModWin}>
          <CloseIcon type="primary" />
        </span>
        {children}
      </div>
    </>,
    rootBody,
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  closeModWin: PropTypes.func,
  text: PropTypes.string,
};

export default Modal;
