import { Button, Modal } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { actions as chatActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

type Properties = {
  reference: React.RefObject<HTMLDialogElement>;
  id: number | null;
};

const DeleteChatModal: React.FC<Properties> = ({ reference, id }) => {
  const dispatch = useAppDispatch();
  const handleCancel = useCallback(() => {
    reference.current?.close();
  }, [reference]);

  const { isLoading } = useAppSelector(({ chats }) => {
    return {
      isLoading: chats.deleteChatDataStatus === DataStatus.PENDING,
    };
  });

  const handleDeleteChatEntry = useCallback(async () => {
    await dispatch(chatActions.deleteChat(id as number));
    reference.current?.close();
  }, [dispatch, id, reference]);

  return (
    <Modal title="Delete Chat?" reference={reference} showCrossIcon={false}>
      <div className={styles['content']}>
        <Button
          type="button"
          label="Cancel"
          onClick={handleCancel}
          isLoading={isLoading}
        />
        <Button
          type="submit"
          label="Delete"
          onClick={handleDeleteChatEntry}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  );
};

export { DeleteChatModal };
