import { type AppRoute } from '#libs/enums/enums.js';

import { type ValueOf } from './value-of.type.js';

type SidebarRoute = {
  path: ValueOf<typeof AppRoute>;
  name: string;
  icon: string;
};

export { type SidebarRoute };
