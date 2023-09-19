import React from 'react';
import { type MeditationEntryCreateForm } from 'shared/build/index.js';
import { createMeditationEntryFormValidationSchema } from 'shared/build/index.js';

import {
  Button,
  Input,
  InputFile,
  Modal,
  Text,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useAppForm } from '#libs/hooks/hooks';
import { DEFAULT_MEDITATION_PAYLOAD } from '#screens/meditation-home/libs/constants';

import { EMPTY_ARRAY_LENGTH } from './libs/constants';
import { styles } from './styles';

type Properties = {
  isVisible: boolean;
  closeModal: () => void;
};

const AddMeditationModal: React.FC<Properties> = ({
  isVisible,
  closeModal,
}) => {
  const { control, errors, handleSubmit } =
    useAppForm<MeditationEntryCreateForm>({
      defaultValues: DEFAULT_MEDITATION_PAYLOAD,
      validationSchema: createMeditationEntryFormValidationSchema,
    });
  const hasError = Object.keys(errors).length > EMPTY_ARRAY_LENGTH;

  const handleFormSubmit = (): void => {
    handleSubmit;
  };

  return (
    <Modal isVisible={isVisible} onClose={closeModal}>
      <View style={styles.container}>
        <Text style={styles.title}>Add meditation</Text>
        <Input
          control={control}
          errors={errors}
          label="Topic name"
          name="title"
          placeholder="Enter topic name"
          labelColor={AppColor.BLACK}
        />
        <InputFile label="Meditation audio file" />
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
