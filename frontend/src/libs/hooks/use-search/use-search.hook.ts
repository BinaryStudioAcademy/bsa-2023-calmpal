import { useDebounce, useMemo } from '../hooks.js';

const useSearch = <T>(
  query: string,
  elements: T[],
  propertyName: keyof T,
): T[] => {
  const debounced = useDebounce(query);

  return useMemo(() => {
    const regex = new RegExp(debounced, 'i');

    return elements.filter((element) =>
      regex.test(String(element[propertyName])),
    );
  }, [elements, propertyName, debounced]);
};

export { useSearch };
