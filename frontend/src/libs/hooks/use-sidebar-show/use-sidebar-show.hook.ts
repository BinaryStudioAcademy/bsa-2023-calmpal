import { AppQueryStringKey, SidebarMode } from '~/libs/enums/enums.js';

import { useSearchParams as useSearchParameters } from '../hooks.js';

type UseSidebarStateReturn = {
  isSidebarShown: boolean;
  setIsSidebarShow: (value: boolean) => void;
};

const useSidebarState = (): UseSidebarStateReturn => {
  const [sidebarMode, setSidebarMode] = useSearchParameters();

  const isSidebarShown =
    sidebarMode.get(AppQueryStringKey.SIDEBAR_MODE) === SidebarMode.SHOW;

  const setIsSidebarShow = (value: boolean): void => {
    setSidebarMode((previous) => {
      return {
        ...previous,
        sidebarMode: value ? SidebarMode.SHOW : SidebarMode.HIDE,
      };
    });
  };

  return { isSidebarShown, setIsSidebarShow };
};

export { useSidebarState };
