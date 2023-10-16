import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  RouterProvider,
  StoreProvider,
  Toast,
} from '~/libs/components/components.js';
import { store } from '~/libs/packages/store/store.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider />
      <Toast />
    </StoreProvider>
  </StrictMode>,
);
