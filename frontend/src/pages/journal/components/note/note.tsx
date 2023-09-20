import {
  changeCursorPosition,
  debounce,
  sanitizeInput,
  setCursorPosition,
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
} from '#libs/hooks/hooks.js';
import { type JournalEntryGetAllItemResponseDto } from '#packages/journal/journal.js';
import {
  DEFAULT_NOTE_PAYLOAD,
  SAVE_NOTE_TIMEOUT,
} from '#pages/journal/libs/constants/constants.js';
import { type NoteContent } from '#pages/journal/libs/types/types.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import styles from './styles.module.scss';

const Note: React.FC = () => {
  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry:
        journal.selectedJournalEntry as JournalEntryGetAllItemResponseDto,
    };
  });

  const { control } = useAppForm({
    defaultValues: {
      title: selectedJournalEntry.title,
      text: selectedJournalEntry.text,
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
  const cursorPosition = useRef(null);

  const handleSaveNote = useCallback(
    (id: string, data: NoteContent) => {
      void dispatch(
        journalActions.updateJournalEntry({
          id: Number(id),
          title: sanitizeInput(data.title || DEFAULT_NOTE_PAYLOAD.title),
          text: data.text ? sanitizeInput(data.text) : undefined,
        }),
      );
    },
    [dispatch],
  );

  const handleNoteChange = useCallback(
    (
      elementReference: React.MutableRefObject<HTMLDivElement | null>,
      onChange: (value: string) => void,
    ): void => {
      if (elementReference.current) {
        const newValue = elementReference.current.textContent ?? '';
        onChange(newValue);
        changeCursorPosition(cursorPosition);
      }
    },
    [],
  );

  const handleTitleChange = useCallback(() => {
    handleNoteChange(titleReference, onTitleChange);
  }, [handleNoteChange, onTitleChange]);

  const handleTextChange = useCallback(() => {
    handleNoteChange(textReference, onTextChange);
  }, [handleNoteChange, onTextChange]);

  useEffect(() => {
    const handleSaveNoteWithDebounce = debounce((data: NoteContent) => {
      if (id) {
        handleSaveNote(id, data);
      }
    }, SAVE_NOTE_TIMEOUT);

    handleSaveNoteWithDebounce({ title: titleValue, text: textValue });

    return () => {
      handleSaveNoteWithDebounce.clear();
    };
  }, [titleValue, textValue, id, handleSaveNote]);

  useEffect(() => {
    if (selectedJournalEntry.id) {
      onTitleChange(selectedJournalEntry.title);
      onTextChange(selectedJournalEntry.text);
    }
  }, [onTitleChange, onTextChange, selectedJournalEntry]);

  useEffect(() => {
    if (titleReference.current) {
      setCursorPosition(titleReference.current, cursorPosition);
    }
  }, [titleValue]);

  useEffect(() => {
    if (textReference.current) {
      setCursorPosition(textReference.current, cursorPosition);
    }
  }, [textValue]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault();
      handleSaveNote(id as string, {
        title: titleValue,
        text: textValue,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id, textValue, titleValue, handleSaveNote]);

  return (
    <div className={styles['wrapper']}>
      <div
        contentEditable
        onInput={handleTitleChange}
        dangerouslySetInnerHTML={{ __html: titleValue }}
        className={styles['title']}
        ref={titleReference}
      />
      <div
        contentEditable
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{ __html: textValue }}
        className={styles['text']}
        ref={textReference}
      />
    </div>
  );
};

export { Note };
