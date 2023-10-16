import React from 'react';

import { Text, TouchableOpacity, View } from '~/libs/components/components';
import { useCallback, useState } from '~/libs/hooks/hooks';

import { styles } from './styles';

type Properties = {
  label: string;
  onChange: (label: string) => void;
};

const SurveyCategory: React.FC<Properties> = ({ label, onChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleChange = useCallback(() => {
    onChange(label);
    setIsSelected(!isSelected);
  }, [label, onChange, isSelected]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChange}>
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
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { SurveyCategory };
