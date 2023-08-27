import debounce from 'debounce';
import { type Dispatch, type SetStateAction } from 'react';

const DEBOUNCE_DELAY = 300;

const debouncedFuncion = (
  setSearchQuery: Dispatch<SetStateAction<string>>,
): ((text: string) => void) => {
  return debounce((text: string) => {
    setSearchQuery(text);
  }, DEBOUNCE_DELAY);
};

export { debouncedFuncion };
