import React from 'react';

import { RNSwitch, View } from '#libs/components/components';
import { useFormController } from '#libs/hooks/hooks';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types';
// import { useState, useFormController } from '#libs/hooks/hooks';

// import { styles } from './styles';

type Properties<T extends FormFieldValues> = {
  control: FormControl<T, null>;
  //   label?: string;
  name: FormFieldPath<T>;
};

const Switch = <T extends FormFieldValues>({
  control,
  name, //   label,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });
  //   const [isEnabled, setIsEnabled] = useState(false);
  //   const toggleSwitch = ():void => setIsEnabled((previousState) => !previousState);

  return (
    <View>
      <RNSwitch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(value): void => {
          field.onChange(value);
        }}
        value={field.value}
        // value={isEnabled}
      />
    </View>
  );
};
export { Switch };
