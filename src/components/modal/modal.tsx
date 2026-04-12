import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from './modal-overlay';

import type { DefaultPropsWithChildren } from '@utils/types';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

type ModalProps = DefaultPropsWithChildren & {
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps): React.JSX.Element | null => {
  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return (): void => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  if (modalRoot === null) {
    return null;
  }

  return createPortal(
    <div className={styles.container}>
      <ModalOverlay onClose={onClose} />
      <div className={clsx(styles.modal, 'p-10')}>
        <button
          aria-label="Закрыть"
          className={styles.closeButton}
          onClick={onClose}
          type="button"
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
