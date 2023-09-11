import {
  customDebounce as debounce,
  getValidClassNames,
  sanitizeInput,
} from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useRef,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { DEFAULT_NOTE_PAYLOAD, NOTE_TIMEOUT } from './libs/constants.js';
import { type NoteContent } from './libs/types.js';
import styles from './styles.module.scss';

type Properties = {
  className: string;
};

const Note: React.FC<Properties> = ({ className }) => {
  const { userId, selectedJournalEntry } = useAppSelector(
    ({ auth, journal }) => {
      return {
        userId: auth.authenticatedUser?.id,
        authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
        selectedJournalEntry: journal.selectedJournalEntry,
      };
    },
  );

  const [note, setNote] = useState<NoteContent>(
    selectedJournalEntry
      ? {
          title: selectedJournalEntry.title || DEFAULT_NOTE_PAYLOAD.title,
          text: selectedJournalEntry.text || DEFAULT_NOTE_PAYLOAD.text,
        }
      : DEFAULT_NOTE_PAYLOAD,
  );

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const titleReference = useRef<HTMLDivElement | null>(null);
  const textReference = useRef<HTMLDivElement | null>(null);

  const handleCursorPosition = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      const range = document.createRange();
      const selection = window.getSelection() as Selection;
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleSaveNote = useCallback(
    (newNote: NoteContent) => {
      if (userId && id) {
        void dispatch(
          journalActions.updateJournalEntry({
            id,
            body: {
              userId,
              title: newNote.title,
              text: newNote.text,
            },
          }),
        );
      }
    },
    [dispatch, userId, id],
  );

  const handleTitleChange: React.FormEventHandler<HTMLDivElement> = debounce(
    (event_: React.SyntheticEvent<HTMLDivElement>) => {
      if (titleReference.current) {
        const newTitle = sanitizeInput(
          (event_.target as HTMLElement).textContent as string,
        );
        if (newTitle.trim()) {
          setNote((previous) => {
            return { ...previous, title: newTitle };
          });
          handleSaveNote({ title: newTitle, text: note.text });
        }
      }
    },
    NOTE_TIMEOUT,
  );

  const handleTextChange: React.FormEventHandler<HTMLDivElement> = debounce(
    (event_: React.SyntheticEvent<HTMLDivElement>) => {
      if (textReference.current) {
        const newText = sanitizeInput(
          (event_.target as HTMLElement).textContent as string,
        );
        if (newText.trim()) {
          setNote((previous) => {
            return { ...previous, text: newText };
          });
          handleSaveNote({ title: note.title, text: newText });
        }
      }
    },
    NOTE_TIMEOUT,
  );

  useEffect(() => {
    if (selectedJournalEntry) {
      setNote({
        title: selectedJournalEntry.title,
        text: selectedJournalEntry.text,
      });
    }
  }, [selectedJournalEntry]);

  useEffect(() => {
    if (titleReference.current) {
      handleCursorPosition(titleReference.current);
    }
  }, [handleCursorPosition, note.title]);

  useEffect(() => {
    if (textReference.current) {
      handleCursorPosition(textReference.current);
    }
  }, [handleCursorPosition, note.text]);

  return (
    <div className={getValidClassNames(styles['wrapper'], className)}>
      <div
        contentEditable
        onInput={handleTitleChange}
        dangerouslySetInnerHTML={{ __html: note.title }}
        className={styles['title']}
        ref={titleReference}
      />
      <div
        contentEditable
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{ __html: note.text }}
        className={styles['text']}
        ref={textReference}
      />
    </div>
  );
};

export { Note };
