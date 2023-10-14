import { type RefObject, useImperativeHandle } from 'react';

import { Modal } from '~/libs/components/components.js';
import {
  forwardRef,
  useCallback,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';

import {
  INITIAL_STEP,
  NEXT_STEP_INCREMENT,
  STEPS,
} from './libs/constants/contants.js';
import { type DeleteAccountModalHandler } from './libs/types/types.js';
import styles from './styles.module.scss';

const DeleteAccountModal: React.ForwardRefRenderFunction<
  DeleteAccountModalHandler
> = (_, reference) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(INITIAL_STEP);
  const currentStep = STEPS[currentStepIndex];

  const modalReference = useRef<HTMLDialogElement>(null);

  const handleClose = useCallback((): void => {
    if (modalReference.current?.open) {
      modalReference.current.close();
    }
  }, [modalReference]);

  const handleShow = useCallback((): void => {
    if (!modalReference.current?.open) {
      modalReference.current?.showModal();
    }
  }, [modalReference]);

  useImperativeHandle(reference as RefObject<DeleteAccountModalHandler>, () => {
    return {
      handleShowModal: (): void => {
        setCurrentStepIndex(INITIAL_STEP);
        handleShow();
      },
    };
  });

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
          ref={modalReference}
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
