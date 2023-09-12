import { type SetURLSearchParams } from 'react-router-dom';

import meditationPlaceholder from '#assets/img/meditation-image-placeholder.png';
import {
  Card,
  Search,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import { useCallback, useSearch } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: SetURLSearchParams;
};

const mockedMeditations = [{ id: 1, name: 'Meditation' }];

const mockedSelectedMeditation = {
  id: 1,
};

const MeditationSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const { filteredElements, setFilter } = useSearch(mockedMeditations, 'name');

  const handleSelectChat = useCallback(
    (id: number) => {
      return () => {
        mockedSelectedMeditation.id = id;
        setIsSidebarShown({ isSidebarShownParam: 'false' });
        // TODO redux logic
      };
    },
    [setIsSidebarShown],
  );

  return (
    <Sidebar isSidebarShown={isSidebarShown}>
      <SidebarHeader>
        <div className={styles['info']}>
          <span>Meditation & Breathing</span>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['search']}>
          <Search onValueChange={setFilter} />
        </div>
        <div className={styles['meditation-list']}>
          {filteredElements.map((filteredElement) => {
            return (
              <Card
                title={filteredElement.name}
                imageUrl={meditationPlaceholder}
                onClick={handleSelectChat(filteredElement.id)}
                isActive={mockedSelectedMeditation.id === filteredElement.id}
                key={filteredElement.id}
              />
            );
          })}
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export { MeditationSidebar };
