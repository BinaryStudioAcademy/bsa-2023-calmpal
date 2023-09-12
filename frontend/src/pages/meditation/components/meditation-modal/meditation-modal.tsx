import {
  Button,
  Input,
  InputFile,
  Modal,
} from '#libs/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#libs/constants/constants.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '#libs/hooks/hooks.js';
import {
  createMeditationEntryValidationSchema,
  type MeditationEntryCreateForm,
} from '#packages/meditation/meditation.js';
import { DEFAULT_MEDITATION_PAYLOAD } from '#pages/meditation/libs/constants/constants.js';

import styles from './styles.module.scss';

type Properties = {
  isDisplayed: boolean;
  setIsDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (title: string, file: File) => void;
  onClose: () => void;
};

const MeditationModal: React.FC<Properties> = ({
  isDisplayed,
  setIsDisplayed,
  onSubmit,
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { meditationDataStatus } = useAppSelector(({ meditation }) => {
    return {
      meditationDataStatus: meditation.dataStatus,
    };
  });
  const { control, errors, handleSubmit, reset } =
    useAppForm<MeditationEntryCreateForm>({
      defaultValues: DEFAULT_MEDITATION_PAYLOAD,
      validationSchema: createMeditationEntryValidationSchema,
    });

  const hasError = Boolean(Object.keys(errors).length > EMPTY_ARRAY_LENGTH);
  const isLoading = meditationDataStatus === DataStatus.PENDING || hasError;

  useEffect(() => {
    if (meditationDataStatus === DataStatus.FULFILLED) {
      setIsDisplayed(false);
      reset();
      setFile(null);
    }
  }, [meditationDataStatus, reset, setIsDisplayed, setFile]);

  const handleFileChange = useCallback(
    (currentFile: File) => {
      setFile(currentFile);
    },
    [setFile],
  );

  const handleFormSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(({ title }) => {
        onSubmit(title, file as File);
      })(event_);
    },
    [file, onSubmit, handleSubmit],
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
        <Button type="submit" label="Submit" isLoading={isLoading} />
      </form>
    </Modal>
  );
};

export { MeditationModal };
