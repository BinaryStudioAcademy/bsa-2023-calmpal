import React from 'react';

import { Text, TouchableOpacity, View } from '#libs/components/components';

import { styles } from './styles';

type SurveyCategoryProperties = {
  category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
};

const SurveyCategory: React.FC<SurveyCategoryProperties> = ({
  category,
  isSelected,
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
            isSelected && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              isSelected && styles.selectedCategoryText,
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
