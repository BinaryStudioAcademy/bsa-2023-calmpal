import { DEFAULT_DEBOUNCE_DELAY } from './libs/constants/constants.js';

type DebounceFunction<T> = (...arguments_: T[]) => void;

const useDebounce = <T>(
  function_: DebounceFunction<T>,
  delay?: number,
): DebounceFunction<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...arguments_: T[]): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      function_.apply(this, arguments_);
    }, delay ?? DEFAULT_DEBOUNCE_DELAY);
  };
};

export { useDebounce };
