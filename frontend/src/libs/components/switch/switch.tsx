import {
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormController } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  label?: string;
  name: FieldPath<T>;
};

const Switch = <T extends FieldValues>({
  control,
  name,
  label,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  return (
    <label className={styles['container']} htmlFor={name}>
      <span className="visually-hidden">{label}</span>
      <input
        id={name}
        className={styles['input']}
        type="checkbox"
        checked={field.value}
        {...field}
      />
    </label>
  );
};
export { Switch };
