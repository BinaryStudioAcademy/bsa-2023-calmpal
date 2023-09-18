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
  useRef,
  useSearch,
} from '#libs/hooks/hooks.js';
import { type MeditationEntryCreateRequestDto } from '#packages/meditation/meditation.js';
import { navigationItems } from '#pages/meditation/libs/constants/constants.js';
import { actions as meditationActions } from '#slices/meditation/meditation.js';

import { AddMeditationModal } from '../add-meditation-modal/add-meditation-modal.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const MeditationSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const dispatch = useAppDispatch();
  const { filteredElements, setFilter } = useSearch(navigationItems, 'name');
  const dialogReference = useRef<HTMLDialogElement>(null);

  const handleOpen = useCallback(() => {
    dialogReference.current?.showModal();
  }, [dialogReference]);

  const handleSubmit = useCallback(
    (payload: MeditationEntryCreateRequestDto) => {
      void dispatch(meditationActions.createMeditationEntry(payload));
    },
    [dispatch],
  );

  const handleSelectChat = useCallback(() => {
    setIsSidebarShown(false);
  }, [setIsSidebarShown]);

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
                  onClick={handleSelectChat}
                  isActive={true}
                  key={filteredElement.name}
                />
              );
            })}
          </div>
        </SidebarBody>
      </Sidebar>

      <AddMeditationModal reference={dialogReference} onSubmit={handleSubmit} />
    </>
  );
};

export { MeditationSidebar };
