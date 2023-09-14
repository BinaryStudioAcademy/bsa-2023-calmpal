import { DataStatus } from '#libs/enums/enums.js';
import {
  changeCursorPosition,
  debounce,
  getCursorPosition,
  getValidClassNames,
  sanitizeInput,
} from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useFormController,
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

  const { isDirty, control } = useAppForm({
    defaultValues: {
      title: selectedJournalEntry?.title,
      text: selectedJournalEntry?.text,
    },
    mode: 'onChange',
  });

  const { field: titleField } = useFormController({ name: 'title', control });
  const { field: textField } = useFormController({ name: 'text', control });
  const { value: titleValue, onChange: onTitleChange } = titleField;
  const { value: textValue, onChange: onTextChange } = textField;

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const titleReference = useRef<HTMLDivElement | null>(null);
  const textReference = useRef<HTMLDivElement | null>(null);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const cursorPosition = useRef<number | null>(null);

  const handleSaveNote = useCallback(
    (data: NoteContent) => {
      if (data.title && data.text && id) {
        void dispatch(
          journalActions.updateJournalEntry({
            id,
            body: {
              title: sanitizeInput(data.title),
              text: sanitizeInput(data.text),
            },
          }),
        );
      }
    },
    [dispatch, id],
  );

  const handleSaveNoteWithDebounce = useCallback(
    debounce((data: NoteContent) => {
      if (userId && id && isDirty) {
        handleSaveNote(data);
      }
    }, NOTE_TIMEOUT),
    [handleSaveNote, isDirty, userId, id],
  );

  const handleTitleChange: React.FormEventHandler<HTMLDivElement> =
    useCallback(() => {
      if (titleReference.current) {
        const newTitle = titleReference.current.textContent ?? '';
        onTitleChange(newTitle);
        changeCursorPosition(cursorPosition);
      }
    }, [onTitleChange]);

  const handleTextChange: React.FormEventHandler<HTMLDivElement> =
    useCallback(() => {
      if (textReference.current) {
        const newText = textReference.current.textContent ?? '';
        onTextChange(newText);
        changeCursorPosition(cursorPosition);
      }
    }, [onTextChange]);

  useEffect(() => {
    void dispatch(journalActions.getAllJournalEntries()).then(() => {
      if (id) {
        void dispatch(journalActions.setSelectedJournalEntry(Number(id)));
      }
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      handleSaveNoteWithDebounce({ title: titleValue, text: textValue });
    }
  }, [
    handleSaveNoteWithDebounce,
    titleValue,
    textValue,
    isDirty,
    isFirstRender,
  ]);

  useEffect(() => {
    if (selectedJournalEntry) {
      onTitleChange(selectedJournalEntry.title);
      onTextChange(selectedJournalEntry.text);
    }
  }, [onTitleChange, onTextChange, selectedJournalEntry, isDirty]);

  useEffect(() => {
    if (titleReference.current && cursorPosition.current) {
      getCursorPosition(titleReference.current, cursorPosition);
    }
  }, [cursorPosition, titleValue]);

  useEffect(() => {
    if (textReference.current && cursorPosition.current) {
      getCursorPosition(textReference.current, cursorPosition);
    }
  }, [cursorPosition, textValue]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault();
      handleSaveNote({
        title: titleValue as string,
        text: textValue as string,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleSaveNoteWithDebounce.clear();
    };
  }, [handleSaveNote, handleSaveNoteWithDebounce, textValue, titleValue]);

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
        dangerouslySetInnerHTML={{ __html: titleValue ?? '' }}
        className={styles['title']}
        ref={titleReference}
      />
      <div
        contentEditable
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{ __html: textValue ?? '' }}
        className={styles['text']}
        ref={textReference}
      />
    </div>
  );
};

export { Note };
