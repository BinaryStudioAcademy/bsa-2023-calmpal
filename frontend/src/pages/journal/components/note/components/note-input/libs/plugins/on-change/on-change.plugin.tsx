import { sanitizeInput } from '~/libs/helpers/helpers.js';
import { useEffect } from '~/libs/hooks/hooks.js';

import { NOTE_SANITIZER_OPTIONS } from '../../constants/constants.js';
import { generateHtmlFromNodes } from '../../helpers/helpers.js';
import { useLexicalComposerContext } from '../../hooks/hooks.js';

type Properties = {
  onChange: (newValue: string) => void;
};

const OnChangePlugin: React.FC<Properties> = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = generateHtmlFromNodes(editor);
        const sanitizedValue = sanitizeInput(html, NOTE_SANITIZER_OPTIONS);

        onChange(sanitizedValue);
      });
    });
  }, [editor, onChange]);

  return null;
};

export { OnChangePlugin };
