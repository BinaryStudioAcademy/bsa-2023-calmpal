import React from 'react';
import { TextInput } from 'react-native';

import { Text, View } from '#libs/components/components';
import { useFormController, useState } from '#libs/hooks/hooks';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types.js';

import { INPUT_ROWS_COUNT } from './libs/constants';
import { styles } from './styles';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  isSecure?: boolean;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  rowsCount?: number;
  maxLength?: number;
};

const Input = <T extends FormFieldValues>({
  control,
  errors,
  label,
  name,
  isSecure = false,
  placeholder,
  rowsCount = INPUT_ROWS_COUNT,
  maxLength,
}: Properties<T>): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const { field } = useFormController({ name, control });

  const { value, onChange, onBlur } = field;

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handeBlur = (): void => {
    setIsFocused(false);
    onBlur();
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {rowsCount > INPUT_ROWS_COUNT ? (
        <TextInput
          onChangeText={onChange}
          value={value}
          onFocus={handleFocus}
          onBlur={handeBlur}
          multiline={true}
          numberOfLines={rowsCount}
          maxLength={maxLength}
          style={styles.otherTextInput}
          placeholder="Enter your preferences"
          placeholderTextColor={styles.otherPlaceholder.color}
        />
      ) : (
        <TextInput
          onChangeText={onChange}
          value={value}
          onFocus={handleFocus}
          onBlur={handeBlur}
          secureTextEntry={isSecure}
          placeholder={placeholder}
          style={[
            styles.input,
            !hasError && isFocused && styles.filledInput,
            hasError && styles.errorInput,
          ]}
          placeholderTextColor={styles.placeholder.color}
        />
      )}

      <Text style={styles.errorText}>{hasError && (error as string)}</Text>
    </View>
  );
};

export { Input };
