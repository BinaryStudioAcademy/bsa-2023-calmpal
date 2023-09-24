import { RouterOutlet } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { useMatch, useSidebarState } from '#libs/hooks/hooks.js';

import { MeditationList, MeditationSidebar } from './components/components.js';

const Meditation: React.FC = () => {
  const { isSidebarShown, setIsSidebarShow } = useSidebarState();
  const isBaseMeditationRoute = useMatch(AppRoute.MEDITATION);

  return (
    <>
      <MeditationSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShow={setIsSidebarShow}
      />
      {isBaseMeditationRoute && (
        <MeditationList
          isSidebarShown={isSidebarShown}
          setIsSidebarShow={setIsSidebarShow}
        />
      )}
      <RouterOutlet />
    </>
  );
};
export { Meditation };
