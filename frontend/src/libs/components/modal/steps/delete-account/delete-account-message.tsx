import { Button } from '#libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  onNext?: () => void;
  onClose?: () => void;
};

const DeleteAccountMessage: React.FC<Properties> = ({ onNext, onClose }) => {
  const hasNextStep = Boolean(onNext);
  const hasCloseButton = Boolean(onClose);

  return (
    <div className={styles['modal-body']}>
      <p>After deleting your account you will:</p>
      <ul className={styles['text']}>
        <li>Not be able to login to CalmPal</li>
        <li>Lose acces to your meditations</li>
        <li>Your data and profile history will be deleted</li>
      </ul>
      <div className={styles['footer']}>
        {hasCloseButton && (
          <Button label="Cancel" style="primary" onClick={onClose} />
        )}
        {hasNextStep && (
          <Button label="Continue" style="primary" onClick={onNext} />
        )}
      </div>
    </div>
  );
};

export { DeleteAccountMessage };
