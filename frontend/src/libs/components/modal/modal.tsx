import React from 'react';

import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { Button } from '../components.js';
import {
  INITIAL_STEP,
  NEXT_STEP_INCREMENT,
} from './libs/constants/constants.js';
import styles from './styles.module.scss';

type StepComponentProperties = {
  onNext?: () => void;
  onClose?: () => void;
};

type Step = {
  component: React.FC<StepComponentProperties>;
  title: string;
};

type Properties = {
  children?: React.FC<StepComponentProperties>;
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
    onClose?.();
  }, [onClose]);

  const isMultiStep = Array.isArray(steps) && steps.length > INITIAL_STEP;

  const currentComponent = isMultiStep
    ? steps[currentStep]?.component
    : children;
  const currentTitle = isMultiStep ? steps[currentStep]?.title : title;

  const renderedComponent = currentComponent
    ? React.createElement(currentComponent, {
        onNext: goToNextStep,
        onClose: handleClose,
      })
    : null;

  return (
    <dialog
      open={isDisplayed}
      className={getValidClassNames(
        styles['overlay'],
        !isDisplayed && 'visually-hidden',
      )}
    >
      <div className={styles['container']}>
        <div className={styles['modal']}>
          <div className={styles['header']}>
            <span className={styles['title']}>{currentTitle}</span>
            <div className={styles['icon-container']}>
              <Button
                label=""
                iconName="close"
                iconColor={IconColor.BLACK}
                style="rounded-transparent"
                onClick={handleClose}
              />
            </div>
          </div>
          {renderedComponent}
        </div>
      </div>
    </dialog>
  );
};

export { Modal };
