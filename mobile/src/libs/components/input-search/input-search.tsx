import debounce from 'lodash/debounce';
import React, { type Dispatch, type SetStateAction } from 'react';

import { TextInput, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useAppForm, useFormController } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties = {
  placeholder: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const InputSearch: React.FC<Properties> = ({ placeholder, setSearchQuery }) => {
  const { control } = useAppForm({
    defaultValues: { search: '' },
  });
  const { field } = useFormController({ name: 'search', control });
  const { value, onChange } = field;
  const DEBOUNCE_DELAY = 300;

  const debouncedSetSearchQuery = debounce((text: string): void => {
    setSearchQuery(text);
  }, DEBOUNCE_DELAY);

  const handleInputChange = (text: string): void => {
    onChange(text);
    debouncedSetSearchQuery(text);
  };

  return (
    <View>
      <TextInput
        onChangeText={handleInputChange}
        placeholder={placeholder}
        placeholderTextColor={AppColor.GRAY_400}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

export { InputSearch };
