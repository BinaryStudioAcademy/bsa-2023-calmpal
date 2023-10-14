import { type Dispatch, type SetStateAction } from 'react';

import { useEffect, useState } from '~/libs/hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD } from './libs/constants';

type UseSearchResult<T> = {
  filteredData: T[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const useSearch = <T>(data: T[], propertyName: keyof T): UseSearchResult<T> => {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_PAYLOAD.search);
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (item[propertyName] as string)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
  }, [data, propertyName, searchQuery]);

  return { filteredData, setSearchQuery };
};

export { useSearch };
