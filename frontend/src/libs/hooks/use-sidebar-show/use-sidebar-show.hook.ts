import { useSearchParams as useSearchParameters } from '../hooks.js';

type UseSidebarStateReturn = {
  isSidebarShownParameter: boolean;
  setIsSidebarShown: (isSidebarShown: boolean) => void;
};

const useSidebarState = (): UseSidebarStateReturn => {
  const [sidebarMode, setSidebarMode] = useSearchParameters();

  const isSidebarShownParameter =
    sidebarMode.get('sidebarMode') === 'show' ||
    sidebarMode.get('sidebarMode') === null;

  const setIsSidebarShown = (isSidebarShown: boolean): void => {
    setSidebarMode((previous) => {
      return { ...previous, sidebarMode: isSidebarShown ? 'show' : 'hide' };
    });
  };

  return { isSidebarShownParameter, setIsSidebarShown };
};

export { useSidebarState };
