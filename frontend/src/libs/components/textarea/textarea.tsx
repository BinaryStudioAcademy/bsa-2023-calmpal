import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useFormController } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  maxLength?: number;
  placeholder?: string;
};

const Textarea = <T extends FieldValues>({
  control,
  errors,
  name,
  maxLength,
  placeholder = '',
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label className={styles['container']}>
      <textarea
        {...field}
        maxLength={maxLength}
        placeholder={placeholder}
        className={getValidClassNames(
          styles['textarea'],
          hasError && styles['error'],
        )}
      />
      {hasError && (
        <span className={styles['error-message']}>{error as string}</span>
      )}
    </label>
  );
};

export { Textarea };
