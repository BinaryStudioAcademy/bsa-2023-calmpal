import { type ReactNode } from 'react';

import { NavigationMenuWrapper } from '#libs/components/navigation-menu-wrapper/navigation-menu-wrapper.js';
import { AppRoute } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';
import { Auth } from '#pages/auth/auth.js';
import { Chat } from '#pages/chat/chat.js';
import { Dashboard } from '#pages/dashboard/dashboard.js';
import { Journal } from '#pages/journal/journal.js';
import { MeditationPlayer } from '#pages/meditation/components/components.js';
import { Meditation } from '#pages/meditation/meditation.js';
import { Survey } from '#pages/surveys/survey.js';
import { UserProfile } from '#pages/user-profile/user-profile.js';

const routerPathToElement: Record<
  ValueOf<typeof AppRoute>,
  {
    type?: 'private' | undefined;
    element: ReactNode;
  }
> = {
  [AppRoute.MEDITATION]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <Meditation />
      </NavigationMenuWrapper>
    ),
  },
  [AppRoute.MEDITATION_$ID]: {
    type: 'private',
    element: <MeditationPlayer />,
  },
  [AppRoute.SIGN_IN]: {
    element: <Auth />,
  },
  [AppRoute.SIGN_UP]: {
    element: <Auth />,
  },
  [AppRoute.ROOT]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <Dashboard />
      </NavigationMenuWrapper>
    ),
  },
  [AppRoute.SIGN_UP_SURVEY]: {
    type: 'private',
    element: <Survey />,
  },
  [AppRoute.CHATS]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <Chat />
      </NavigationMenuWrapper>
    ),
  },
  [AppRoute.CHATS_$ID]: {
    type: 'private',
    element: <Chat />,
  },
  [AppRoute.JOURNAL]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <Journal />
      </NavigationMenuWrapper>
    ),
  },
  [AppRoute.JOURNAL_$ID]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <Journal />
      </NavigationMenuWrapper>
    ),
  },
  [AppRoute.PROFILE]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <UserProfile />
      </NavigationMenuWrapper>
    ),
  },
  [AppRoute.PROFILE_SUBSCRIPTION]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <UserProfile />
      </NavigationMenuWrapper>
    ),
  },
  [AppRoute.PROFILE_SUBSCRIPTION_CHECKOUT]: {
    type: 'private',
    element: (
      <NavigationMenuWrapper>
        <UserProfile />
      </NavigationMenuWrapper>
    ),
  },
};

export { routerPathToElement };
