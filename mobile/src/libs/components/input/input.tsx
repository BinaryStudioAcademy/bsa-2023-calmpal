import { type Dispatch, type SetStateAction } from 'react';
import React from 'react';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';
import { TextInput } from 'react-native';

import { Text, View } from '#libs/components/components';
import { useFormController } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder: string;
  setSearchQuery?: Dispatch<SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder,
  setSearchQuery,
  style,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const { value, onChange, onBlur } = field;

  const handleInputChange = (text: string): void => {
    onChange(text);
    if (setSearchQuery) {
      setSearchQuery(text);
    }
  };

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <View>
      {label ? <Text>{label}</Text> : null}
      <TextInput
        onBlur={onBlur}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        placeholderTextColor={styles.placeholder.color}
        style={[styles.input, style]}
        value={value}
      />
      <Text>{hasError && (error as string)}</Text>
    </View>
  );
};

export { Input };
