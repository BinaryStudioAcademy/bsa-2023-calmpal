import { useSidebarState } from '#libs/hooks/hooks.js';

import { MeditationList, MeditationSidebar } from './components/components.js';

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
