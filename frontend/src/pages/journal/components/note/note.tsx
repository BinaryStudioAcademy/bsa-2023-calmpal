import { DEFAULT_NOTE_PAYLOAD } from '~/libs/constants/constants.js';
import { debounce } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type JournalEntryCreateRequestDto } from '~/packages/journal/journal.js';
import {
  SAVE_NOTE_TIMEOUT,
  TEXT_PLACEHOLDER,
  TITLE_PLACEHOLDER,
} from '~/pages/journal/components/note/components/note-input/libs/constants/constants.js';
import { appActions } from '~/slices/app/app-notification.js';
import { actions as journalActions } from '~/slices/journal/journal.js';

import { NoteInput } from './components/components.js';
import styles from './styles.module.scss';

const Note: React.FC = () => {
  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry: journal.selectedJournalEntry,
    };
  });

  const { control, watch, isDirty } = useAppForm({
    defaultValues: {
      title: selectedJournalEntry?.title ?? DEFAULT_NOTE_PAYLOAD.title,
      text: selectedJournalEntry?.text ?? DEFAULT_NOTE_PAYLOAD.text,
    },
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { title: titleValue, text: textValue } = watch();

  const handleNoteError = useCallback(
    (error: Error) => {
      void dispatch(
        appActions.notify({ type: 'error', message: error.message }),
      );
    },
    [dispatch],
  );

  const handleSaveNote = useCallback(
    (data: JournalEntryCreateRequestDto) => {
      if (!id) {
        void dispatch(
          journalActions.createJournalEntry({
            title: data.title,
            text: data.text,
          }),
        );

        return;
      }

      void dispatch(
        journalActions.updateJournalEntry({
          id: Number(id),
          title: data.title,
          text: data.text,
        }),
      );
    },
    [id, dispatch],
  );

  const handleSaveNoteWithDebounce = useMemo(() => {
    return debounce(handleSaveNote, SAVE_NOTE_TIMEOUT);
  }, [handleSaveNote]);

  useEffect(() => {
    if (isDirty) {
      handleSaveNoteWithDebounce({
        title: titleValue,
        text: textValue,
      });
    }
  }, [titleValue, textValue, handleSaveNoteWithDebounce, isDirty]);

  useEffect(() => {
    const handleBeforeUnload = (): void => {
      if (isDirty) {
        handleSaveNote({
          title: titleValue,
          text: textValue,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id, textValue, titleValue, handleSaveNote, isDirty]);

  return (
    <div className={styles['wrapper']}>
      <NoteInput
        name="title"
        placeholder={TITLE_PLACEHOLDER}
        control={control}
        shouldParseTextHTML
        contentEditableStyle={styles['title']}
        onError={handleNoteError}
      />
      <NoteInput
        name="text"
        placeholder={TEXT_PLACEHOLDER}
        control={control}
        contentEditableStyle={styles['text']}
        onError={handleNoteError}
      />
    </div>
  );
};

export { Note };
