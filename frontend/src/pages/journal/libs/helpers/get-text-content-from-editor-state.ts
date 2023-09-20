import { $getRoot } from 'lexical';

import { type EditorState } from '../types/types.js';

const getTextContentFromEditorState = (editorState: EditorState): string => {
  return editorState.read(() => {
    return $getRoot().getTextContent();
  });
};

export { getTextContentFromEditorState };
