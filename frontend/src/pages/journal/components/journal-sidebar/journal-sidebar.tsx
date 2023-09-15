import { Button, Card, Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/app-route.enum.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { DEFAULT_NOTE_PAYLOAD } from '#pages/journal/libs/constants/constants.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import styles from './styles.module.scss';

const JournalSidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { allJournalEntries, selectedJournalEntry, userId } = useAppSelector(
    ({ journal, auth }) => {
      return {
        userId: (auth.authenticatedUser as UserAuthResponseDto).id,
        allJournalEntries: journal.allJournalEntries,
        selectedJournalEntry: journal.selectedJournalEntry,
      };
    },
  );

  const handlePlusButtonClick = useCallback(() => {
    if (userId) {
      void dispatch(
        journalActions.createJournalEntry({
          title: DEFAULT_NOTE_PAYLOAD.title,
          text: DEFAULT_NOTE_PAYLOAD.text,
        }),
      );
    }
  }, [dispatch, userId]);

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
          onClick={handlePlusButtonClick}
        />
      </div>
      <div className={styles['list']}>
        <div className={styles['journal-entry-list']}>
          {allJournalEntries.map((journalEntry) => {
            const noteLink = AppRoute.JOURNAL_ENTRY_$ID.replace(
              ':id',
              String(journalEntry.id),
            ) as typeof AppRoute.JOURNAL_ENTRY_$ID;

            return (
              <Link key={journalEntry.id} to={noteLink}>
                <Card
                  title={journalEntry.title}
                  onClick={handleSelectJournalEntry(journalEntry.id)}
                  isActive={selectedJournalEntry?.id === journalEntry.id}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { JournalSidebar };
