import React from 'react';

import { TextInput } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { debounce } from '#libs/helpers/helpers';
import {
  useAppForm,
  useEffect,
  useFormController,
  useRef,
} from '#libs/hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD, SEARCH_TIMEOUT } from './libs/constants';
import { styles } from './styles';

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

  const debouncedReference = useRef<ReturnType<typeof debounce>>();

  useEffect(() => {
    debouncedReference.current?.clear();

    debouncedReference.current = debounce(() => {
      setSearchQuery(value);
    }, SEARCH_TIMEOUT);

    debouncedReference.current();
  }, [value, setSearchQuery]);

  const handleInputChange = (text: string): void => {
    onChange(text);
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
