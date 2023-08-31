import React from 'react';

import { Text, TouchableOpacity, View } from '#libs/components/components';
import { useCallback, useState } from '#libs/hooks/hooks';

// import {
//   type FormControllerRenderProps,
//   type FormFieldValues,
//   type FormPath,
// } from '#libs/types/types';
import { styles } from './styles';

// type Properties<T extends FormFieldValues> = {
//   field: FormControllerRenderProps<T, FormPath<T>>;
//   label: string;
// };

// const SurveyCategory = <T extends FormFieldValues>({
//   field,
//   label,
// }: Properties<T>): JSX.Element => {
//   const [isSelected, setIsSelected] = useState(false);
//   const { onChange, value } = field;

//   const handleChange = useCallback(() => {
//     let options = value as string[];
//     if (options.includes(label)) {
//       options = options.filter((option: string) => option !== label);
//       setIsSelected(false);
//     } else {
//       options.push(label);
//       setIsSelected(true);
//     }

//     onChange(options);
//   }, [label, value, onChange]);

type Properties = {
  label: string;
  onChange: (label: string) => void;
};

const SurveyCategory: React.FC<Properties> = ({
  label,
  onChange,
}): JSX.Element => {
  const [isSelected, setIsSelected] = useState(false);
  const handleChange = useCallback(() => {
    onChange(label);
    setIsSelected(!isSelected);
    // console.log(label, onChange);
  }, [label, onChange, isSelected]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChange}>
        {/* <TouchableOpacity onPress={handleChange}> */}
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
