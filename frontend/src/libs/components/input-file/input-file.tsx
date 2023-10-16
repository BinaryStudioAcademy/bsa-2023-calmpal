import { EMPTY_ARRAY_LENGTH } from '~/libs/constants/constants.js';
import { type ContentType, IconColor } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldName,
  type FormFieldPath,
  type FormFieldValues,
  type FormFieldValuesFromFieldErrors,
  type ValueOf,
} from '~/libs/types/types.js';

import { ErrorMessage, Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  name: FormFieldPath<T>;
  fileTypeName: string;
  fileSizeName: string;
  label: string;
  description: string;
  extensions?: ValueOf<typeof ContentType>[];
  onChange?: (file: File) => void;
};

const InputFile = <T extends FormFieldValues>({
  control,
  errors,
  name,
  fileTypeName,
  fileSizeName,
  label,
  description,
  extensions,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController<T>({ name, control });

  const { name: fileName } = (field.value as { data: File } | null)?.data ?? {};
  const errorNames = [
    name.toString(),
    `${name}.${fileTypeName}`,
    `${name}.${fileSizeName}`,
  ];
  const hasError = Object.keys(errors[name] ?? {}).length > EMPTY_ARRAY_LENGTH;
  const isFileDisplayed = Boolean(fileName) && !hasError;

  const handleFileChange = useCallback(
    (event_: React.ChangeEvent<HTMLInputElement>) => {
      const [file = null] = event_.target.files ?? [];

      if (file) {
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
          <Icon name="upload" color={IconColor.BLACK} width={80} height={80} />
        </div>
        <span className={styles['primary-text']}>Drag file or click here</span>
        <span className={styles['secondary-text']}>{description}</span>
        <input
          type="file"
          className={styles['input']}
          onChange={handleFileChange}
          accept={extensions?.join(', ')}
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

      {isFileDisplayed && (
        <div className={styles['file']}>
          <Icon
            name="download"
            color={IconColor.BLACK}
            width={16}
            height={16}
          />
          <span className={styles['name']}>{fileName}</span>
        </div>
      )}
    </label>
  );
};

export { InputFile };
