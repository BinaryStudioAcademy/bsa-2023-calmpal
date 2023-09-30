import libraryDebounce from 'debounce';

import { DEBOUNCE_TIMEOUT } from './libs/constants.js';

type FunctionWithArguments<T> = (...arguments_: T[]) => void;

const debounce = <T>(
  function_: FunctionWithArguments<T>,
  timeout: number = DEBOUNCE_TIMEOUT,
): ReturnType<typeof libraryDebounce> => {
  return libraryDebounce(function_, timeout);
};

export { debounce };
