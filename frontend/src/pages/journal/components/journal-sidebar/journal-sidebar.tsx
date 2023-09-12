import { Button, Card } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/app-route.enum.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import { notification } from '#libs/packages/notification/notification.js';
import { type ValueOf } from '#libs/types/value-of.type.js';
import { DEFAULT_NOTE_PAYLOAD } from '#pages/journal/libs/constants/constants.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import styles from './styles.module.scss';

const JournalSidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  const { allJournalEntries, selectedJournalEntry, userId } = useAppSelector(
    ({ journal, auth }) => {
      return {
        userId: auth.authenticatedUser?.id,
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

    notification.success('New note has been created');
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
            return (
              <Card
                title={journalEntry.title}
                onClick={handleSelectJournalEntry(journalEntry.id)}
                isActive={selectedJournalEntry?.id === journalEntry.id}
                key={journalEntry.id}
                linkTo={
                  `${AppRoute.JOURNAL}/${journalEntry.id}` as ValueOf<
                    typeof AppRoute
                  >
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { JournalSidebar };
