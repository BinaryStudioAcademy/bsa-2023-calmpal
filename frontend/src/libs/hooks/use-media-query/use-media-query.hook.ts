import { useCallback, useEffect, useState } from '../hooks.js';

const useMediaQuery = (query: string): boolean => {
  const [isMatched, setIsMatched] = useState(false);

  const handleMediaQueryChange = useCallback(
    (event: MediaQueryListEvent): void => {
      setIsMatched(event.matches);
    },
    [],
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setIsMatched(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [handleMediaQueryChange, query]);

  return isMatched;
};
export { useMediaQuery };
