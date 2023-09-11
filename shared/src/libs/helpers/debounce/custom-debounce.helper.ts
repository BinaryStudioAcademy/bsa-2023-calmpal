// without this I have too much typeScript errors in Note, so i decided to make this custom debounce function

import libraryDebounce from 'debounce';

import { DEBOUNCE_TIMEOUT } from './libs/constants.js';

type FormEventHandlerWithSyntheticEvent<T> = (
  event: React.SyntheticEvent<T>,
) => void;

const customDebounce = <T extends HTMLDivElement>(
  function_: FormEventHandlerWithSyntheticEvent<T>,
  timeout: number = DEBOUNCE_TIMEOUT,
): FormEventHandlerWithSyntheticEvent<T> => {
  const debouncedFunction = libraryDebounce(function_, timeout);

  return (event: React.SyntheticEvent<T>) => {
    debouncedFunction(event);
  };
};

export { customDebounce };
