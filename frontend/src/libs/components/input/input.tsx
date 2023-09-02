import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useFormController } from '#libs/hooks/hooks.js';
import {
  type ClassValue,
  type FormControl,
  type FormFieldErrors,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors?: FormFieldErrors<T>;
  label?: string;
  name: FormFieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  rowsCount?: number;
  maxLength?: number;
  className?: ClassValue;
  autoComplete?: 'off' | 'on';
  required?: boolean;
  customStyles?: ClassValue;
};

const Input = <T extends FormFieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  rowsCount,
  maxLength,
  className = '',
  autoComplete,
  required = false,
  customStyles = '',
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors ? errors[name]?.message : null;
  const hasError = Boolean(error);
  const hasRows = Boolean(rowsCount);

  const style =
    customStyles ??
    getValidClassNames(
      className,
      styles['textarea'],
      hasError && styles['error'],
    );

  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{label}</span>
      {hasRows ? (
        <textarea
          {...field}
          rows={rowsCount}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          required={required}
          className={style as string}
        />
      ) : (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          required={required}
          className={style as string}
        />
      )}
      {hasError && (
        <span className={styles['error-message']}>{error as string}</span>
      )}
    </label>
  );
};

export { Input };
