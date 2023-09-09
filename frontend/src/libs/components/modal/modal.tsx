import React from 'react';

import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

const INITIAL_STEP = 0;
const NEXT_STEP_INCREMENT = 1;

type StepComponentProperties = {
  onNext?: () => void;
  onClose?: () => void;
};

type Step = {
  component: React.ReactElement<StepComponentProperties>;
  title: string;
};

type Properties = {
  children?: React.ReactElement<StepComponentProperties>;
  steps?: Step[];
  isDisplayed: boolean;
  title?: string;
  onClose?: () => void;
};

const Modal: React.FC<Properties> = ({
  children,
  steps,
  isDisplayed,
  title,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);

  const goToNextStep = (): void => {
    setCurrentStep(currentStep + NEXT_STEP_INCREMENT);
  };

  const handleClose = useCallback((): void => {
    setCurrentStep(INITIAL_STEP);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const isMultiStep = Array.isArray(steps) && steps.length > INITIAL_STEP;

  const currentComponent = isMultiStep
    ? steps[currentStep]?.component
    : children;
  const currentTitle = isMultiStep ? steps[currentStep]?.title : title;

  const renderedComponent = React.isValidElement(currentComponent)
    ? React.cloneElement(currentComponent, {
        onNext: goToNextStep,
        onClose: handleClose,
      })
    : null;

  return (
    <div
      className={getValidClassNames(
        styles['overlay'],
        !isDisplayed && 'visually-hidden',
      )}
    >
      <div className={styles['container']}>
        <div className={styles['modal']}>
          <div className={styles['header']}>
            <span className={styles['title']}>{currentTitle}</span>
            <button
              className={getValidClassNames(styles['icon-container'])}
              onClick={handleClose}
            >
              <Icon name="close" color={IconColor.BLACK} />
            </button>
          </div>
          {renderedComponent}
        </div>
      </div>
    </div>
  );
};

export { Modal };
