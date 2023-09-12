const useSidebarShow = (searchParameter: string | null): boolean => {
  return searchParameter === 'show' || searchParameter === null;
};

export { useSidebarShow };
