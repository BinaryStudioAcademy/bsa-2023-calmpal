import { forwardRef } from 'react';

import { Button, Modal } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
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

  const { isLoading, deleteChatDataStatus } = useAppSelector(({ chats }) => {
    return {
      isLoading: chats.deleteChatDataStatus === DataStatus.PENDING,
      deleteChatDataStatus: chats.deleteChatDataStatus,
    };
  });

  const handleDeleteChatEntry = useCallback(() => {
    void dispatch(chatActions.deleteChat(id as number));
  }, [dispatch, id]);

  useEffect(() => {
    if (deleteChatDataStatus === DataStatus.FULFILLED) {
      chatDeleteModalReference.current?.close();
    }
  }, [deleteChatDataStatus, chatDeleteModalReference]);

  return (
    <Modal
      title="Delete chat?"
      ref={chatDeleteModalReference}
      isCloseEnabled={false}
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
