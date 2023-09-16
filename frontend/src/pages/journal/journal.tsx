import { BackButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useSidebarState,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import { Note } from './components/note/note.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { isSidebarShown, setIsSidebarShown } = useSidebarState();

  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry: journal.selectedJournalEntry,
    };
  });

  const hasNoteId = Boolean(id) && selectedJournalEntry;

  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShown(true);
  }, [setIsSidebarShown]);

  useEffect(() => {
    void dispatch(journalActions.getAllJournalEntries()).then(() => {
      if (id) {
        void dispatch(journalActions.setSelectedJournalEntry(Number(id)));
      }
    });
  }, [dispatch, id]);

  return (
    <>
      <JournalSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackButton onGoBack={handleBackButtonPress} />
        {hasNoteId && (
          <div className={styles['note-wrapper']}>
            <Note />
          </div>
        )}
      </div>
    </>
  );
};

export { Journal };
