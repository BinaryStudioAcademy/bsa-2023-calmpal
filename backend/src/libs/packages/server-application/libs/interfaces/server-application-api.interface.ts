import { type ServerApplicationRouteParameters } from '../types/types.js';

interface ServerApplicationApi {
  version: string;
  routes: ServerApplicationRouteParameters[];
  generateDoc(title: string): object;
}

export { type ServerApplicationApi };
