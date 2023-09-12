import { type FC } from 'react';

import styles from './styles.module.scss';

type Properties = {
  onNext?: () => void;
  onClose?: () => void;
};

const DeleteAccountMessage: FC<Properties> = ({ onNext, onClose }) => {
  return (
    <div className={styles['modal-body']}>
      <p>After deleting your account you will:</p>
      <ul className={styles['text']}>
        <li>Not be able to login to CalmPal</li>
        <li>Lose acces to your meditations</li>
        <li>Your data and profile history will be deleted</li>
      </ul>
      <div className={styles['footer']}>
        <button onClick={onClose} className={styles['button']}>
          Cancel
        </button>
        <button onClick={onNext} className={styles['button']}>
          Continue
        </button>
      </div>
    </div>
  );
};

export { DeleteAccountMessage };
