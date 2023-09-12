import { Note } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/app-route.enum.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as appActions } from '#slices/app/app.js';

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
      if (selectedJournalEntry) {
        setIsNoteVisible(true);
      } else {
        dispatch(appActions.navigate(AppRoute.JOURNAL));
      }
    }
  }, [dispatch, id, selectedJournalEntry]);

  return (
    <div className={styles['wrapper']}>
      <JournalSidebar />
      <div className={styles['note-wrapper']}>
        {isNoteVisible && (
          <Note className={getValidClassNames(!id && 'visually-hidden')} />
        )}
      </div>
    </div>
  );
};

export { Journal };
