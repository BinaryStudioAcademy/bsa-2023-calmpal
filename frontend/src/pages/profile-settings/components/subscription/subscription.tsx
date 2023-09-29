import { useAppSelector } from '#libs/hooks/hooks.js';
import { SUBSCRIPTION_PRICE } from '#packages/subscriptions/subscriptions.js';

import {
  SubscriptionManagementDialog,
  SubscriptionPlan,
} from './components/components.js';
import { PLAN_BENEFITS } from './libs/constants.js';

const Subscription: React.FC = () => {
  const { subscriptionEndDate } = useAppSelector(({ auth }) => {
    return {
      subscriptionEndDate: auth.authenticatedUser?.subscriptionEndDate,
    };
  });

  const hasSubscription = Boolean(subscriptionEndDate);

  return (
    <section>
      {hasSubscription ? (
        <SubscriptionManagementDialog
          benefits={PLAN_BENEFITS}
          subscriptionPrice={SUBSCRIPTION_PRICE}
          subscriptionEndDate={subscriptionEndDate as Date}
        />
      ) : (
        <SubscriptionPlan
          benefits={PLAN_BENEFITS}
          subscriptionPrice={SUBSCRIPTION_PRICE}
        />
      )}
    </section>
  );
};
export { Subscription };
