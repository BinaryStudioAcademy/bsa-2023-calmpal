import { BackButtonWrapper } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigate,
  useParams,
  useSearch,
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
  const { isSidebarShown, setIsSidebarShow } = useSidebarState();
  const { filter, setFilter } = useSearch();

  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry: journal.selectedJournalEntry,
    };
  });

  const hasSelectedNote = Boolean(id) && selectedJournalEntry;

  const handleBackButtonPress = useCallback(() => {
    navigate(AppRoute.JOURNAL);
    setIsSidebarShow(true);
  }, [setIsSidebarShow, navigate]);

  const handleGetSelectedNote = useCallback(async () => {
    await dispatch(journalActions.getAllJournalEntries(filter));

    dispatch(journalActions.setSelectedJournalEntry(Number(id)));
  }, [dispatch, filter, id]);

  useEffect(() => {
    void handleGetSelectedNote();
  }, [handleGetSelectedNote, id]);

  return (
    <>
      <JournalSidebar
        isSidebarShown={isSidebarShown}
        onSetIsSidebarShow={setIsSidebarShow}
        filter={filter}
        onSetFilter={setFilter}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackButtonWrapper onGoBack={handleBackButtonPress} />
        {hasSelectedNote && (
          <div className={styles['note-wrapper']}>
            <Note key={id} />
          </div>
        )}
      </div>
    </>
  );
};

export { Journal };
