import {
  Button,
  Input,
  InputFile,
  Modal,
} from '#libs/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#libs/constants/constants.js';
import { useAppForm, useCallback, useState } from '#libs/hooks/hooks.js';
import { type MeditationCreateValidation } from '#packages/meditation/libs/types/types.js';
import { createMeditationValidationSchema } from '#packages/meditation/libs/validation-schemas/validation-schemas.js';
import { DEFAULT_MEDITATION_PAYLOAD } from '#pages/meditation/libs/constants.js';

import styles from './styles.module.scss';

type Properties = {
  isDisplayed: boolean;
  onSubmit: (title: string, file: File) => void;
  onClose: () => void;
};

const MeditationModal: React.FC<Properties> = ({
  isDisplayed,
  onSubmit,
  onClose,
}) => {
  const [file, setFile] = useState<File>();
  const { control, errors, handleSubmit, reset } =
    useAppForm<MeditationCreateValidation>({
      defaultValues: DEFAULT_MEDITATION_PAYLOAD,
      validationSchema: createMeditationValidationSchema,
    });

  const hasError = Boolean(Object.keys(errors).length > EMPTY_ARRAY_LENGTH);

  const handleFileChange = useCallback(
    (currentFile: File) => {
      setFile(currentFile);
    },
    [setFile],
  );

  const handleFormSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(({ title }) => {
        reset();
        onSubmit(title, file as File);
      })(event_);
    },
    [file, onSubmit, handleSubmit, reset],
  );

  return (
    <Modal title="Add meditation" isDisplayed={isDisplayed} onClose={onClose}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          control={control}
          errors={errors}
          label="Topic name"
          name="title"
          placeholder="Enter topic name"
        />
        <InputFile
          control={control}
          errors={errors}
          fileName={file?.name ?? null}
          name="file"
          label="Meditation audio file"
          description="Only MP3 extension is allowed"
          onChange={handleFileChange}
        />
        <Button type="submit" label="Submit" isLoading={hasError} />
      </form>
    </Modal>
  );
};

export { MeditationModal };
