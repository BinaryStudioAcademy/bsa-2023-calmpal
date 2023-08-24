import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    </View>
  );
};

export { SurveyCategory };
