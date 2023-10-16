import React from 'react';
import { Switch as RNSwitch } from 'react-native';

import { useFormController } from '~/libs/hooks/hooks';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '~/libs/types/types';

import { styles } from './styles';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  name: FormFieldPath<T>;
};

const Switch = <T extends FormFieldValues>({
  control,
  name,
}: Properties<T>): JSX.Element => {
  const {
    field: { onChange, value },
  } = useFormController({ name, control });

  return (
    <RNSwitch
      trackColor={{
        false: styles.switchFalse.backgroundColor,
        true: styles.switchTrue.backgroundColor,
      }}
      thumbColor={value ? styles.switchTrue.color : styles.switchFalse.color}
      ios_backgroundColor={styles.switchTrue.backgroundColor}
      onValueChange={onChange}
      value={value}
    />
  );
};

export { Switch };
