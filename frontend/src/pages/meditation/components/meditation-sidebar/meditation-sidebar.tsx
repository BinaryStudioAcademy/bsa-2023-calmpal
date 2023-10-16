import meditationPlaceholder from '~/assets/img/meditation-image-placeholder.png';
import {
  Button,
  Card,
  Link,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '~/libs/components/components.js';
import { AppRoute, IconColor } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useEffect,
  useRef,
} from '~/libs/hooks/hooks.js';
import { type MeditationEntryCreateRequestDto } from '~/packages/meditation/meditation.js';
import { navigationItems } from '~/pages/meditation/libs/constants/constants.js';
import { actions as meditationActions } from '~/slices/meditation/meditation.js';

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
          </div>
          <Button
            label="Open modal"
            iconName="plus"
            iconColor={IconColor.BLUE}
            iconWidth={33}
            iconHeight={33}
            style="add"
            onClick={handleOpen}
            isLabelVisuallyHidden
          />
        </SidebarHeader>
        <SidebarBody>
          <div className={styles['meditation-list']}>
            {navigationItems.map((item) => {
              return (
                <Link key={item.name} to={AppRoute.MEDITATION}>
                  <Card
                    title={item.name}
                    imageUrl={meditationPlaceholder}
                    onClick={handleSelectMeditationEntry}
                    isActive
                  />
                </Link>
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
