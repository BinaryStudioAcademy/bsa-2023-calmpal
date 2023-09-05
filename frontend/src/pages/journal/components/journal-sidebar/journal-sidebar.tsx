import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { JournalCard } from '../journal-card/journal-card.js';
import styles from './styles.module.scss';

const JournalSidebar: React.FC = () => {
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
      </div>
      <div className={styles['list']}>
        <div className={styles['journal-entry-list']}>
          {allJournalEntries.map((journalEntry) => {
            return (
              <JournalCard
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
