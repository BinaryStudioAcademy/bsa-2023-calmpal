import { useSidebarState } from '#libs/hooks/hooks.js';

import { MeditationList } from './meditation-list/meditation-list.js';
import { MeditationSidebar } from './meditation-sidebar/meditation-sidebar.js';

const Meditation: React.FC = () => {
  const { isSidebarShown, setIsSidebarShown } = useSidebarState();

  return (
    <>
      <MeditationSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <MeditationList
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
    </>
  );
};
export { Meditation };
