import React, { type Dispatch, type SetStateAction } from 'react';

import { TextInput } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { debounce as debouncedSetSearchQuery } from '#libs/helpers/helpers';
import { useAppForm, useFormController } from '#libs/hooks/hooks';

import {
  INPUT_SEARCH_DEFAULT_NAME,
  INPUT_SEARCH_DEFAULT_VALUE,
} from './libs/constants/constants';
import { styles } from './styles';

type Properties = {
  placeholder: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const InputSearch: React.FC<Properties> = ({ placeholder, setSearchQuery }) => {
  const { control } = useAppForm({
    defaultValues: { search: INPUT_SEARCH_DEFAULT_VALUE },
  });
  const { field } = useFormController({
    name: INPUT_SEARCH_DEFAULT_NAME,
    control,
  });
  const { value, onChange } = field;

  const handleInputChange = (text: string): void => {
    onChange(text);
    debouncedSetSearchQuery(setSearchQuery)(text);
  };

  return (
    <TextInput
      onChangeText={handleInputChange}
      placeholder={placeholder}
      placeholderTextColor={AppColor.GRAY_400}
      style={styles.input}
      value={value}
    />
  );
};

export { InputSearch };
