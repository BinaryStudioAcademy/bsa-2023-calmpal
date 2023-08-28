import libraryDebounce from 'debounce';
import { type Dispatch, type SetStateAction } from 'react';

const DEBOUNCE_DELAY = 300;

let debouncedFunction: ReturnType<typeof libraryDebounce> | undefined;

const debounce = (
  setSearchQuery: Dispatch<SetStateAction<string>>,
): ((text: string) => void) => {
  const debounced = libraryDebounce((text: string) => {
    setSearchQuery(text);
  }, DEBOUNCE_DELAY);

  return (text: string): void => {
    if (debouncedFunction) {
      debounced.clear();
      debouncedFunction.clear();
    }

    debouncedFunction = debounced;
    debounced(text);
  };
};

export { debounce };
