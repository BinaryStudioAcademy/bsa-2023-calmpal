import React from 'react';

import { TextInput } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { debounce } from '#libs/helpers/helpers';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFocusEffect,
  useFormController,
} from '#libs/hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD, SEARCH_TIMEOUT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  placeholder: string;
  setSearchQuery: (search: string) => void;
};

const InputSearch: React.FC<Properties> = ({ placeholder, setSearchQuery }) => {
  const { control, reset } = useAppForm({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });
  const { field } = useFormController({
    name: 'search',
    control,
  });
  const { value, onChange } = field;

  const debounceHandleSearch = debounce(() => {
    setSearchQuery(value);
  }, SEARCH_TIMEOUT);

  useEffect(() => {
    debounceHandleSearch();

    return () => {
      debounceHandleSearch.clear();
    };
  }, [value, debounceHandleSearch]);

  const handleInputChange = (text: string): void => {
    onChange(text);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset(DEFAULT_SEARCH_PAYLOAD);
      };
    }, [reset]),
  );

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
