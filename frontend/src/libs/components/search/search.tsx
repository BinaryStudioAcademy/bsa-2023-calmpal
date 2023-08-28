import { type SubmitHandler } from 'react-hook-form';

import {
  useAppForm,
  useCallback,
  useDebounce,
  useFormController,
} from '#libs/hooks/hooks.js';

import { DEFAULT_SEARCH_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onValueChange: (payload: { search: string }) => void;
};

const Search = ({ onValueChange }: Properties): JSX.Element => {
  const { control, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
    mode: 'onChange',
  });

  const debouncedOnValueChange = useDebounce(onValueChange);

  const handleFormChange = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(
        debouncedOnValueChange as unknown as SubmitHandler<{ search: string }>,
      )(event_);
    },
    [debouncedOnValueChange, handleSubmit],
  );

  const { field } = useFormController({ name: 'search', control });

  return (
    <form onChange={handleFormChange}>
      <input
        {...field}
        className={styles['input-search']}
        placeholder="Search topic"
      />
    </form>
  );
};

export { Search };
