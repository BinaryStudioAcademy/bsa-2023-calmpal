import '#assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  ProtectedRoute,
  RouterProvider,
  SidebarWrapper,
  StoreProvider,
  Toast,
  UserProfile,
} from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { store } from '#libs/packages/store/store.js';
import { Auth } from '#pages/auth/auth.js';
import { Chats } from '#pages/chat/chat.js';
import { Dashboard } from '#pages/dashboard/dashboard.js';
import { Journal } from '#pages/journal/journal.js';
import { Meditation } from '#pages/meditation/meditation.js';
import { Survey } from '#pages/surveys/survey.js';

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
                    <SidebarWrapper>
                      <Meditation />
                    </SidebarWrapper>
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
                    <SidebarWrapper>
                      <Dashboard />
                    </SidebarWrapper>
                  </ProtectedRoute>
                ),
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
                    <SidebarWrapper>
                      <Chats />
                    </SidebarWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.JOURNAL,
                element: (
                  <ProtectedRoute>
                    <SidebarWrapper>
                      <Journal />
                    </SidebarWrapper>
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.PROFILE,
                element: (
                  <ProtectedRoute>
                    <SidebarWrapper>
                      <UserProfile />
                    </SidebarWrapper>
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
