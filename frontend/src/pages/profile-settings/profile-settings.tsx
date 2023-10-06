import { AppRoute } from '#libs/enums/enums.js';
import { useLocation } from '#libs/hooks/hooks.js';

import {
  Notifications,
  Subscription,
  SubscriptionCheckout,
} from './components/components.js';

const ProfileSettings: React.FC = () => {
  const { pathname } = useLocation();

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.PROFILE: {
        return <Notifications />;
      }

      case AppRoute.PROFILE_SUBSCRIPTION: {
        return <Subscription />;
      }

      case AppRoute.PROFILE_SUBSCRIPTION_CHECKOUT: {
        return <SubscriptionCheckout />;
      }

      default: {
        return null;
      }
    }
  };

  return getScreen(pathname);
};

export { ProfileSettings };
