import { type Dispatch, type SetStateAction } from 'react';

import { useMemo, useState } from '#libs/hooks/hooks';

type UseSearchResult<T> = {
  filteredData: T[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const useSearch = <T>(data: T[], propertyName: keyof T): UseSearchResult<T> => {
  const [searchQuery, setSearchQuery] = useState('');

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
