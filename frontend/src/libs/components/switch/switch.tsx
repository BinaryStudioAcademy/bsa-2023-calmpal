import { useFormController } from '~/libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  label?: string;
  name: FormFieldPath<T>;
};

const Switch = <T extends FormFieldValues>({
  control,
  name,
  label,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  return (
    <label className={styles['container']}>
      <span className="visually-hidden">{label}</span>
      <input
        className={styles['input']}
        type="checkbox"
        checked={field.value}
        {...field}
      />
      <span className={styles['slider']} />
    </label>
  );
};

export { Switch };
