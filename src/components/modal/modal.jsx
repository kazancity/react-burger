import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Modal = ({ children, closeModWin, text }) => {
  const { isLoading } = useSelector((store) => store.orderDetails);

  useEffect(() => {
    const closeEsc = (e) => {
      if (e.key === "Escape") closeModWin();
    };
    document.addEventListener("keydown", closeEsc);
    return () => document.removeEventListener("keydown", closeEsc);
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={closeModWin} />
      <div className={styles.modal}>
        {text && <h2 className={styles.main}>{text}</h2>}
        <span className={styles.close} onClick={closeModWin}>
          <CloseIcon type="primary" />
        </span>
        {children}
      </div>
    </>,
    document.getElementById("modals"),
  );
};

Modal.propTypes = {
  closeModWin: PropTypes.func,
  children: PropTypes.element,
  text: PropTypes.string,
};

export default Modal;
