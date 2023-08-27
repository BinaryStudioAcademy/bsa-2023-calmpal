import libraryDebounce from 'debounce';
import { type Dispatch, type SetStateAction } from 'react';

const DEBOUNCE_DELAY = 300;

const debounce = (
  setSearchQuery: Dispatch<SetStateAction<string>>,
): ((text: string) => void) => {
  return libraryDebounce((text: string) => {
    setSearchQuery(text);
  }, DEBOUNCE_DELAY);
};

export { debounce };
