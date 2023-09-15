import { BackButton, Note } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useSidebarState,
  useState,
} from '#libs/hooks/hooks.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry: journal.selectedJournalEntry,
    };
  });
  const { isSidebarShown, setIsSidebarShown } = useSidebarState();

  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShown(true);
  }, [setIsSidebarShown]);

  useEffect(() => {
    if (id) {
      setIsNoteVisible(true);
    }
  }, [dispatch, id, selectedJournalEntry, setIsSidebarShown]);

  return (
    <div className={styles['wrapper']}>
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
      </div>
      <div className={styles['note-wrapper']}>
        {isNoteVisible && (
          <Note
            className={getValidClassNames(
              !selectedJournalEntry && 'visually-hidden',
            )}
          />
        )}
      </div>
    </div>
  );
};

export { Journal };
