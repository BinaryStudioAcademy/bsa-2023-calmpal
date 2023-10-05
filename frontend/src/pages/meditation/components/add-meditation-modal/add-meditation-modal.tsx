import {
  Button,
  Input,
  InputFile,
  Modal,
} from '#libs/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#libs/constants/constants.js';
import { ContentType, DataStatus } from '#libs/enums/enums.js';
import {
  forwardRef,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
} from '#libs/hooks/hooks.js';
import {
  createMeditationEntryFormValidationSchema,
  type MeditationEntryCreateForm,
  type MeditationEntryCreateRequestDto,
} from '#packages/meditation/meditation.js';
import { DEFAULT_MEDITATION_PAYLOAD } from '#pages/meditation/libs/constants/constants.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: MeditationEntryCreateRequestDto) => void;
};

const AddMeditationModal: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  Properties
> = ({ onSubmit }, reference) => {
  const AddMeditationModalReference =
    reference as React.RefObject<HTMLDialogElement | null>;
  const { meditationDataStatus } = useAppSelector(({ meditation }) => {
    return {
      meditationDataStatus: meditation.meditationEntriesDataStatus,
    };
  });
  const { control, errors, handleSubmit, reset } =
    useAppForm<MeditationEntryCreateForm>({
      defaultValues: DEFAULT_MEDITATION_PAYLOAD,
      validationSchema: createMeditationEntryFormValidationSchema,
    });

  const hasError = Object.keys(errors).length > EMPTY_ARRAY_LENGTH;
  const isLoading = meditationDataStatus === DataStatus.PENDING;

  useEffect(() => {
    if (meditationDataStatus === DataStatus.FULFILLED) {
      AddMeditationModalReference.current?.close();
      reset();
    }
  }, [meditationDataStatus, reset, AddMeditationModalReference]);

  const handleFormSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(({ name, file }) => {
        onSubmit({ name, file: file?.data as File });
      })(event_);
    },
    [onSubmit, handleSubmit],
  );

  return (
    <Modal title="Add meditation" ref={reference}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          control={control}
          errors={errors}
          label="Meditation name"
          name="name"
          placeholder="Enter meditation name"
        />
        <InputFile
          control={control}
          errors={errors}
          name="file"
          fileTypeName="type"
          fileSizeName="size"
          label="Meditation audio file"
          description="Only MP3 extension is allowed"
          extensions={[ContentType.MP3]}
        />
        <Button
          type="submit"
          label="Submit"
          isLoading={isLoading}
          isDisabled={hasError}
        />
      </form>
    </Modal>
  );
};

const ForwardedAddMeditationModal = forwardRef(AddMeditationModal);

export { ForwardedAddMeditationModal as AddMeditationModal };
