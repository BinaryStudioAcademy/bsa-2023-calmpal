import { Button, Card } from '#libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import styles from './styles.module.scss';

type Properties = {
  onPlusButtonClick: () => void;
};

const JournalSidebar: React.FC<Properties> = ({ onPlusButtonClick }) => {
  const dispatch = useAppDispatch();
  const { allJournalEntries, selectedJournalEntry } = useAppSelector(
    ({ journal }) => {
      return {
        allJournalEntries: journal.allJournalEntries,
        selectedJournalEntry: journal.selectedJournalEntry,
      };
    },
  );

  useEffect(() => {
    void dispatch(journalActions.getAllJournalEntries());
  }, [dispatch]);

  const handleSelectJournalEntry = useCallback(
    (id: number) => {
      return () => {
        dispatch(journalActions.setSelectedJournalEntry(id));
      };
    },
    [dispatch],
  );

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['info']}>
          <span>Journal</span>
        </div>
        <Button
          label="Add note"
          isLabelVisuallyHidden
          iconName="plus"
          style="add"
          onClick={onPlusButtonClick}
        />
      </div>
      <div className={styles['list']}>
        <div className={styles['journal-entry-list']}>
          {allJournalEntries.map((journalEntry) => {
            return (
              <Card
                title={journalEntry.title}
                onClick={handleSelectJournalEntry(journalEntry.id)}
                isActive={selectedJournalEntry?.id === journalEntry.id}
                key={journalEntry.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { JournalSidebar };
