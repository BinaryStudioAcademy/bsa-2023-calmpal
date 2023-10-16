import React from 'react';
import { RichEditor } from 'react-native-pell-rich-editor';

import { useState } from '~/libs/hooks/hooks';

import { Text } from '../components';
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
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const handleChange = (content: string): void => {
    onChange(content);
    setIsPlaceholderVisible(content === '<p><br></p>');
  };

  return (
    <>
      {isPlaceholderVisible && (
        <Text style={styles.placeholder}>{placeholder}</Text>
      )}

      <RichEditor
        onChange={handleChange}
        initialContentHTML={initialContent}
        editorStyle={styles.editor}
        androidLayerType="software"
      />
    </>
  );
};

export { RichTextEditor };
