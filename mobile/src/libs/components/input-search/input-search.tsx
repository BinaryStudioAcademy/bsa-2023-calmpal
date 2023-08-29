import React from 'react';

import { TextInput } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { debounce as debouncedSetSearchQuery } from '#libs/helpers/helpers';
import { useAppForm, useFormController } from '#libs/hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD } from './libs/constants';
import { styles } from './styles';

let debounced: ReturnType<typeof debouncedSetSearchQuery> | undefined;

type Properties = {
  placeholder: string;
  setSearchQuery: (search: string) => void;
};

const InputSearch: React.FC<Properties> = ({ placeholder, setSearchQuery }) => {
  const { control } = useAppForm({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });
  const { field } = useFormController({
    name: 'search',
    control,
  });
  const { value, onChange } = field;

  const handleInputChange = (text: string): void => {
    onChange(text);

    if (debounced) {
      debounced.clear();
    }

    debounced = debouncedSetSearchQuery((payload: { search: string }) => {
      setSearchQuery(payload.search);
    });

    debounced({ search: text });
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
