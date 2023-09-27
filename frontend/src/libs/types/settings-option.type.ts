import { type AppRoute } from '#libs/enums/enums.js';
import { type IconName, type ValueOf } from '#libs/types/types.js';

type SettingsOption = {
  key: IconName;
  title: string;
  path: ValueOf<typeof AppRoute>;
};

export { type SettingsOption };
