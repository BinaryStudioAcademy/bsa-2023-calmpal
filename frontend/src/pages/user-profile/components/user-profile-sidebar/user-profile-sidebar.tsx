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
  useEffect,
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(INITIAL_STEP);

  const modalReference = useRef<HTMLDialogElement | null>(null);
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

  const handleCloseModal = useCallback((): void => {
    setModalOpen(false);
    setCurrentStepIndex(INITIAL_STEP);
  }, []);

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

    return <StepComponent onClose={handleCloseModal} onNext={goToNextStep} />;
  };

  useEffect(() => {
    if (modalReference.current) {
      if (isModalOpen) {
        modalReference.current.showModal();
      } else {
        modalReference.current.close();
      }
    }
  }, [isModalOpen, modalReference]);

  const toggleModal = useCallback(() => {
    setModalOpen((previousState) => {
      return !previousState;
    });
  }, []);

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
            onClick={toggleModal}
            iconName="delete"
            iconColor={IconColor.WHITE}
            iconWidth={24}
            iconHeight={24}
          />
          {hasCurrentStep && (
            <Modal
              ref={modalReference}
              title={currentStep.title}
              onClose={handleCloseModal}
            >
              {getCurrentStep()}
            </Modal>
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export { UserProfileSidebar };
