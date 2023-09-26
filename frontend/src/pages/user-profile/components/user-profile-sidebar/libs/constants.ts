import { AppRoute } from '#libs/enums/enums.js';
import { type SettingsOption } from '#libs/types/types.js';

const SETTING_NAME_INDEX = 2;

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

export { SETTING_NAME_INDEX, SETTINGS_OPTIONS };
