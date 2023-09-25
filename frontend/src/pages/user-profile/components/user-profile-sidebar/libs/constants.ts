import { AppRoute } from '#libs/enums/enums.js';
import { type SettingsOption } from '#libs/types/types.js';

const SETTINGS_OPTIONS: SettingsOption[] = [
  {
    key: 'notification',
    title: 'Notifications and Reminders',
    path: AppRoute.PROFILE,
  },
];

export { SETTINGS_OPTIONS };
