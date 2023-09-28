import React from 'react';

import {
  Button,
  Input,
  InputFile,
  Modal,
  Text,
  View,
} from '#libs/components/components';
import { EMPTY_ARRAY_LENGTH } from '#libs/constants/constants';
import { AppColor } from '#libs/enums/enums';
import { useAppForm, useCallback } from '#libs/hooks/hooks';
import {
  createMeditationEntryFormValidationSchema,
  type MeditationEntryCreateForm,
  type MeditationEntryCreateRequestDto,
} from '#packages/meditation/meditation';
import { DEFAULT_MEDITATION_PAYLOAD } from '#screens/meditation-home/libs/constants';

import { styles } from './styles';

type Properties = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (payload: MeditationEntryCreateRequestDto) => void;
};

const AddMeditationModal: React.FC<Properties> = ({
  isVisible,
  onClose,
  onSubmit,
}) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<MeditationEntryCreateForm>({
      defaultValues: DEFAULT_MEDITATION_PAYLOAD,
      validationSchema: createMeditationEntryFormValidationSchema,
    });
  const hasError = Object.keys(errors).length > EMPTY_ARRAY_LENGTH;

  const handleFormSubmit = useCallback(() => {
    void handleSubmit(({ name, file }) => {
      onSubmit({ name, file: file?.data as File });
      onClose();
      reset();
    })();
  }, [onSubmit, handleSubmit, onClose, reset]);

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Add meditation</Text>
        <Input
          control={control}
          errors={errors}
          label="Meditation name"
          name="name"
          placeholder="Enter meditation name"
          labelColor={AppColor.BLACK}
        />
        <InputFile
          control={control}
          errors={errors}
          name="file"
          label="Meditation audio file"
        />

        <Button
          label="Submit"
          isDisabled={hasError}
          onPress={handleFormSubmit}
        />
      </View>
    </Modal>
  );
};

export { AddMeditationModal };
