import { useSearchParams } from 'react-router-dom';

import { useEffect, useState } from '#libs/hooks/hooks.js';

import { MeditationList } from './meditation-list/meditation-list.js';
import { MeditationSidebar } from './meditation-sidebar/meditation-sidebar.js';

const Meditation: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);
  const [searchParameters, setSearchParameters] = useSearchParams();
  useEffect(() => {
    searchParameters.get('isSidebarShownParam') !== null &&
      setIsSidebarShown(searchParameters.get('isSidebarShownParam') === 'true');
  }, []);

  useEffect(() => {
    setSearchParameters({ isSidebarShownParam: String(isSidebarShown) });
  }, [isSidebarShown, setSearchParameters]);

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
