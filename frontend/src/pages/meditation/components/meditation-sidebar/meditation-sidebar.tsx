import meditationPlaceholder from '#assets/img/meditation-image-placeholder.png';
import {
  Button,
  Card,
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
} from '#libs/hooks/hooks.js';
import { type MeditationEntryCreateRequestDto } from '#packages/meditation/meditation.js';
import { navigationItems } from '#pages/meditation/libs/constants/constants.js';
import { actions as meditationActions } from '#slices/meditation/meditation.js';

import { AddMeditationModal } from '../add-meditation-modal/add-meditation-modal.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  onSetIsSidebarShow: (value: boolean) => void;
};

const MeditationSidebar: React.FC<Properties> = ({
  isSidebarShown,
  onSetIsSidebarShow,
}) => {
  const dispatch = useAppDispatch();
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
    onSetIsSidebarShow(false);
  }, [onSetIsSidebarShow]);

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
          <div className={styles['meditation-list']}>
            {navigationItems.map((item) => {
              return (
                <Card
                  title={item.name}
                  imageUrl={meditationPlaceholder}
                  onClick={handleSelectMeditationEntry}
                  key={item.name}
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
