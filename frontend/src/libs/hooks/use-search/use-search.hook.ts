import { useMemo } from '../hooks.js';

const useSearch = <T>(
  query: string,
  elements: T[],
  propertyName: keyof T,
): T[] => {
  return useMemo(() => {
    const regex = new RegExp(query, 'i');

    return elements.filter((element) =>
      regex.test(String(element[propertyName])),
    );
  }, [query, elements, propertyName]);
};

export { useSearch };
