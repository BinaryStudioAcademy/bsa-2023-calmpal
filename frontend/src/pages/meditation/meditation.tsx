import { useSearchParams } from 'react-router-dom';

import { MeditationList } from './meditation-list/meditation-list.js';
import { MeditationSidebar } from './meditation-sidebar/meditation-sidebar.js';

const Meditation: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams({
    isSidebarShownParam: 'true',
  });

  const isSidebarShownParameter =
    isSidebarShown.get('isSidebarShownParam') === 'true' ||
    isSidebarShown.get('isSidebarShownParam') === null;

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
