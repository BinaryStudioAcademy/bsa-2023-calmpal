import { forwardRef } from 'react';

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
  id: number | null;
};

const DeleteChatModal: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  Properties
> = ({ id }, reference) => {
  const chatDeleteModalReference =
    reference as React.RefObject<HTMLDialogElement | null>;
  const dispatch = useAppDispatch();
  const handleCancel = useCallback(() => {
    chatDeleteModalReference.current?.close();
  }, [chatDeleteModalReference]);

  const { isLoading } = useAppSelector(({ chats }) => {
    return {
      isLoading: chats.deleteChatDataStatus === DataStatus.PENDING,
    };
  });

  const handleDeleteChatEntry = useCallback(() => {
    void dispatch(chatActions.deleteChat(id as number)).finally(() => {
      chatDeleteModalReference.current?.close();
    });
  }, [dispatch, id, chatDeleteModalReference]);

  return (
    <Modal
      title="Delete chat?"
      ref={chatDeleteModalReference}
      isCloseIconShown={false}
    >
      <div className={styles['content']}>
        <Button
          type="button"
          label="Cancel"
          isDisabled={isLoading}
          onClick={handleCancel}
        />
        <Button
          type="submit"
          label="Delete"
          isLoading={isLoading}
          onClick={handleDeleteChatEntry}
        />
      </div>
    </Modal>
  );
};

const ForwardedDeleteChatModal = forwardRef(DeleteChatModal);

export { ForwardedDeleteChatModal as DeleteChatModal };
