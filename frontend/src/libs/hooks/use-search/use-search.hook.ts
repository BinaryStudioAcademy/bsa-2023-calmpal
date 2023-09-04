import { useMemo, useState } from '../hooks.js';

type UseSearchReturn<T> = {
  filteredElements: T[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const useSearch = <T>(
  elements: T[],
  propertyName: keyof T,
): UseSearchReturn<T> => {
  const [filter, setFilter] = useState('');

  const filteredElements = useMemo(() => {
    return elements.filter((element) => {
      return (element[propertyName] as string)
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
  }, [filter, elements, propertyName]);

  return { filteredElements, setFilter };
};

export { useSearch };
