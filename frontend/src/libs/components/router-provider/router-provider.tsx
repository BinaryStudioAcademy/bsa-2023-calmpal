import {
  createBrowserRouter,
  RouterProvider as LibraryRouterProvider,
} from 'react-router-dom';

import { AppRoute } from '#libs/enums/enums.js';

import { App } from '../app/app.js';
import { ROUTER_ITEMS } from './libs/constants/constants.js';
import { iterateNestedRouteElement } from './libs/helpers/helpers.js';

const RouterProvider: React.FC = () => {
  const routes = [
    {
      path: AppRoute.ROOT,
      element: <App />,
      children: ROUTER_ITEMS.map((route) => {
        return iterateNestedRouteElement(route);
      }),
    },
  ];

  return <LibraryRouterProvider router={createBrowserRouter(routes)} />;
};

export { RouterProvider };
