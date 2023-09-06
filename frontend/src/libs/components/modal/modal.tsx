import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<Properties> = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-content']}>
        <button
          type="button"
          className={styles['modal-close']}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
