import { Button } from '#libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { type UserDeleteRequestDto } from '#packages/users/users.js';
import { actions as userActions } from '#slices/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  onClose?: () => void;
};

const DeleteAccountConfirmation: React.FC<Properties> = ({ onClose }) => {
  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser,
    };
  });

  const authenticatedUserId = authenticatedUser?.id;

  const dispatch = useAppDispatch();
  const handleDelete = useCallback(
    (payload: UserDeleteRequestDto): void => {
      void dispatch(userActions.deleteUser(payload));
      onClose?.();
    },
    [dispatch, onClose],
  );

  const handleClick = useCallback(() => {
    if (authenticatedUserId) {
      handleDelete({ id: authenticatedUserId });
    }
  }, [handleDelete, authenticatedUserId]);

  return (
    <div className={styles['modal-body']}>
      <p className={styles['text']}>
        Thank you for your feedback and for being with us
      </p>
      <p className={styles['text']}>
        Are you sure you want to delete your account?
      </p>
      <div className={styles['footer']}>
        <Button label="Confirm" style="primary" onClick={handleClick} />
      </div>
    </div>
  );
};

export { DeleteAccountConfirmation };
