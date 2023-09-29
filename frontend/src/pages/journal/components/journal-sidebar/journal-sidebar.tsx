import {
  Button,
  Card,
  Link,
  Search,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
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
  onSetIsSidebarShow: (value: boolean) => void;
  filter: string;
  onSetFilter: (query: string) => void;
};

const JournalSidebar: React.FC<Properties> = ({
  isSidebarShown,
  onSetIsSidebarShow,
  filter,
  onSetFilter,
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
    void dispatch(journalActions.getAllJournalEntries(filter));
  }, [dispatch, filter]);

  const handleSelectJournalEntry = useCallback(
    (id: number) => {
      return () => {
        onSetIsSidebarShow(false);
        dispatch(journalActions.setSelectedJournalEntry(id));
      };
    },
    [dispatch, onSetIsSidebarShow],
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
            iconWidth={33}
            iconHeight={33}
            style="add"
            onClick={handleCreateJournalEntry}
          />
        </SidebarHeader>
        <SidebarBody>
          <div className={styles['search']}>
            <Search onValueChange={onSetFilter} defaultValue={filter} />
          </div>
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
                    iconColor={IconColor.LIGHT_BLUE}
                    isTooltipAvailable
                  />
                </Link>
              );
            })}
          </div>
        </SidebarBody>
      </Sidebar>
      <DeleteJournalModal
        ref={dialogReference}
        id={chatToDelete}
        onSetIsSidebarShow={onSetIsSidebarShow}
      />
    </>
  );
};

export { JournalSidebar };
