import { config } from '#libs/packages/config/config.js';

import { Store } from './store.package.js';

const store = new Store(config);

type AppDispatch = typeof store.instance.dispatch;

export { type AppDispatch };
export { store };
