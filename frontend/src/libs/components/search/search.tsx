import { type SubmitHandler } from 'react-hook-form';

import { debounce } from '#libs/helpers/helpers.js';
import {
  useAppForm,
  useCallback,
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

  const debouncedOnValueChange = debounce(onValueChange);

  const handleFormChange = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(
        debouncedOnValueChange as unknown as SubmitHandler<{ search: string }>,
      )(event_);
      debouncedOnValueChange.clear();
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
