import meditationPlaceholder from '#assets/img/meditation-image-placeholder.png';
import { Card, DropdownMenu, Search } from '#libs/components/components.js';
import { SIDEBAR_ROUTES as routes } from '#libs/components/navigation-menu-wrapper/libs/constants.js';
import { useCallback, useSearch } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

const mockedMeditations = [{ id: 1, name: 'Meditation' }];

const mockedSelectedMeditation = {
  id: 1,
};

const MeditationSidebar: React.FC = () => {
  const { filteredElements, setFilter } = useSearch(mockedMeditations, 'name');

  const handleSelectChat = useCallback((id: number) => {
    return () => {
      mockedSelectedMeditation.id = id;
      // TODO redux logic
    };
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['info']}>
          <span>Meditation & Breathing</span>
          <DropdownMenu routes={routes} />
        </div>
      </div>
      <div className={styles['list']}>
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
      </div>
    </div>
  );
};

export { MeditationSidebar };
