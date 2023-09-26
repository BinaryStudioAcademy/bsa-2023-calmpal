import { debounce } from '#libs/helpers/helpers.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useFormController,
} from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onValueChange: (search: string) => void;
  defaultValue: string;
};

const Search: React.FC<Properties> = ({ onValueChange, defaultValue }) => {
  const { control } = useAppForm({
    defaultValues: { search: defaultValue },
    mode: 'onChange',
  });
  const { field } = useFormController({
    name: 'search',
    control,
  });
  const { value, onChange } = field;
  useEffect(() => {
    const debouncedOnValueChange = debounce(() => {
      onValueChange(value);
    });
    debouncedOnValueChange();

    return () => {
      debouncedOnValueChange.clear();
    };
  }, [value, onValueChange]);

  const handleInputChange = useCallback(
    (value: React.InputHTMLAttributes<HTMLInputElement>): void => {
      onChange(value);
    },
    [onChange],
  );

  return (
    <input
      value={value}
      onChange={handleInputChange}
      className={styles['input-search']}
      placeholder="Search topic"
    />
  );
};

export { Search };
