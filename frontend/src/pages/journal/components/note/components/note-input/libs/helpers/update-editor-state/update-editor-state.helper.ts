import { $generateNodesFromDOM as generateNodesFromDOM } from '@lexical/html';
import {
  $createParagraphNode as createParagraphNode,
  $createTextNode as createTextNode,
  $getRoot as getRoot,
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
      if (shouldParseTextHTML) {
        const root = getRoot();
        const paragraphNode = createParagraphNode();
        const textNode = createTextNode(value);

        paragraphNode.append(textNode);
        root.append(paragraphNode);
      } else {
        const dom = getDOMParsedValueFromString(value);
        const nodes = generateNodesFromDOM(editor, dom);

        insertNodes(nodes);
      }
    });
  };
};

export { updateEditorState };
