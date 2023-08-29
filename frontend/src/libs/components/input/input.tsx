import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useFormController } from '#libs/hooks/hooks.js';

import { INPUT_ROWS_COUNT } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  rowsCount?: number;
  maxLength?: number;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  rowsCount = INPUT_ROWS_COUNT,
  maxLength,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{label}</span>
      {rowsCount > INPUT_ROWS_COUNT ? (
        <textarea
          {...field}
          rows={rowsCount}
          placeholder={placeholder}
          maxLength={maxLength}
          className={getValidClassNames(
            styles['textarea'],
            hasError && styles['error'],
          )}
        />
      ) : (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          className={getValidClassNames(
            styles['input'],
            hasError && styles['error'],
          )}
        />
      )}
      {hasError && (
        <span className={styles['error-message']}>{error as string}</span>
      )}
    </label>
  );
};

export { Input };
