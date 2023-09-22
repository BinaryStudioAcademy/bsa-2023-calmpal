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
  useRef,
  useState,
} from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { DeleteJournalModal } from '../delete-journal-modal/delete-journal-modal.js';
import { DEFAULT_NOTE_PAYLOAD } from '../note/components/note-input/libs/constants/constants.js';
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
  const [chatToDelete, setChatToDelete] = useState<null | number>(null);
  const dialogReference = useRef<HTMLDialogElement | null>(null);
  const handleOpen = useCallback(() => {
    dialogReference.current?.showModal();
  }, [dialogReference]);
  const { allJournalEntries, selectedJournalEntry } = useAppSelector(
    ({ journal }) => {
      return {
        allJournalEntries: journal.allJournalEntries,
        selectedJournalEntry: journal.selectedJournalEntry,
      };
    },
  );

  const handleCreateJournalEntry = useCallback(() => {
    void dispatch(
      journalActions.createJournalEntry({
        title: DEFAULT_NOTE_PAYLOAD.title,
        text: DEFAULT_NOTE_PAYLOAD.text,
      }),
    );
  }, [dispatch]);

  const handleIconClick = useCallback(
    (id: number) => {
      return () => {
        setChatToDelete(id);
        handleOpen();
      };
    },
    [handleOpen],
  );

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
    <>
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
            onClick={handleCreateJournalEntry}
          />
        </SidebarHeader>
        <SidebarBody>
          <div className={styles['journal-entry-list']}>
            {allJournalEntries.map((journalEntry) => {
              const noteLink = AppRoute.JOURNAL_$ID.replace(
                ':id',
                String(journalEntry.id),
              ) as ValueOf<typeof AppRoute>;

              return (
                <Link key={journalEntry.id} to={noteLink}>
                  <Card
                    title={journalEntry.title}
                    onClick={handleSelectJournalEntry(journalEntry.id)}
                    isActive={selectedJournalEntry?.id === journalEntry.id}
                    iconRight="trash-box"
                    onIconClick={handleIconClick(journalEntry.id)}
                  />
                </Link>
              );
            })}
          </div>
        </SidebarBody>
      </Sidebar>
      <DeleteJournalModal ref={dialogReference} id={chatToDelete} />
    </>
  );
};

export { JournalSidebar };
