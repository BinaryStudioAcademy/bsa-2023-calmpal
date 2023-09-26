import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '#libs/hooks/hooks.js';
import { config } from '#libs/packages/config/config.js';
import { SUBSCRIPTION_PRICE } from '#packages/subscriptions/subscriptions.js';
import { loadStripe } from '#pages/profile-settings/libs/helpers/helpers.js';
import { type StripeElementsOptions } from '#pages/profile-settings/libs/types/types.js';
import { actions as subscriptionActions } from '#slices/subscription/subscription.js';

import { Elements } from '../components.js';
import { CheckoutForm } from './components/components.js';

const stripe = loadStripe(config.ENV.STRIPE.PUBLIC_KEY);

const SubscriptionCheckout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { clientSecret } = useAppSelector(({ subscription }) => {
    return {
      clientSecret: subscription.clientSecret,
    };
  });

  useEffect(() => {
    void dispatch(
      subscriptionActions.createPaymentIntent({ price: SUBSCRIPTION_PRICE }),
    );
  }, [dispatch]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret as string,
    appearance: {
      theme: 'flat',
    },
  };

  return (
    <section>
      {Boolean(clientSecret) && (
        <Elements options={options} stripe={stripe}>
          <CheckoutForm />
        </Elements>
      )}
    </section>
  );
};
export { SubscriptionCheckout };
