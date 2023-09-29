import React from 'react';
import { RichEditor } from 'react-native-pell-rich-editor';

import { styles } from './styles';

type Properties = {
  onChange: (text: string) => void;
  initialContent: string;
  placeholder: string;
};

const RichTextEditor: React.FC<Properties> = ({
  onChange,
  initialContent,
  placeholder,
}) => {
  return (
    <RichEditor
      onChange={onChange}
      initialContentHTML={initialContent}
      editorStyle={styles.editor}
      placeholder={placeholder}
      androidLayerType="software"
    />
  );
};

export { RichTextEditor };
