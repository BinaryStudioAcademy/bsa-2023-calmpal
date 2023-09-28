import { useCallback, useEffect, useState } from '../hooks.js';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  const handleMediaQueryChange = useCallback(
    (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    },
    [],
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [handleMediaQueryChange, query]);

  return matches;
};
export { useMediaQuery };
