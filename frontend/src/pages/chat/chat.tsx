import { useSearchParams } from 'react-router-dom';

import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '#libs/hooks/hooks.js';

import { ChatSidebar } from './components/components.js';
import styles from './styles.module.scss';

const Chats: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);
  const [searchParameters, setSearchParameters] = useSearchParams();
  useEffect(() => {
    searchParameters.get('isSidebarShownParam') !== null &&
      setIsSidebarShown(searchParameters.get('isSidebarShownParam') === 'true');
  }, []);

  useEffect(() => {
    setSearchParameters({ isSidebarShownParam: String(isSidebarShown) });
  }, [isSidebarShown, setSearchParameters]);

  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown(true);
  }, [setIsSidebarShown]);

  return (
    <>
      <ChatSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackwardButton handleButtonBackward={handleButtonBackward} />
        hi there
      </div>
    </>
  );
};

export { Chats };
