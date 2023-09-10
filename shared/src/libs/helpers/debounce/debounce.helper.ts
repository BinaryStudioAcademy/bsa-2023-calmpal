import libraryDebounce from 'debounce';

import { DEBOUNCE_TIMEOUT } from './libs/constants.js';

const debounce = (
  function_: (event_?: React.SyntheticEvent) => void,
  timeout: number = DEBOUNCE_TIMEOUT,
): ReturnType<typeof libraryDebounce> => {
  return libraryDebounce(function_, timeout);
};

export { debounce };
