import { FIRST_ARRAY_INDEX } from '#libs/constants/constants.js';
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
  fileName: FormFieldPath<T>;
  fileTypeName: FormFieldPath<T>;
  fileSizeName: FormFieldPath<T>;
  label: string;
  description: string;
  onChange?: (file: File) => void;
};

const InputFile = <T extends FormFieldValues>({
  control,
  errors,
  fileName,
  fileTypeName,
  fileSizeName,
  label,
  description,
}: Properties<T>): JSX.Element => {
  const { field: fileField } = useFormController<T>({
    name: fileName,
    control,
  });
  const { field: fileTypeField } = useFormController<T>({
    name: fileTypeName,
    control,
  });
  const { field: fileSizeField } = useFormController<T>({
    name: fileSizeName,
    control,
  });

  const fileNaming = (fileField.value as File | null)?.name;
  const errorNames = [fileName, fileTypeName, fileSizeName];
  const hasError = Boolean(
    errors[fileName]?.message ??
      errors[fileTypeName]?.message ??
      errors[fileSizeName]?.message,
  );
  const displayFile = Boolean(fileNaming) && !hasError;

  const handleFileChange = useCallback(
    (event_: React.ChangeEvent<HTMLInputElement>) => {
      if (event_.target.files?.length) {
        const file = event_.target.files[FIRST_ARRAY_INDEX] as File;
        const { type, size } = file;

        fileField.onChange(file);
        fileTypeField.onChange(type);
        fileSizeField.onChange(size);
      }
    },
    [fileField, fileTypeField, fileSizeField],
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
                name.toString() as FormFieldName<
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
          <span className={styles['name']}>{fileNaming}</span>
        </div>
      )}
    </label>
  );
};

export { InputFile };
