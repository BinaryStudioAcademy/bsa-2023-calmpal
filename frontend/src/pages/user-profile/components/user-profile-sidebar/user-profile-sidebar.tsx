import { type ReactElement } from 'react';

import {
  Card,
  Icon,
  Modal,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import {
  INITIAL_STEP,
  NEXT_STEP_INCREMENT,
  STEPS,
} from '#libs/components/modal/libs/constants/constants.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useRef,
  useState,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { SETTINGS_OPTIONS } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const UserProfileSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const dispatch = useAppDispatch();

  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
    };
  });

  const [activeItem, setActiveItem] = useState<string>('notification');
  const [currentStepIndex, setCurrentStepIndex] = useState(INITIAL_STEP);

  const dialogReference = useRef<HTMLDialogElement>(null);
  const isDialogAvailable = dialogReference.current !== null;
  const currentStep = STEPS[currentStepIndex];
  const hasCurrentStep =
    currentStep && typeof currentStep.component === 'function';

  const handleClick = useCallback(
    (key: string) => {
      return () => {
        setIsSidebarShown(false);
        setActiveItem(key);
      };
    },
    [setIsSidebarShown],
  );

  const handleSignOut = useCallback((): void => {
    void dispatch(authActions.signOut());
  }, [dispatch]);

  const handleClose = useCallback((): void => {
    if (isDialogAvailable && dialogReference.current.open) {
      dialogReference.current.close();
    }
  }, [dialogReference]);

  const handleOpen = useCallback(() => {
    setCurrentStepIndex(INITIAL_STEP);
    dialogReference.current?.showModal();
  }, [dialogReference]);

  const goToNextStep = useCallback((): void => {
    setCurrentStepIndex((previous) => {
      return Math.min(
        previous + NEXT_STEP_INCREMENT,
        STEPS.length - NEXT_STEP_INCREMENT,
      );
    });
  }, []);

  const getCurrentStep = (): ReactElement | null => {
    if (!currentStep) {
      return null;
    }

    const StepComponent = currentStep.component;

    return <StepComponent onClose={handleClose} onNext={goToNextStep} />;
  };

  return (
    <Sidebar isSidebarShown={isSidebarShown}>
      <SidebarHeader>
        <div className={styles['info']}>
          <span className="visually-hidden">Profile settings</span>
          <span>My Profile</span>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['user']}>
          <div className="visually-hidden">User details</div>
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <Icon name="user" color={IconColor.WHITE} />
            </div>
            <div className={styles['user-name']}>
              {authenticatedUser.fullName}
            </div>
          </div>
        </div>

        <div className={styles['buttons-container']}>
          <div className="visually-hidden">Profile settings options</div>
          {SETTINGS_OPTIONS.map((option) => {
            return (
              <Card
                key={option.key}
                title={option.title}
                onClick={handleClick(option.key)}
                isActive={activeItem === option.key}
                iconName={option.key}
                iconColor={IconColor.WHITE}
              />
            );
          })}
          <Card
            title="Sign Out"
            onClick={handleSignOut}
            iconName="sign-out"
            iconColor={IconColor.WHITE}
          />
          <Card
            title="Delete account"
            onClick={handleOpen}
            iconName="delete"
            iconColor={IconColor.WHITE}
            iconWidth={24}
            iconHeight={24}
          />
          {hasCurrentStep && (
            <Modal ref={dialogReference} title={currentStep.title}>
              {getCurrentStep()}
            </Modal>
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export { UserProfileSidebar };
