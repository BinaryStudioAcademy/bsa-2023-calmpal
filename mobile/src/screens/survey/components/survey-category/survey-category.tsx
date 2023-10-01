import React from 'react';

import { Text, TouchableOpacity, View } from '#libs/components/components';
import { useCallback, useState } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties = {
  label: string;
  onChange: (label: string) => void;
  isOneOption?: boolean;
  isSelectedOne?: boolean;
};

const SurveyCategory: React.FC<Properties> = ({
  label,
  onChange,
  isSelectedOne,
  isOneOption,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = useCallback(() => {
    if (isOneOption) {
      if (!isSelectedOne) {
        onChange(label);
      }
    } else {
      onChange(label);
      setIsSelected(!isSelected);
    }
  }, [label, onChange, isSelected, isOneOption, isSelectedOne]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChange}>
        <View
          style={[
            styles.categoryButton,
            (isSelected || isSelectedOne) && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              isSelected && isSelectedOne && styles.categoryText,
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
