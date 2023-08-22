import React from 'react';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';

import { Text, View } from '#libs/components/components';
import { useFormController } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  placeholder: string;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder,
}: Properties<T>): JSX.Element => {
  const { field, fieldState } = useFormController({ name, control });

  const { value, onChange, onBlur } = field;

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const isFieldTouched = fieldState.isDirty;
  const isFieldFilled = Boolean(value);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        style={[
          styles.input,
          !hasError && (isFieldTouched || isFieldFilled) && styles.filledInput,
          hasError && styles.errorInput,
        ]}
        placeholderTextColor={styles.placeholder.color}
      />
      <Text style={styles.errorText}>{hasError && (error as string)}</Text>
    </View>
  );
};

export { Input };
