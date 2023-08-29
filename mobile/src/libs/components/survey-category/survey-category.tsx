import React from 'react';
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Text, TouchableOpacity, View } from '#libs/components/components';
import { useCallback, useState } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  label: string;
};

const SurveyCategory = <T extends FieldValues>({
  field,
  label,
}: Properties<T>): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);
  const { onChange, value } = field;

  const handleChange = useCallback(() => {
    let options = value as string[];
    if (options.includes(label)) {
      options = options.filter((option: string) => option !== label);
      setIsSelected(false);
    } else {
      options.push(label);
      setIsSelected(true);
    }

    onChange(options);
  }, [label, value, onChange]);

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
