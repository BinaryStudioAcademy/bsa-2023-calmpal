import { useCallback } from '#libs/hooks/hooks.js';
import {
  type FormControllerRenderProps,
  type FormFieldValues,
  type FormPath,
} from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FormFieldValues> = {
  field: FormControllerRenderProps<T, FormPath<T>>;
  label: string;
};

const SurveyCategory = <T extends FormFieldValues>({
  field,
  label,
}: Properties<T>): JSX.Element => {
  const { onChange, ...fieldProperties } = field;

  const handleChange = useCallback(() => {
    let options = field.value as string[];
    if (options.includes(label)) {
      options = options.filter((option: string) => option !== label);
    } else {
      options.push(label);
    }

    onChange(options);
  }, [field, label, onChange]);

  return (
    <label className={styles['option']}>
      <input
        className={styles['checkbox']}
        type="checkbox"
        onChange={handleChange}
        {...fieldProperties}
      />
      <span className={styles['label']}>{label}</span>
    </label>
  );
};

export { SurveyCategory };
