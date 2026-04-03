import styles from './modal.module.css';

type ModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay = ({ onClose }: ModalOverlayProps): React.JSX.Element => {
  return <div aria-hidden={true} className={styles.overlay} onClick={onClose} />;
};
