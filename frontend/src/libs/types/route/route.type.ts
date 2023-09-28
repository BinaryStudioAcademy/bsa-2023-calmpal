import { type AppRoute } from '#libs/enums/enums.js';

import { type IconName } from '../types.js';
import { type ValueOf } from '../value-of.type.js';

type Route = {
  path: ValueOf<typeof AppRoute>;
  name: string;
  icon: IconName;
  wrapPathWith?: (
    path: ValueOf<typeof AppRoute>,
  ) => ValueOf<typeof AppRoute> | undefined;
};

export { type Route };
