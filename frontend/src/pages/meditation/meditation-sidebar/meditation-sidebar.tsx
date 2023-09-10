import meditationPlaceholder from '#assets/img/meditation-image-placeholder.png';
import { Card, Search, Sidebar } from '#libs/components/components.js';
import {
  Body,
  Header,
} from '#libs/components/sidebar/components/components.js';
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
    <Sidebar>
      <Header>
        <div className={styles['info']}>
          <span>Meditation & Breathing</span>
        </div>
      </Header>
      <Body>
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
      </Body>
    </Sidebar>
  );
};

export { MeditationSidebar };
