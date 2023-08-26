import { useEffect, useState } from '../hooks.js';
import { DEFAULT_DEBOUNCE_DELAY } from './libs/constants/constants.js';

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay ?? DEFAULT_DEBOUNCE_DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);

  return debouncedValue;
};

export { useDebounce };
