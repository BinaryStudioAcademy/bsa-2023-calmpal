import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useDebounce,
  useEffect,
  useFormController,
  useParams,
} from '#libs/hooks/hooks.js';
import { type JournalEntryGetAllItemResponseDto } from '#packages/journal/journal.js';
import {
  DEFAULT_NOTE_PAYLOAD,
  SAVE_NOTE_TIMEOUT,
} from '#pages/journal/libs/constants/constants.js';
import {
  $createParagraphNode,
  $createTextNode,
  $generateNodesFromDOM,
  $getRoot,
  $insertNodes,
} from '#pages/journal/libs/helpers/helpers.js';
import {
  OnChangePlugin,
  PlainTextPlugin,
} from '#pages/journal/libs/plugins/plugins.js';
import {
  type LexicalEditor,
  type NoteContent,
} from '#pages/journal/libs/types/types.js';
import { appActions } from '#slices/app/app-notification.js';
import { actions as journalActions } from '#slices/journal/journal.js';

import {
  ContentEditable,
  LexicalComposer,
  NoteErrorBoundary,
} from '../components.js';
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
    (id: string, data: NoteContent) => {
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

  const handleTitleChange = useCallback(
    (newValue: string) => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(newValue, 'text/html');

      onTitleChange(dom.body.textContent);
    },
    [onTitleChange],
  );

  const handleTextChange = useCallback(
    (newValue: string) => {
      onTextChange(newValue);
    },
    [onTextChange],
  );

  useEffect(() => {
    if (id) {
      handleSaveNote(id, {
        title: debouncedTitleValue,
        text: debouncedTextValue,
      });
    }
  }, [debouncedTextValue, debouncedTitleValue, handleSaveNote, id]);

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
      <div className={styles['text-area']}>
        <LexicalComposer
          initialConfig={{
            namespace: 'NoteTitleEditor',
            onError: handleNoteError,
            theme: {
              paragraph: styles['paragraph'] as string,
            },
            editorState: (editor: LexicalEditor): void => {
              editor.update(() => {
                const root = $getRoot();
                const paragraphNode = $createParagraphNode();
                const textNode = $createTextNode(titleValue);

                paragraphNode.append(textNode);
                root.append(paragraphNode);
              });
            },
          }}
        >
          <PlainTextPlugin
            contentEditable={<ContentEditable className={styles['title']} />}
            placeholder={
              <div className={styles['placeholder']}>
                {DEFAULT_NOTE_PAYLOAD.title}
              </div>
            }
            ErrorBoundary={NoteErrorBoundary}
          />
          <OnChangePlugin onChange={handleTitleChange} />
        </LexicalComposer>
      </div>
      <div className={styles['text-area']}>
        <LexicalComposer
          initialConfig={{
            namespace: 'NoteTextEditor',
            onError: handleNoteError,
            theme: {
              paragraph: styles['paragraph'] as string,
            },
            editorState: (editor: LexicalEditor): void => {
              editor.update(() => {
                const parser = new DOMParser();
                const dom = parser.parseFromString(textValue, 'text/html');
                const nodes = $generateNodesFromDOM(editor, dom);

                $getRoot().select();
                $insertNodes(nodes);
              });
            },
          }}
        >
          <PlainTextPlugin
            contentEditable={<ContentEditable className={styles['text']} />}
            placeholder={
              <div className={styles['placeholder']}>Type your text here</div>
            }
            ErrorBoundary={NoteErrorBoundary}
          />
          <OnChangePlugin onChange={handleTextChange} />
        </LexicalComposer>
      </div>
    </div>
  );
};

export { Note };
