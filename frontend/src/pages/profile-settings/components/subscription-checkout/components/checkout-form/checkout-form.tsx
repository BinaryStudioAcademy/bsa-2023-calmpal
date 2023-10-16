import { Button } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import {
  useElements,
  useStripe,
} from '~/pages/profile-settings/libs/hooks/hooks.js';
import {
  cancelPaymentIntent,
  confirmPaymentIntent,
} from '~/slices/subscription/actions.js';

import { PaymentElement } from '../components.js';
import styles from './styles.module.scss';

const CheckoutForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const { paymentId, confirmPaymentDataStatus } = useAppSelector(
    ({ subscription }) => {
      return {
        paymentId: subscription.paymentId,
        confirmPaymentDataStatus: subscription.confirmPaymentDataStatus,
      };
    },
  );

  const isLoading = confirmPaymentDataStatus === 'pending';
  const isDisabled = isLoading || !stripe || !elements;

  const handleSubmit = useCallback(
    (event_: React.FormEvent<HTMLFormElement>) => {
      event_.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      void dispatch(confirmPaymentIntent({ elements, stripe }));
    },
    [elements, stripe, dispatch],
  );

  const handleCancelPayment = useCallback(() => {
    if (!paymentId) {
      return;
    }

    void dispatch(cancelPaymentIntent({ id: paymentId }));
  }, [dispatch, paymentId]);

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <PaymentElement />
      <div className={styles['button-wrapper']}>
        <Button
          type="button"
          label="Cancel"
          style="primary"
          styleColor="blue"
          onClick={handleCancelPayment}
          isDisabled={isDisabled}
        />
        <Button
          type="submit"
          label="Pay now"
          style="primary"
          styleColor="blue"
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export { CheckoutForm };
