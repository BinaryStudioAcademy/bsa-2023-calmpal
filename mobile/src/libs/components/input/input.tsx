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

import { styles } from './styles';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  label: string;
  name: FormFieldPath<T>;
  isSecure?: boolean;
  placeholder: string;
};

const Input = <T extends FormFieldValues>({
  control,
  errors,
  label,
  name,
  isSecure = false,
  placeholder,
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
      <TextInput
        onChangeText={onChange}
        value={value}
        onFocus={handleFocus}
        onBlur={handeBlur}
        secureTextEntry={isSecure}
        placeholder={placeholder}
        style={[
          styles.input,
          hasError && styles.errorInput,
          isFocused && styles.focusedInput,
        ]}
        placeholderTextColor={styles.placeholder.color}
      />
      <Text style={styles.errorText}>{hasError && (error as string)}</Text>
    </View>
  );
};

export { Input };
