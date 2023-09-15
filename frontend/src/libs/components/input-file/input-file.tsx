import {
  EMPTY_ARRAY_LENGTH,
  FIRST_ARRAY_INDEX,
} from '#libs/constants/constants.js';
import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useFormController } from '#libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldName,
  type FormFieldPath,
  type FormFieldValues,
  type FormFieldValuesFromFieldErrors,
} from '#libs/types/types.js';

import { ErrorMessage, Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  name: FormFieldPath<T>;
  label: string;
  description: string;
  onChange?: (file: File) => void;
};

const InputFile = <T extends FormFieldValues>({
  control,
  errors,
  name,
  label,
  description,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController<T>({ name, control });

  const fileName = (field.value as { data: File } | null)?.data.name;
  const errorNames = [name.toString(), `${name}.type`, `${name}.size`];
  const inputErrors = errors[name];
  const hasError =
    inputErrors && Object.keys(inputErrors).length > EMPTY_ARRAY_LENGTH;
  const displayFile = Boolean(fileName) && !hasError;

  const handleFileChange = useCallback(
    (event_: React.ChangeEvent<HTMLInputElement>) => {
      if (event_.target.files?.length) {
        const file = event_.target.files[FIRST_ARRAY_INDEX] as File;

        const { type, size } = file;
        field.onChange({ type, size, data: file });
      }
    },
    [field],
  );

  const displayError = useCallback(({ message }: { message: string }) => {
    return message && <span className={styles['error-text']}>{message}</span>;
  }, []);

  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{label}</span>
      <div
        className={getValidClassNames(
          styles['drag-zone'],
          hasError && styles['error'],
        )}
      >
        <div className={styles['icon-container']}>
          <Icon name="upload" color={IconColor.BLACK} />
        </div>
        <span className={styles['primary-text']}>Drag file or click here</span>
        <span className={styles['secondary-text']}>{description}</span>
        <input
          type="file"
          className={styles['input']}
          onChange={handleFileChange}
        />
      </div>

      <div>
        {errorNames.map((name) => {
          return (
            <ErrorMessage
              key={name}
              errors={errors}
              name={
                name as FormFieldName<
                  FormFieldValuesFromFieldErrors<FormFieldErrors<T>>
                >
              }
              render={displayError}
            />
          );
        })}
      </div>

      {displayFile && (
        <div className={styles['file']}>
          <Icon name="download" color={IconColor.BLACK} />
          <span className={styles['name']}>{fileName}</span>
        </div>
      )}
    </label>
  );
};

export { InputFile };
