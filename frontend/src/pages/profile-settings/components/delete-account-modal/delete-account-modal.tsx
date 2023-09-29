import { type RefObject, useImperativeHandle } from 'react';

import { Modal } from '#libs/components/components.js';
import { forwardRef, useCallback, useState } from '#libs/hooks/hooks.js';

import {
  INITIAL_STEP,
  NEXT_STEP_INCREMENT,
  STEPS,
} from './libs/constants/contants.js';
import { type DeleteAccountModalHandler } from './libs/types/types.js';
import styles from './styles.module.scss';

const DeleteAccountModal: React.ForwardRefRenderFunction<
  HTMLDialogElement & DeleteAccountModalHandler
> = (_, reference) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(INITIAL_STEP);
  const currentStep = STEPS[currentStepIndex];

  useImperativeHandle(reference as RefObject<DeleteAccountModalHandler>, () => {
    return {
      handleResetStep: (): void => {
        setCurrentStepIndex(INITIAL_STEP);
      },
    };
  });

  const handleClose = useCallback((): void => {
    if ((reference as RefObject<HTMLDialogElement>).current?.open) {
      (reference as RefObject<HTMLDialogElement>).current?.close();
    }
  }, [reference]);

  const goToNextStep = useCallback((): void => {
    setCurrentStepIndex((previous) => {
      return Math.min(
        previous + NEXT_STEP_INCREMENT,
        STEPS.length - NEXT_STEP_INCREMENT,
      );
    });
  }, []);

  const getCurrentStep = (): React.ReactElement | null => {
    const StepComponent = (currentStep as NonNullable<typeof currentStep>)
      .component;

    return <StepComponent onClose={handleClose} onNext={goToNextStep} />;
  };

  return (
    <>
      {Boolean(currentStep) && (
        <Modal
          ref={reference}
          title={(currentStep as NonNullable<typeof currentStep>).title}
        >
          <div className={styles['modal-body']}>{getCurrentStep()}</div>
        </Modal>
      )}
    </>
  );
};

const ForwardedDeleteAccountModal = forwardRef(DeleteAccountModal);

export { ForwardedDeleteAccountModal as DeleteAccountModal };
