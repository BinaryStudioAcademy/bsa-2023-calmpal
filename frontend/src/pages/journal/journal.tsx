import { BackButtonWrapper, Loader } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useNavigate,
  useParams,
  useSearch,
  useSidebarState,
} from '~/libs/hooks/hooks.js';
import { actions as journalActions } from '~/slices/journal/journal.js';

import { JournalSidebar, Note } from './components/components.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isSidebarShown, setIsSidebarShow } = useSidebarState();
  const { filter, setFilter } = useSearch();

  const { selectedJournalEntry, journalEntriesDataStatus } = useAppSelector(
    ({ journal }) => {
      return {
        selectedJournalEntry: journal.selectedJournalEntry,
        journalEntriesDataStatus: journal.journalEntriesDataStatus,
      };
    },
  );

  const isLoading =
    journalEntriesDataStatus === DataStatus.IDLE ||
    journalEntriesDataStatus === DataStatus.PENDING ||
    Boolean(id) !== Boolean(selectedJournalEntry);

  const handleBackButtonPress = useCallback(() => {
    dispatch(journalActions.setSelectedJournalEntry(null));
    navigate(AppRoute.JOURNAL);
    setIsSidebarShow(true);
  }, [setIsSidebarShow, dispatch, navigate]);

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
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles['note-wrapper']}>
            <Note key={id} />
          </div>
        )}
      </div>
    </>
  );
};

export { Journal };
