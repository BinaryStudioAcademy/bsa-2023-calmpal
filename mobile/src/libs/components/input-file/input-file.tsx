import React from 'react';
import DocumentPicker from 'react-native-document-picker';

import { AppColor } from '#libs/enums/enums';
import { useFormController } from '#libs/hooks/hooks';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types';

import { Icon, Pressable, Text, View } from '../components';
import { FIRST_ARRAY_INDEX } from './libs/constants';
import { styles } from './styles';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  name: FormFieldPath<T>;
  label: string;
};

const InputFile = <T extends FormFieldValues>({
  control,
  name,
  errors,
  label,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const { value, onChange } = field;

  const error = errors[name]?.message;
  const fileData = value.data as File;
  const hasError = Boolean(error);
  const hasValue = Boolean(fileData);

  const handlePickFile = async (): Promise<void> => {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.audio],
    });
    const file = result[FIRST_ARRAY_INDEX];
    onChange({ data: file, type: file?.type, size: file?.size });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.file}
        onPress={(): void => {
          return void handlePickFile();
        }}
      >
        <Icon name="upload" color={AppColor.GRAY_500} />
        <Text style={styles.primaryText}>CLICK HERE</Text>
        <Text style={styles.secondaryText}>Only MP3 extension is allowed</Text>
      </Pressable>
      {hasError && <Text style={styles.errorText}>{error as string}</Text>}
      {hasValue && (
        <View style={styles.selectedFile}>
          <Icon name="download" color={AppColor.GRAY_600} />
          <Text style={styles.selectedFileName} numberOfLines={1}>
            {fileData.name}
          </Text>
        </View>
      )}
    </View>
  );
};

export { InputFile };
