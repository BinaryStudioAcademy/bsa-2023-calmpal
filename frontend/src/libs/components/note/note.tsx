import {
  EMPTY_ARRAY_LENGTH,
  FIRST_ARRAY_INDEX,
} from '#libs/constants/constants.js';
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

  const handleCursorPosition = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      const range = document.createRange();
      const selection = window.getSelection() as Selection;

      if (cursorPosition.current) {
        if (element.firstChild) {
          range.setStart(element.firstChild, cursorPosition.current);
        }

        range.collapse(true);
        cursorPosition.current = null;
      } else {
        range.selectNodeContents(element);
        range.collapse(false);
      }

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleChangeCursorPosition = (): void => {
    const selection = window.getSelection() as Selection;
    if (selection.rangeCount > EMPTY_ARRAY_LENGTH) {
      const range = selection.getRangeAt(FIRST_ARRAY_INDEX);
      cursorPosition.current = range.startOffset;
    }
  };

  const handleSaveNote = useCallback(
    (data: NoteContent) => {
      if (userId && id) {
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
    [dispatch, id, userId],
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
        handleChangeCursorPosition();
      }
    }, [onTitleChange]);

  const handleTextChange: React.FormEventHandler<HTMLDivElement> =
    useCallback(() => {
      if (textReference.current) {
        const newText = textReference.current.textContent ?? '';
        onTextChange(newText);
        handleChangeCursorPosition();
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
      handleCursorPosition(titleReference.current);
    }
  }, [handleCursorPosition, titleValue]);

  useEffect(() => {
    if (textReference.current && cursorPosition.current) {
      handleCursorPosition(textReference.current);
    }
  }, [handleCursorPosition, textValue]);

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
