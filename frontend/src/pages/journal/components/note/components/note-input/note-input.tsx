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
  getDOMParsedValueFromString,
  updateEditorState,
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
  shouldParseTextHTML?: boolean;
  contentEditableStyle?: string | undefined;
  onError: (error: Error) => void;
};

const NoteInput = <T extends FormFieldValues>({
  placeholder,
  name,
  control,
  shouldParseTextHTML = false,
  contentEditableStyle,
  onError,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const { value, onChange } = field;

  const handleChange = useCallback(
    (newValue: string) => {
      let valueToPass = newValue;

      if (shouldParseTextHTML) {
        const dom = getDOMParsedValueFromString(newValue);

        valueToPass = dom.body.textContent as string;
      }

      onChange(valueToPass);
    },
    [shouldParseTextHTML, onChange],
  );

  const handleEditorState = useCallback(
    (editor: LexicalEditor) => {
      updateEditorState({ value, shouldParseTextHTML })(editor);
    },
    [value, shouldParseTextHTML],
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
