import { Note } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useEffect, useParams, useState } from '#libs/hooks/hooks.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const { id } = useParams();
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  useEffect(() => {
    if (id) {
      setIsNoteVisible(true);
    }
  }, [id]);

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
