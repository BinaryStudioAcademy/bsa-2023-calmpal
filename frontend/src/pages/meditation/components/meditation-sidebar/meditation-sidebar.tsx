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
  useEffect,
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
  setIsSidebarShow: (value: boolean) => void;
};

const MeditationSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShow,
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

  const handleSelectMeditationEntry = useCallback(() => {
    setIsSidebarShow(false);
  }, [setIsSidebarShow]);

  useEffect(() => {
    void dispatch(meditationActions.getAllMeditationEntries());
  }, [dispatch]);

  return (
    <>
      <Sidebar isSidebarShown={isSidebarShown}>
        <SidebarHeader>
          <div className={styles['info']}>
            <span>Meditation & Breathing</span>
            <div className="icon-container">
              <Button
                label="Open modal"
                iconName="plus"
                iconColor={IconColor.BLUE}
                iconWidth={38}
                iconHeight={38}
                style="rounded-transparent"
                onClick={handleOpen}
                isLabelVisuallyHidden
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
                  onClick={handleSelectMeditationEntry}
                  key={filteredElement.name}
                  isActive
                />
              );
            })}
          </div>
        </SidebarBody>
      </Sidebar>

      <AddMeditationModal ref={dialogReference} onSubmit={handleSubmit} />
    </>
  );
};

export { MeditationSidebar };
