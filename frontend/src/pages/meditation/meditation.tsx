import { useSearchParams } from 'react-router-dom';

import { MeditationList } from './meditation-list/meditation-list.js';
import { MeditationSidebar } from './meditation-sidebar/meditation-sidebar.js';

const Meditation: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams({
    isSidebarShownParam: 'true',
  });

  return (
    <>
      <MeditationSidebar
        isSidebarShown={isSidebarShown.get('isSidebarShownParam') === 'true'}
        setIsSidebarShown={setIsSidebarShown}
      />
      <MeditationList
        isSidebarShown={isSidebarShown.get('isSidebarShownParam') === 'true'}
        setIsSidebarShown={setIsSidebarShown}
      />
    </>
  );
};
export { Meditation };
