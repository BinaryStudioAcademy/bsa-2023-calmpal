import { type Config as LibraryConfig } from 'shared/build/index.js';

import { type EnvironmentSchema } from './types';

type Config = LibraryConfig<EnvironmentSchema>;

export { type Config };
