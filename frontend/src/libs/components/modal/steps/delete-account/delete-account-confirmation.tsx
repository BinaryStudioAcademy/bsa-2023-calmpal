import { type FC } from 'react';

import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { type UserDeleteRequestDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import styles from './styles.module.scss';

type DeleteAccountProperties = {
  onClose?: () => void;
};

const DeleteAccount: FC<DeleteAccountProperties> = ({ onClose }) => {
  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser,
    };
  });

  const authenticatedUserId = authenticatedUser?.id;

  const dispatch = useAppDispatch();
  const handleDelete = useCallback(
    (payload: UserDeleteRequestDto): void => {
      void dispatch(authActions.deleteUser(payload));
      if (onClose) {
        onClose();
      }
    },
    [dispatch, onClose],
  );

  const handleclick = useCallback(() => {
    if (authenticatedUserId) {
      handleDelete({ id: authenticatedUserId });
    }
  }, [handleDelete, authenticatedUserId]);

  return (
    <div className={styles['modal-body']}>
      <p>Thank you for your feedback and for being with us</p>
      <p>are you sure you want to delete your account?</p>
      <div className={styles['footer']}>
        <button onClick={handleclick} className={styles['button']}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export { DeleteAccount };
