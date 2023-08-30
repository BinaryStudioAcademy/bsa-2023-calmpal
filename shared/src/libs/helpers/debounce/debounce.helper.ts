import libraryDebounce from 'debounce';

import { TIMEOUT } from './libs/constants.js';

const debounce = (
  function_: () => void,
  timeout: number = TIMEOUT,
): ReturnType<typeof libraryDebounce> => {
  return libraryDebounce(function_, timeout);
};

export { debounce };
