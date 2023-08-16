import { type ServerApplicationRouteParameters } from '../types/types.js';

interface ServerApplication {
  addRoute(parameters: ServerApplicationRouteParameters): void;
  addRoutes(parameters: ServerApplicationRouteParameters[]): void;
}

export { type ServerApplication };
