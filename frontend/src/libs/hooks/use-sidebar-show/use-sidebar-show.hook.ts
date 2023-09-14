import { type SetURLSearchParams } from '#libs/types/types.js';

import { useSearchParams as useSearchParameters } from '../hooks.js';

type UseSidebarStateReturn = {
  isSidebarShownParameter: boolean;
  setIsSidebarShown: SetURLSearchParams;
};

const useSidebarState = (): UseSidebarStateReturn => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParameters();

  const isSidebarShownParameter =
    isSidebarShown.get('sidebarMode') === 'show' ||
    isSidebarShown.get('sidebarMode') === null;

  return { isSidebarShownParameter, setIsSidebarShown };
};

export { useSidebarState };
