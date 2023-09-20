import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

import { type LexicalEditor } from '../types/types.js';

const convertTextToNode = (text: string) => {
  return (editor: LexicalEditor): void => {
    editor.update(() => {
      const root = $getRoot();
      const paragraphNode = $createParagraphNode();
      const textNode = $createTextNode(text);
      paragraphNode.append(textNode);
      root.append(paragraphNode);
    });
  };
};

export { convertTextToNode };
