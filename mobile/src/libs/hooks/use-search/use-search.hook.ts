import { useAppForm, useCallback, useMemo } from '#libs/hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD } from './constants';

type UseSearchResult<T> = {
  filteredData: T[];
  setSearchQuery: (value: string) => void;
};

const useSearch = <T>(data: T[], propertyName: keyof T): UseSearchResult<T> => {
  const { setValue, watch } = useAppForm({
    defaultValues: DEFAULT_SEARCH_PAYLOAD,
  });

  const setSearchQuery = useCallback(
    (searchValue: string) => {
      setValue('search', searchValue);
    },
    [setValue],
  );

  const searchQuery = watch('search', DEFAULT_SEARCH_PAYLOAD.search);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      (item[propertyName] as string)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, data, propertyName]);

  return { filteredData, setSearchQuery };
};

export { useSearch };
