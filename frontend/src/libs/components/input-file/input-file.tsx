import { FIRST_ARRAY_INDEX } from '#libs/constants/constants.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  getDeepErrorMessage,
  getValidClassNames,
} from '#libs/helpers/helpers.js';
import { useCallback, useFormController } from '#libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  name: FormFieldPath<T>;
  fileName: string | null;
  label: string;
  description: string;
  onChange?: (file: File) => void;
};

const InputFile = <T extends FormFieldValues>({
  control,
  errors,
  name,
  fileName,
  label,
  description,
  onChange,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const errorMessage = getDeepErrorMessage(errors[name]);
  const hasError = Boolean(errorMessage);
  const displayFile = Boolean(fileName) && !hasError;

  const handleFileChange = useCallback(
    (event_: React.ChangeEvent<HTMLInputElement>) => {
      if (event_.target.files?.length) {
        const currentFile = event_.target.files[FIRST_ARRAY_INDEX] as File;

        if (onChange) {
          onChange(currentFile);
        }

        const { name, type, size } = currentFile;
        field.onChange({ name, type, size });
      }
    },
    [field, onChange],
  );

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
      {hasError && <span className={styles['error-text']}>{errorMessage}</span>}
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
