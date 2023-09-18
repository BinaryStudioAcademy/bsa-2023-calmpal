import {
  Card,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useRef,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { DeleteJournalModal } from '../delete-journal-modal/delete-journal-modal.js';
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

  const [deletedChat, setDeleteChat] = useState<null | number>(null);
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
  const handleIconClick = useCallback(
    (id: number) => {
      return () => {
        setDeleteChat(id);
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
        </SidebarHeader>
        <SidebarBody>
          <div className={styles['journal-entry-list']}>
            {allJournalEntries.map((journalEntry) => {
              return (
                <Card
                  title={journalEntry.title}
                  onClick={handleSelectJournalEntry(journalEntry.id)}
                  isActive={selectedJournalEntry?.id === journalEntry.id}
                  key={journalEntry.id}
                  iconRight="trash-box"
                  onIconClick={handleIconClick(journalEntry.id)}
                />
              );
            })}
          </div>
        </SidebarBody>
      </Sidebar>
      <DeleteJournalModal ref={dialogReference} id={deletedChat} />
    </>
  );
};

export { JournalSidebar };
