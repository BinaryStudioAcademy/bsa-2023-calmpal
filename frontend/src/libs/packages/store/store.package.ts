import {
  type AnyAction,
  configureStore,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '#libs/enums/enums.js';
import { type Config } from '#libs/packages/config/config.js';
import { notification } from '#libs/packages/notification/notification.js';
import {
  handleError,
  handleUnauthorized,
} from '#libs/packages/store/middlewares/middlewares.js';
import { authApi } from '#packages/auth/auth.js';
import { chatMessagesApi } from '#packages/chat-messages/chat-messages.js';
import { chatApi } from '#packages/chats/chats.js';
import { journalApi } from '#packages/journal/journal.js';
import { meditationApi } from '#packages/meditation/meditation.js';
import { subscriptionApi } from '#packages/subscriptions/subscriptions.js';
import { reducer as appReducer } from '#slices/app/app.js';
import { reducer as authReducer } from '#slices/auth/auth.js';
import { reducer as chatsReducer } from '#slices/chats/chats.js';
import { reducer as journalReducer } from '#slices/journal/journal.js';
import { reducer as meditationReducer } from '#slices/meditation/meditation.js';
import { reducer as subscriptionReducer } from '#slices/subscription/subscription.js';
import { reducer as surveyReducer } from '#slices/survey/survey.js';
import { reducer as usersReducer } from '#slices/users/users.js';

import { storage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  app: ReturnType<typeof appReducer>;
  journal: ReturnType<typeof journalReducer>;
  meditation: ReturnType<typeof meditationReducer>;
  chats: ReturnType<typeof chatsReducer>;
  survey: ReturnType<typeof surveyReducer>;
  subscription: ReturnType<typeof subscriptionReducer>;
  users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  journalApi: typeof journalApi;
  meditationApi: typeof meditationApi;
  chatApi: typeof chatApi;
  storage: typeof storage;
  notification: typeof notification;
  chatMessagesApi: typeof chatMessagesApi;
  subscriptionApi: typeof subscriptionApi;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]>
    >
  >;

  public constructor(config: Config) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
        app: appReducer,
        journal: journalReducer,
        meditation: meditationReducer,
        chats: chatsReducer,
        survey: surveyReducer,
        subscription: subscriptionReducer,
        users: usersReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return [
          ...getDefaultMiddleware({
            thunk: {
              extraArgument: this.extraArguments,
            },
          }),
          handleUnauthorized,
          handleError,
        ];
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      journalApi,
      meditationApi,
      chatApi,
      storage,
      notification,
      chatMessagesApi,
      subscriptionApi,
    };
  }
}

export { Store };
