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
  useState,
} from '#libs/hooks/hooks';

import {
  DEFAULT_SEARCH_PAYLOAD,
  SEARCH_TIMEOUT,
} from './libs/constants/constants';
import { styles } from './styles';

type Properties = {
  placeholder: string;
  setSearchQuery: (search: string) => void;
};

const InputSearch: React.FC<Properties> = ({ placeholder, setSearchQuery }) => {
  const [isFocused, setIsFocused] = useState(false);

  const { control, reset } = useAppForm({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });
  const { field } = useFormController({
    name: 'search',
    control,
  });
  const { value, onChange } = field;

  useEffect(() => {
    const debounceHandleSearch = debounce(() => {
      setSearchQuery(value);
    }, SEARCH_TIMEOUT);

    debounceHandleSearch();

    return () => {
      debounceHandleSearch.clear();
    };
  }, [value, setSearchQuery]);

  const handleInputChange = (text: string): void => {
    onChange(text);
  };

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
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
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      placeholderTextColor={AppColor.GRAY_400}
      style={[styles.input, isFocused && styles.focusedInput]}
      value={value}
    />
  );
};

export { InputSearch };
