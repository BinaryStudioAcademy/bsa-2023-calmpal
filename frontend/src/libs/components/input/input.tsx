import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useFormController } from '#libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldErrors,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  errors: FormFieldErrors<T>;
  label?: string;
  name: FormFieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  rowsCount?: number;
  maxLength?: number;
  autoComplete?: 'off' | 'on';
  isChatInput?: boolean;
  defaultValue?: string;
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
  autoComplete,
  isChatInput,
  defaultValue,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const { value, ...rest } = field;

  const error = errors[name]?.message;
  const hasError = Boolean(error);
  const hasRows = Boolean(rowsCount);

  return (
    <label className={styles['container']}>
      <span className={styles['label']}>{label}</span>
      {hasRows ? (
        <textarea
          {...rest}
          rows={rowsCount}
          placeholder={placeholder}
          maxLength={maxLength}
          defaultValue={defaultValue ?? value}
          autoComplete={autoComplete}
          className={getValidClassNames(
            styles['textarea'],
            isChatInput && styles['chat-input'],
            hasError && styles['error'],
          )}
        />
      ) : (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className={getValidClassNames(
            styles['input'],
            isChatInput && styles['chat-input'],
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
