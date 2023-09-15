import { useSearchParams as useSearchParameters } from '../hooks.js';

type UseSidebarStateReturn = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const useSidebarState = (): UseSidebarStateReturn => {
  const [sidebarMode, setSidebarMode] = useSearchParameters();

  const isSidebarShown =
    sidebarMode.get('sidebarMode') === 'show' ||
    !sidebarMode.get('sidebarMode');

  const setIsSidebarShown = (value: boolean): void => {
    setSidebarMode((previous) => {
      return { ...previous, sidebarMode: value ? 'show' : 'hide' };
    });
  };

  return { isSidebarShown, setIsSidebarShown };
};

export { useSidebarState };
