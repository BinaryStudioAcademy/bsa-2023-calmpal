import ContentEditable from 'react-contenteditable';

import { debounce, sanitizeInput } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useRef,
  useState,
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

  const [titleValue, setTitleValue] = useState<string>(
    selectedJournalEntry.title,
  );
  const [textValue, setTextValue] = useState<string>(selectedJournalEntry.text);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const titleReference = useRef<HTMLDivElement | null>(null);
  const textReference = useRef<HTMLDivElement | null>(null);

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

  const handleTitleChange = useCallback(
    (event_: React.FormEvent<HTMLDivElement>): void => {
      const newValue = event_.currentTarget.innerHTML;
      setTitleValue(newValue);
    },
    [],
  );

  const handleTextChange = useCallback(
    (event_: React.FormEvent<HTMLDivElement>): void => {
      const newValue = event_.currentTarget.innerHTML;
      setTextValue(newValue);
    },
    [],
  );

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
      setTitleValue(selectedJournalEntry.title);
      setTextValue(selectedJournalEntry.text);
    }
  }, [
    selectedJournalEntry.id,
    selectedJournalEntry.text,
    selectedJournalEntry.title,
  ]);

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
  }, [handleSaveNote, id, textValue, titleValue]);

  return (
    <div className={styles['wrapper']}>
      <ContentEditable
        onChange={handleTitleChange}
        html={titleValue}
        innerRef={titleReference}
        className={styles['title']}
      />
      <ContentEditable
        onChange={handleTextChange}
        html={textValue}
        innerRef={textReference}
        className={styles['text']}
      />
    </div>
  );
};

export { Note };
