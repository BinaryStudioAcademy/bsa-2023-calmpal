import { type UseSearchReturn } from '#libs/types/types.js';

import { useMemo, useState } from '../hooks.js';

const useSearch = <T>(
  elements: T[],
  propertyName: keyof T,
): UseSearchReturn<T> => {
  const [filter, setFilter] = useState('');

  const filteredElements = useMemo(() => {
    return elements.filter((element) =>
      (element[propertyName] as string)
        .toLowerCase()
        .includes(filter.toLowerCase()),
    );
  }, [filter, elements, propertyName]);

  return { filteredElements, setFilter };
};

export { useSearch };
