import libraryDebounce from 'debounce';

import { DEBOUNCE_TIMEOUT } from './libs/constants.js';

const debounce = <T extends (argument?: unknown) => void>(
  function_: T,
  timeout: number = DEBOUNCE_TIMEOUT,
): ReturnType<typeof libraryDebounce> => {
  return libraryDebounce(function_, timeout);
};

export { debounce };
