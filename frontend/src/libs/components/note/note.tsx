import { DataStatus } from '#libs/enums/enums.js';
import {
  debounce,
  getValidClassNames,
  sanitizeInput,
} from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useRef,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { Loader } from '../components.js';
import { NOTE_TIMEOUT } from './libs/constants.js';
import { type NoteContent } from './libs/types.js';
import styles from './styles.module.scss';

type Properties = {
  className: string;
};

const Note: React.FC<Properties> = ({ className }) => {
  const { userId, selectedJournalEntry, journalEntriesDataStatus } =
    useAppSelector(({ auth, journal }) => {
      return {
        userId: auth.authenticatedUser?.id,
        selectedJournalEntry: journal.selectedJournalEntry,
        journalEntriesDataStatus: journal.journalEntriesDataStatus,
      };
    });

  const { watch } = useAppForm({
    defaultValues: {
      title: selectedJournalEntry?.title,
      text: selectedJournalEntry?.text,
    },
    mode: 'onSubmit',
  });

  const [note, setNote] = useState<NoteContent>({
    title: watch('title') as string,
    text: watch('text') as string,
  });

  const [isChanged, setIsChanged] = useState(false);

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
              title: newNote.title,
              text: newNote.text,
            },
          }),
        );
      }
    },
    [dispatch, id, userId],
  );

  const handleSaveNoteWithDebounce = debounce((newNote: NoteContent) => {
    if (userId && id && isChanged) {
      void dispatch(
        journalActions.updateJournalEntry({
          id,
          body: {
            title: newNote.title,
            text: newNote.text,
          },
        }),
      ).then(() => {
        setIsChanged(false);
      });
    }
  }, NOTE_TIMEOUT);

  const handleTitleChange: React.FormEventHandler<HTMLDivElement> =
    useCallback(() => {
      if (titleReference.current) {
        const newTitle = titleReference.current.textContent ?? '';
        const sanitizedTitle = sanitizeInput(newTitle);

        if (sanitizedTitle.trim() && sanitizedTitle !== note.title) {
          setNote((previous) => {
            return { ...previous, title: sanitizedTitle };
          });

          setIsChanged(true);
        }
      }
    }, [note.title]);

  const handleTextChange: React.FormEventHandler<HTMLDivElement> =
    useCallback(() => {
      if (textReference.current) {
        const newText = textReference.current.textContent ?? '';
        const sanitizedText = sanitizeInput(newText);

        if (sanitizedText.trim() && sanitizedText !== note.text) {
          setNote((previous) => {
            return { ...previous, text: sanitizedText };
          });
          setIsChanged(true);
        }
      }
    }, [note.text]);

  useEffect(() => {
    handleSaveNoteWithDebounce(note);
  }, [handleSaveNoteWithDebounce, note]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      if (isChanged) {
        event.preventDefault();
        handleSaveNote(note);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isChanged, note, handleSaveNote]);

  useEffect(() => {
    void dispatch(journalActions.getAllJournalEntries()).then(() => {
      if (id) {
        void dispatch(journalActions.setSelectedJournalEntry(Number(id)));
      }
    });
  }, [dispatch, id]);

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

  if (
    journalEntriesDataStatus === DataStatus.IDLE ||
    journalEntriesDataStatus === DataStatus.PENDING
  ) {
    return <Loader />;
  }

  return (
    <div className={getValidClassNames(styles['wrapper'], className)}>
      <div
        contentEditable
        onInput={handleTitleChange}
        dangerouslySetInnerHTML={{ __html: sanitizeInput(note.title || '') }}
        className={styles['title']}
        ref={titleReference}
      />
      <div
        contentEditable
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{
          __html: sanitizeInput(note.text || ''),
        }}
        className={styles['text']}
        ref={textReference}
      />
    </div>
  );
};

export { Note };
