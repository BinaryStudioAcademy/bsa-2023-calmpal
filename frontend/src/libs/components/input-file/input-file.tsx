import { FIRST_ARRAY_INDEX } from '#libs/constants/constants.js';
import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useCallback,
  useEffect,
  useFormController,
  useState,
} from '#libs/hooks/hooks.js';
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
  const [errorMessage, setErrorMessage] = useState<string>();
  const { field } = useFormController({ name, control });

  const hasFile = Boolean(fileName);
  const inputError = errors[name];
  const hasError = Boolean(errorMessage);

  useEffect(() => {
    if (inputError) {
      if (inputError.message) {
        setErrorMessage(inputError.message as string);

        return;
      }

      Object.values(inputError).find((property: { message?: string }) => {
        if (property.message) {
          setErrorMessage(property.message);
        }

        return property.message;
      });
    }
  }, [inputError]);

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
      {hasError ? (
        <span className={styles['error-text']}>{errorMessage}</span>
      ) : (
        hasFile && (
          <div className={styles['file']}>
            <Icon name="download" color={IconColor.BLACK} />
            <span className={styles['name']}>{fileName}</span>
          </div>
        )
      )}
    </label>
  );
};

export { InputFile };
