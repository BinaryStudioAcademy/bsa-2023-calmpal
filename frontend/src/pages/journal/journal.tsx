import { Note } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  const handleClick = useCallback(() => {
    setIsNoteVisible((previous) => {
      return !previous;
    });
  }, []);

  return (
    <div className={styles['wrapper']}>
      <JournalSidebar onPlusButtonClick={handleClick} />
      <div className={styles['note-wrapper']}>
        <Note
          className={getValidClassNames(!isNoteVisible && 'visually-hidden')}
        />
      </div>
    </div>
  );
};

export { Journal };
