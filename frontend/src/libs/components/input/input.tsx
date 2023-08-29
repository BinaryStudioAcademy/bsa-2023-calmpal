import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldPath,
  type FormFieldValues,
  useFormController,
} from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  label?: string;
  name: FormFieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
};

const Input = <T extends FormFieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label className={styles['input']}>
      <span className={styles['label']}>{label}</span>
      <input
        {...field}
        className={getValidClassNames(
          styles['default'],
          hasError && styles['error'],
        )}
        type={type}
        placeholder={placeholder}
      />
      {hasError && (
        <span className={styles['error-message']}>{error as string}</span>
      )}
    </label>
  );
};

export { Input };
