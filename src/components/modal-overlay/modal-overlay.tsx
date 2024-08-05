import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  onClick?: () => void;
}

const ModalOverlay = ({ onClick }: ModalOverlayProps) => (
  <div className={styles.overlay} onClick={onClick}></div>
);

export default ModalOverlay;
