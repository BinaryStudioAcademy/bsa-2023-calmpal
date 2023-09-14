import { Note } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
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

  useEffect(() => {
    if (id) {
      setIsNoteVisible(true);
    }
  }, [dispatch, id, selectedJournalEntry]);

  return (
    <div className={styles['wrapper']}>
      <JournalSidebar />
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
