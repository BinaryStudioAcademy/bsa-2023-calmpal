import libraryDebounce from 'debounce';

import { type SearchInput } from '#index.js';

const DEBOUNCE_DELAY = 300;

const debounce = (
  function_: (payload: SearchInput) => void,
): ReturnType<typeof libraryDebounce> => {
  return libraryDebounce(function_, DEBOUNCE_DELAY);
};

export { debounce };
