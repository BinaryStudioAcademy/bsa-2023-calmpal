import { useSearchParams } from '#libs/hooks/hooks.js';

import { MeditationList } from './meditation-list/meditation-list.js';
import { MeditationSidebar } from './meditation-sidebar/meditation-sidebar.js';

const Meditation: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams();

  const isSidebarShownParameter =
    isSidebarShown.get('sidebarMode') === 'show' ||
    isSidebarShown.get('sidebarMode') === null;

  return (
    <>
      <MeditationSidebar
        isSidebarShown={isSidebarShownParameter}
        setIsSidebarShown={setIsSidebarShown}
      />
      <MeditationList
        isSidebarShown={isSidebarShownParameter}
        setIsSidebarShown={setIsSidebarShown}
      />
    </>
  );
};
export { Meditation };
