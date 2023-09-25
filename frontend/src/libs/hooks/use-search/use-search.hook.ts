import {
  useCallback,
  useSearchParams as useSearchParameters,
} from '../hooks.js';

type UseSearchReturn = {
  setFilter: (query: string) => void;
  filter: string;
};

const useSearch = (): UseSearchReturn => {
  const [filter, setFilterParameter] = useSearchParameters();
  const queryParameter = filter.get('query') ?? '';
  const setFilter = useCallback(
    (query: string): void => {
      setFilterParameter(
        (previous) => {
          previous.set('query', query);

          return previous;
        },
        { replace: true },
      );
    },
    [setFilterParameter],
  );

  return { setFilter, filter: queryParameter };
};

export { useSearch };
