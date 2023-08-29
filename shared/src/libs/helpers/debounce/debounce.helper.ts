import libraryDebounce from 'debounce';

const DEBOUNCE_DELAY = 300;

const debounceFunction = (
  function_: (payload: { search: string }) => void,
): ReturnType<typeof libraryDebounce> => {
  return libraryDebounce(function_, DEBOUNCE_DELAY);
};

export { debounceFunction };
