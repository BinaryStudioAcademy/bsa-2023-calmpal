import { type HTTPApiOptions } from '../types/types.js';

interface HTTPApi {
  load(path: string, options: HTTPApiOptions): Promise<Response>;
}

export { type HTTPApi };
