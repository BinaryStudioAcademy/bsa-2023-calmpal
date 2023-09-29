import { Modal } from '#libs/components/components.js';
import {
  INITIAL_STEP,
  NEXT_STEP_INCREMENT,
  STEPS,
} from '#libs/components/modal/libs/constants/constants.js';
import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from '#libs/hooks/hooks.js';

type Properties = {
  shouldReset: boolean;
};

const DeleteAccountModal: React.ForwardRefRenderFunction<
  HTMLDialogElement,
  Properties
> = ({ shouldReset }, reference) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(INITIAL_STEP);
  const dialogReference = reference as React.RefObject<HTMLDialogElement>;
  const currentStep = STEPS[currentStepIndex];

  useEffect(() => {
    shouldReset && setCurrentStepIndex(INITIAL_STEP);
  }, [shouldReset]);

  const handleClose = useCallback((): void => {
    dialogReference.current?.open && dialogReference.current.close();
  }, [dialogReference]);

  const goToNextStep = useCallback((): void => {
    setCurrentStepIndex((previous) => {
      return Math.min(
        previous + NEXT_STEP_INCREMENT,
        STEPS.length - NEXT_STEP_INCREMENT,
      );
    });
  }, []);

  const getCurrentStep = (): React.ReactElement | null => {
    const StepComponent = (currentStep as (typeof STEPS)[0]).component;

    return <StepComponent onClose={handleClose} onNext={goToNextStep} />;
  };

  return (
    <>
      {Boolean(currentStep) && (
        <Modal
          ref={dialogReference}
          title={(currentStep as (typeof STEPS)[0]).title}
        >
          {getCurrentStep()}
        </Modal>
      )}
    </>
  );
};

const ForwardedDeleteAccountModal = forwardRef(DeleteAccountModal);

export { ForwardedDeleteAccountModal as DeleteAccountModal };
