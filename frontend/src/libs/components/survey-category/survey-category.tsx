import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useCallback } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  label: string;
};

const SurveyCategory = <T extends FieldValues>({
  field,
  label,
}: Properties<T>): JSX.Element => {
  const { onChange, ...fieldProperties } = field;

  const handleOnChange = useCallback(() => {
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
        onChange={handleOnChange}
        {...fieldProperties}
      />
      <div className={getValidClassNames(styles['container'])}>
        <span className={styles['label']}>{label}</span>
      </div>
    </label>
  );
};

export { SurveyCategory };
