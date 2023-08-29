import libraryDebounce from 'debounce';

const DEBOUNCE_DELAY = 300;

const debounce = (
  function_: (payload: { search: string }) => void,
): ReturnType<typeof libraryDebounce> => {
  return libraryDebounce(function_, DEBOUNCE_DELAY);
};

export { debounce };
