import { Button } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { actions as userActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  onClose?: () => void;
};

const DeleteAccountConfirmation: React.FC<Properties> = ({ onClose }) => {
  const { authenticatedUserId } = useAppSelector(({ auth }) => {
    return {
      authenticatedUserId: auth.authenticatedUser?.id,
    };
  });

  const dispatch = useAppDispatch();
  const handleDelete = useCallback(
    (id: number): void => {
      void dispatch(userActions.deleteUser(id));
      onClose?.();
    },
    [dispatch, onClose],
  );

  const handleClick = useCallback(() => {
    if (authenticatedUserId) {
      handleDelete(authenticatedUserId);
    }
  }, [handleDelete, authenticatedUserId]);

  return (
    <>
      <p className={styles['text']}>
        Thank you for your feedback and for being with us
      </p>
      <p className={styles['text']}>
        Are you sure you want to delete your account?
      </p>
      <div className={styles['footer']}>
        <Button label="Confirm" style="primary" onClick={handleClick} />
      </div>
    </>
  );
};

export { DeleteAccountConfirmation };
