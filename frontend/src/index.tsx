import '#assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  NavigationMenuWrapper,
  ProtectedRoute,
  RouterProvider,
  StoreProvider,
  Toast,
} from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { store } from '#libs/packages/store/store.js';
import { Auth } from '#pages/auth/auth.js';
import { Chat } from '#pages/chat/chat.js';
import { Dashboard } from '#pages/dashboard/dashboard.js';
import { Journal } from '#pages/journal/journal.js';
import { Meditation } from '#pages/meditation/meditation.js';
import { Survey } from '#pages/surveys/survey.js';
import { UserProfile } from '#pages/user-profile/user-profile.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider
        routes={[
          {
            path: AppRoute.ROOT,
            element: <App />,
            children: [
              {
                path: AppRoute.MEDITATION,
                element: (
                  <ProtectedRoute>
                    <NavigationMenuWrapper>
                      <Meditation />
                    </NavigationMenuWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
              },
              {
                path: AppRoute.ROOT,
                element: (
                  <ProtectedRoute>
                    <NavigationMenuWrapper>
                      <Dashboard />
                    </NavigationMenuWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP_SURVEY,
                element: (
                  <ProtectedRoute>
                    <Survey />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.CHATS,
                element: (
                  <ProtectedRoute>
                    <NavigationMenuWrapper>
                      <Chat />
                    </NavigationMenuWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.JOURNAL,
                element: (
                  <ProtectedRoute>
                    <NavigationMenuWrapper>
                      <Journal />
                    </NavigationMenuWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.PROFILE,
                element: (
                  <ProtectedRoute>
                    <NavigationMenuWrapper>
                      <UserProfile />
                    </NavigationMenuWrapper>
                  </ProtectedRoute>
                ),
              },
            ],
          },
        ]}
      />
      <Toast />
    </StoreProvider>
  </StrictMode>,
);
