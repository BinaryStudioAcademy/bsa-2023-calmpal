import { useMemo, useState } from '../hooks.js';

const useSearch = <T>(
  elements: T[],
  propertyName: keyof T,
): {
  filteredElements: T[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
} => {
  const [filter, setFilter] = useState('');

  const filteredElements = useMemo(() => {
    const regex = new RegExp(filter, 'i');

    return elements.filter((element) =>
      regex.test(String(element[propertyName])),
    );
  }, [filter, elements, propertyName]);

  return { filteredElements, setFilter };
};

export { useSearch };
