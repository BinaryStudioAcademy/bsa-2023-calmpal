type UseSearchReturn<T> = {
  filteredElements: T[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export { type UseSearchReturn };
