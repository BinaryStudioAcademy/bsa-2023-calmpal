import { forwardRef } from 'react';

import { Button, Modal } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import styles from './styles.module.scss';

type Properties = {
  id: number | null;
  onSetIsSidebarShow: (value: boolean) => void;
};

const DeleteJournalModal: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  Properties
> = ({ id, onSetIsSidebarShow }, reference) => {
  const journalDeleteModalReference =
    reference as React.RefObject<HTMLDialogElement | null>;
  const dispatch = useAppDispatch();
  const handleCancel = useCallback(() => {
    journalDeleteModalReference.current?.close();
  }, [journalDeleteModalReference]);

  const { isLoading } = useAppSelector(({ journal }) => {
    return {
      isLoading: journal.deleteJournalEntryDataStatus === DataStatus.PENDING,
    };
  });

  const handleDeleteJournalEntry = useCallback(async (): Promise<void> => {
    await dispatch(journalActions.deleteJournal(id as number));
    journalDeleteModalReference.current?.close();
    onSetIsSidebarShow(true);
  }, [dispatch, id, journalDeleteModalReference, onSetIsSidebarShow]);

  return (
    <Modal
      title="Delete note?"
      ref={journalDeleteModalReference}
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
          onClick={handleDeleteJournalEntry}
        />
      </div>
    </Modal>
  );
};

const ForwardedDeleteJournalModal = forwardRef(DeleteJournalModal);

export { ForwardedDeleteJournalModal as DeleteJournalModal };
