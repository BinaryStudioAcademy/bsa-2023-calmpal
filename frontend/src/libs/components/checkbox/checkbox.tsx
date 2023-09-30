import { useFormController } from '#libs/hooks/hooks.js';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types.js';

import { type CheckboxStyle } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  label: string;
  name: FormFieldPath<T>;
  onChange: () => void;
  style?: CheckboxStyle;
};

const Checkbox = <T extends FormFieldValues>({
  control,
  label,
  name,
  onChange,
  style = 'primary',
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const isCheckboxChecked = Boolean((field.value as string[]).includes(label));

  return (
    <label className={styles[`checkbox-container-${style}`]}>
      <input
        {...field}
        name={name}
        className={styles[`checkbox-${style}`]}
        type="checkbox"
        onChange={onChange}
        checked={isCheckboxChecked}
      />
      <div className={styles[`container-${style}`]}>
        <span className={styles[`label-${style}`]}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
