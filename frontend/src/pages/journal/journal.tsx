import { BackButton } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useParams,
  useSidebarState,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import { Note } from './components/note/note.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSidebarShown, setIsSidebarShown } = useSidebarState();

  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry: journal.selectedJournalEntry,
    };
  });

  const hasSelectedNote = Boolean(id) && selectedJournalEntry;

  const handleBackButtonPress = useCallback(() => {
    navigate(AppRoute.JOURNAL);
    setIsSidebarShown(true);
  }, [setIsSidebarShown, navigate]);

  const handleGetSelectedNote = useCallback(async () => {
    await dispatch(journalActions.getAllJournalEntries());

    dispatch(journalActions.setSelectedJournalEntry(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    void handleGetSelectedNote();
  }, [handleGetSelectedNote, id]);

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
        {hasSelectedNote && (
          <div className={styles['note-wrapper']}>
            <Note />
          </div>
        )}
      </div>
    </>
  );
};

export { Journal };
