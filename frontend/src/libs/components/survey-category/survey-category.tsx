import {
  type FieldPath,
  type FieldValues,
  type UseFormRegister,
} from 'react-hook-form';

import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  register: UseFormRegister<T>;
  label: string;
  name: FieldPath<T>;
};

const SurveyCategory = <T extends FieldValues>({
  register,
  label,
  name,
}: Properties<T>): JSX.Element => {
  return (
    <label className={styles['option']}>
      <input
        className={styles['checkbox']}
        type="checkbox"
        value={label}
        {...register(name)}
      />
      <div className={getValidClassNames(styles['container'])}>
        <span className={styles['label']}>{label}</span>
      </div>
    </label>
  );
};

export { SurveyCategory };
