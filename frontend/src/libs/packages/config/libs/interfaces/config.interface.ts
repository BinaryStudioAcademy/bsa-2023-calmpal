import { type Config as LibraryConfig } from 'shared/build/index.js';

import { type EnvironmentSchema } from '../types/types.js';

interface Config extends LibraryConfig<EnvironmentSchema> {}

export { type Config };
