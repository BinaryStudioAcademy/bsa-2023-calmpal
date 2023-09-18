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
  reference: React.RefObject<HTMLDialogElement>;
  id: number | null;
};

const DeleteJournalModal: React.FC<Properties> = ({ reference, id }) => {
  const dispatch = useAppDispatch();
  const handleCancel = useCallback(() => {
    reference.current?.close();
  }, [reference]);

  const { isLoading } = useAppSelector(({ journal }) => {
    return {
      isLoading: journal.deleteJournalEntryDataStatus === DataStatus.PENDING,
    };
  });

  const handleDeleteJournalEntry = useCallback(() => {
    void dispatch(journalActions.deleteJournal(id as number)).finally(() => {
      reference.current?.close();
    });
  }, [dispatch, id, reference]);

  return (
    <Modal title="Delete Note?" reference={reference} showCrossIcon={false}>
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

export { DeleteJournalModal };
