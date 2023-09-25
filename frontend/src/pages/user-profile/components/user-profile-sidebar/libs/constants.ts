import { AppRoute } from '#libs/enums/enums.js';
import { type SettingsOption } from '#libs/types/types.js';

const SETTINGS_OPTIONS: SettingsOption[] = [
  {
    key: 'notification',
    title: 'Notifications and Reminders',
    path: AppRoute.PROFILE,
  },
  {
    key: 'subscription',
    title: 'My Subscription',
    path: AppRoute.PROFILE_SUBSCRIPTION,
  },
];

export { SETTINGS_OPTIONS };
