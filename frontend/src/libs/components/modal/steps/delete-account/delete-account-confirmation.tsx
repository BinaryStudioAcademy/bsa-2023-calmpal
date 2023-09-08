import { type FC } from 'react';

import styles from './styles.module.scss';

type DeleteAccountProperties = {
  onClose?: () => void;
};

const DeleteAccount: FC<DeleteAccountProperties> = ({ onClose }) => {
  return (
    <div className={styles['modal-body']}>
      <p>Thank you for your feedback and for being with us</p>
      <div className={styles['footer']}>
        <button onClick={onClose} className={styles['button']}>
          Done
        </button>
      </div>
    </div>
  );
};

export { DeleteAccount };
