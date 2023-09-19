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
};

const DeleteJournalModal: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  Properties
> = ({ id }, reference) => {
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

  const handleDeleteJournalEntry = useCallback(() => {
    void dispatch(journalActions.deleteJournal(id as number)).finally(() => {
      journalDeleteModalReference.current?.close();
    });
  }, [dispatch, id, journalDeleteModalReference]);

  return (
    <Modal
      title="Delete note?"
      ref={journalDeleteModalReference}
      showCrossIcon={false}
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
