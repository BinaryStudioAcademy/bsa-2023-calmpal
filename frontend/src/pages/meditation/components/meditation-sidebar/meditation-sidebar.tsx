import meditationPlaceholder from '#assets/img/meditation-image-placeholder.png';
import {
  Button,
  Card,
  Search,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useSearch,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as meditationActions } from '#slices/meditation/meditation.js';

import { MeditationModal } from '../meditation-modal/meditation-modal.js';
import styles from './styles.module.scss';

const mockedMeditations = [{ id: 1, name: 'Meditation' }];

const mockedSelectedMeditation = {
  id: 1,
};

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const MeditationSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const dispatch = useAppDispatch();
  const { filteredElements, setFilter } = useSearch(mockedMeditations, 'name');
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setIsDisplayed(true);
  }, [setIsDisplayed]);

  const handleClose = useCallback(() => {
    setIsDisplayed(false);
  }, [setIsDisplayed]);

  const handleSubmit = useCallback(
    (title: string, file: File) => {
      void dispatch(
        meditationActions.createMeditationEntry({
          file: file,
        }),
      );
    },
    [dispatch],
  );

  const handleSelectChat = useCallback(
    (id: number) => {
      return () => {
        mockedSelectedMeditation.id = id;
        setIsSidebarShown(false);
        // TODO redux logic
      };
    },
    [setIsSidebarShown],
  );

  return (
    <>
      <Sidebar isSidebarShown={isSidebarShown}>
        <SidebarHeader>
          <div className={styles['info']}>
            <span>Meditation & Breathing</span>
            <div className="icon-container">
              <Button
                label="Open modal"
                isLabelVisuallyHidden={true}
                iconName="plus"
                iconColor={IconColor.BLUE}
                style="rounded-transparent"
                onClick={handleOpen}
              />
            </div>
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

      <MeditationModal
        isDisplayed={isDisplayed}
        setIsDisplayed={setIsDisplayed}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { MeditationSidebar };
