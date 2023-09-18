import {
  Button,
  Card,
  Link,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/app-route.enum.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { DEFAULT_NOTE_PAYLOAD } from '#pages/journal/libs/constants/constants.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const JournalSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
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
        setIsSidebarShown(false);
        dispatch(journalActions.setSelectedJournalEntry(id));
      };
    },
    [dispatch, setIsSidebarShown],
  );

  return (
    <Sidebar isSidebarShown={isSidebarShown}>
      <SidebarHeader>
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
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['journal-entry-list']}>
          {allJournalEntries.map((journalEntry) => {
            const noteLink = AppRoute.JOURNAL_ENTRY_$ID.replace(
              ':id',
              String(journalEntry.id),
            ) as ValueOf<typeof AppRoute>;

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
      </SidebarBody>
    </Sidebar>
  );
};

export { JournalSidebar };
