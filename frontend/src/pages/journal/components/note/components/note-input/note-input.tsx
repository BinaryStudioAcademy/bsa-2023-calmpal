import { useCallback, useFormController } from '#libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types.js';

import {
  ContentEditable,
  LexicalComposer,
  LexicalErrorBoundary,
  PlainTextPlugin,
} from './components/components.js';
import {
  createParagraphNode,
  createTextNode,
  getRoot,
} from './libs/helpers/helpers.js';
import { OnChangePlugin } from './libs/plugins/plugins.js';
import {
  type ErrorBoundaryType,
  type LexicalEditor,
} from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  name: FormFieldPath<T>;
  control: FormControl<T, null>;
  placeholder: string;
  contentEditableStyle?: string | undefined;
  onError: (error: Error) => void;
};

const NoteInput = <T extends FormFieldValues>({
  placeholder,
  name,
  control,
  contentEditableStyle,
  onError,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const { value, onChange } = field;

  const handleChange = useCallback(
    (newValue: string) => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(newValue, 'text/html');

      onChange(dom.body.textContent);
    },
    [onChange],
  );

  const handleEditorState = useCallback(
    (editor: LexicalEditor): void => {
      editor.update(() => {
        const root = getRoot();
        const paragraphNode = createParagraphNode();
        const textNode = createTextNode(value);

        paragraphNode.append(textNode);
        root.append(paragraphNode);
      });
    },
    [value],
  );

  return (
    <div className={styles['text-area']}>
      <LexicalComposer
        initialConfig={{
          namespace: `note-${name}`,
          onError,
          theme: { paragraph: styles['paragraph'] as string },
          editorState: handleEditorState,
        }}
      >
        <PlainTextPlugin
          contentEditable={<ContentEditable className={contentEditableStyle} />}
          placeholder={
            <div className={styles['placeholder']}>{placeholder}</div>
          }
          ErrorBoundary={LexicalErrorBoundary as unknown as ErrorBoundaryType}
        />
        <OnChangePlugin onChange={handleChange} />
      </LexicalComposer>
    </div>
  );
};

export { NoteInput };
