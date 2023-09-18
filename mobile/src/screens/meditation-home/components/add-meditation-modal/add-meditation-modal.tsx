import React from 'react';
import { type MeditationEntryCreateForm } from 'shared/build/index.js';
import { createMeditationEntryFormValidationSchema } from 'shared/build/index.js';

import { Button, Input, InputFile, Popup } from '#libs/components/components';
import { useAppForm } from '#libs/hooks/hooks';
import { DEFAULT_MEDITATION_PAYLOAD } from '#screens/meditation-home/libs/constants';

import { EMPTY_ARRAY_LENGTH } from './libs/constants';

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
    <Popup isVisible={isVisible} closeModal={closeModal}>
      <Input
        control={control}
        errors={errors}
        label="Topic name"
        name="title"
        placeholder="Enter topic name"
      />
      <InputFile />
      <Button label="Submit" isDisabled={hasError} onPress={handleFormSubmit} />
    </Popup>
  );
};

export { AddMeditationModal };
