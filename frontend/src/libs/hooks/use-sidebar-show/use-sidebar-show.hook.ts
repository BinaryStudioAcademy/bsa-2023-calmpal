import {
  AppQueryStringKey,
  SidebarModeQueryStringValue,
} from '#libs/enums/enums.js';

import { useSearchParams as useSearchParameters } from '../hooks.js';

type UseSidebarStateReturn = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const useSidebarState = (): UseSidebarStateReturn => {
  const [sidebarMode, setSidebarMode] = useSearchParameters();

  const isSidebarShown =
    sidebarMode.get(AppQueryStringKey.SIDEBAR_MODE) ===
    SidebarModeQueryStringValue.SHOW;

  const setIsSidebarShown = (value: boolean): void => {
    setSidebarMode((previous) => {
      return {
        ...previous,
        sidebarMode: value
          ? SidebarModeQueryStringValue.SHOW
          : SidebarModeQueryStringValue.HIDE,
      };
    });
  };

  return { isSidebarShown, setIsSidebarShown };
};

export { useSidebarState };
