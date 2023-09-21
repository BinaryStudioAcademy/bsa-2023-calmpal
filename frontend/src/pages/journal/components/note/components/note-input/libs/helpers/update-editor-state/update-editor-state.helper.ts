import { $generateNodesFromDOM as generateNodesFromDOM } from '@lexical/html';
import {
  $createParagraphNode as createParagraphNode,
  $createTextNode as createTextNode,
  $insertNodes as insertNodes,
} from 'lexical';

import { type LexicalEditor } from '../../types/types.js';
import { getDOMParsedValueFromString } from '../get-dom-parsed-value-from-string/get-dom-parsed-value-from-string.helper.js';

type Parameters_ = {
  value: string;
  shouldParseTextHTML: boolean;
};

const updateEditorState = ({ value, shouldParseTextHTML }: Parameters_) => {
  return (editor: LexicalEditor): void => {
    editor.update(() => {
      const nodes = [];
      if (shouldParseTextHTML) {
        nodes.push(createParagraphNode(), createTextNode(value));
      } else {
        const dom = getDOMParsedValueFromString(value);

        nodes.push(...generateNodesFromDOM(editor, dom));
      }

      insertNodes(nodes);
    });
  };
};

export { updateEditorState };
