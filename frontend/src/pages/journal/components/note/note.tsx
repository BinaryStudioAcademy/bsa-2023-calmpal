import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useDebounce,
  useEffect,
  useParams,
} from '#libs/hooks/hooks.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
} from '#packages/journal/journal.js';
import {
  DEFAULT_NOTE_PAYLOAD,
  SAVE_NOTE_TIMEOUT,
} from '#pages/journal/components/note/components/note-input/libs/constants/constants.js';
import { appActions } from '#slices/app/app-notification.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import { NoteInput } from './components/components.js';
import styles from './styles.module.scss';

const Note: React.FC = () => {
  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry:
        journal.selectedJournalEntry as JournalEntryGetAllItemResponseDto,
    };
  });

  const { control, watch, isDirty } = useAppForm({
    defaultValues: {
      title: selectedJournalEntry.title,
      text: selectedJournalEntry.text,
    },
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { title: titleValue, text: textValue } = watch();
  const debouncedTitleValue = useDebounce(titleValue, SAVE_NOTE_TIMEOUT);
  const debouncedTextValue = useDebounce(textValue, SAVE_NOTE_TIMEOUT);

  const handleNoteError = useCallback(
    (error: Error) => {
      void dispatch(
        appActions.notify({ type: 'error', message: error.message }),
      );
    },
    [dispatch],
  );

  const handleSaveNote = useCallback(
    (id: string, data: JournalEntryCreateRequestDto) => {
      void dispatch(
        journalActions.updateJournalEntry({
          id: Number(id),
          title: data.title || DEFAULT_NOTE_PAYLOAD.title,
          text: data.text,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (id && isDirty) {
      handleSaveNote(id, {
        title: debouncedTitleValue,
        text: debouncedTextValue,
      });
    }
  }, [debouncedTextValue, debouncedTitleValue, handleSaveNote, id, isDirty]);

  useEffect(() => {
    const handleBeforeUnload = (): void => {
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
      <NoteInput
        name="title"
        placeholder={DEFAULT_NOTE_PAYLOAD.title}
        control={control}
        shouldParseTextHTML
        contentEditableStyle={styles['title']}
        onError={handleNoteError}
      />
      <NoteInput
        name="text"
        placeholder={DEFAULT_NOTE_PAYLOAD.text}
        control={control}
        contentEditableStyle={styles['text']}
        onError={handleNoteError}
      />
    </div>
  );
};

export { Note };
