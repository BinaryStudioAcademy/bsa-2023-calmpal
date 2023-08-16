import { type HTTPOptions } from '../types/http-options.type.js';

interface HTTP {
  load(path: string, options: HTTPOptions): Promise<Response>;
}

export { type HTTP };
