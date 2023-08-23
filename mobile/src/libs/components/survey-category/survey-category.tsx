import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState } from '#libs/hooks/hooks';

import { styles } from './styles';

type SurveyCategoryProperties = {
  category: string;
  selected: boolean;
  onSelect: (category: string) => void;
};

const SurveyCategory: React.FC<SurveyCategoryProperties> = ({
  category,
  selected,
  onSelect,
}) => {
  const [otherText, setOtherText] = useState('');

  const handleSelect = (): void => {
    onSelect(category);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelect}>
        <View
          style={[
            styles.categoryButton,
            selected && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              selected && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </View>
      </TouchableOpacity>
      {selected && category === 'Other' && (
        <TextInput
          style={styles.otherTextInput}
          placeholder="Enter category details"
          value={otherText}
          onChangeText={(text): void => {
            setOtherText(text);
          }}
        />
      )}
    </View>
  );
};

export { SurveyCategory };
