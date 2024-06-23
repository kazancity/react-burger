import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => (
  <div className={styles.overlay} onClick={onClose}></div>
);
ModalOverlay.propTypes = { onClose: PropTypes.func };

export default ModalOverlay;
