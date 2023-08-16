import { type ServerApplicationRouteParameters } from '#libs/packages/server-application/server-application.js';

import { type ControllerRouteParameters } from './types.js';

type Controller = {
  routes: ServerApplicationRouteParameters[];
  addRoute(options: ControllerRouteParameters): void;
};

export { type Controller };
