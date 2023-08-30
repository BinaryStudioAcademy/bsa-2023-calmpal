import React from 'react';
import { TextInput } from 'react-native';

import { Text, View } from '#libs/components/components';
import { useFormController, useState } from '#libs/hooks/hooks';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types';

import { styles } from './styles';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  label?: string;
  name: FormFieldPath<T>;
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
  rowsCount,
  maxLength,
}: Properties<T>): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);
  const { field } = useFormController({ name, control });

  const { value, onChange, onBlur } = field;

  const error = errors[name]?.message;
  const hasError = Boolean(error);
  const hasRows = Boolean(rowsCount);

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
      {hasRows ? (
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
