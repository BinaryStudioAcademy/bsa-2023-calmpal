import libraryDebounce from 'debounce';
import { type Dispatch, type SetStateAction } from 'react';

const DEBOUNCE_DELAY = 300;

let debounced: ReturnType<typeof libraryDebounce> | undefined;

const debounce = (
  setSearchQuery: Dispatch<SetStateAction<string>>,
): ReturnType<typeof libraryDebounce> => {
  if (debounced) {
    debounced.clear();
  }

  debounced = libraryDebounce((text: string) => {
    setSearchQuery(text);
  }, DEBOUNCE_DELAY);

  return debounced;
};

export { debounce };
