import { RouterOutlet } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { useMatch, useSidebarState } from '#libs/hooks/hooks.js';

import { MeditationList } from './meditation-list/meditation-list.js';
import { MeditationSidebar } from './meditation-sidebar/meditation-sidebar.js';

const Meditation: React.FC = () => {
  const { isSidebarShown, setIsSidebarShown } = useSidebarState();
  const isBaseMeditationRoute = useMatch(AppRoute.MEDITATION);

  return (
    <>
      <MeditationSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      {isBaseMeditationRoute && (
        <MeditationList
          isSidebarShown={isSidebarShown}
          setIsSidebarShown={setIsSidebarShown}
        />
      )}
      <RouterOutlet />
    </>
  );
};
export { Meditation };
