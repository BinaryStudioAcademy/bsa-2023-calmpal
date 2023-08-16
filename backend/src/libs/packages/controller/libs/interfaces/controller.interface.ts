import { type ServerApplicationRouteParameters } from '#libs/packages/server-application/server-application.js';

import { type ControllerRouteParameters } from '../types/types.js';

interface Controller {
  routes: ServerApplicationRouteParameters[];
  addRoute(options: ControllerRouteParameters): void;
}

export { type Controller };
