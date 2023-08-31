import { type Dispatch, type SetStateAction } from 'react';

import { useState } from '#libs/hooks/hooks';

import { DEFAULT_SEARCH_PAYLOAD } from './libs/constants';

type UseSearchResult<T> = {
  filteredData: T[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const useSearch = <T>(data: T[], propertyName: keyof T): UseSearchResult<T> => {
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_PAYLOAD.search);

  const filteredData = data.filter((item) =>
    (item[propertyName] as string)
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return { filteredData, setSearchQuery };
};

export { useSearch };
