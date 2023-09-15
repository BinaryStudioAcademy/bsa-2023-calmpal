import {
  type AnyAction,
  configureStore,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '#libs/enums/enums.js';
import { type Config } from '#libs/packages/config/config.js';
import { notification } from '#libs/packages/notification/notification.js';
import { handleError } from '#libs/packages/store/middlewares/middlewares.js';
import { authApi } from '#packages/auth/auth.js';
import { chatApi } from '#packages/chats/chats.js';
import { filesApi } from '#packages/files/files.js';
import { journalApi } from '#packages/journal/journal.js';
import { meditationApi } from '#packages/meditation/meditation.js';
import { reducer as appReducer } from '#slices/app/app.js';
import { reducer as authReducer } from '#slices/auth/auth.js';
import { reducer as chatsReducer } from '#slices/chats/chats.js';
import { reducer as journalReducer } from '#slices/journal/journal.js';
import { reducer as meditationReducer } from '#slices/meditation/meditation.js';

import { storage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  app: ReturnType<typeof appReducer>;
  journal: ReturnType<typeof journalReducer>;
  meditation: ReturnType<typeof meditationReducer>;
  chats: ReturnType<typeof chatsReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  journalApi: typeof journalApi;
  meditationApi: typeof meditationApi;
  filesApi: typeof filesApi;
  chatApi: typeof chatApi;
  storage: typeof storage;
  notification: typeof notification;
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
      },
      middleware: (getDefaultMiddleware) => {
        return [
          ...getDefaultMiddleware({
            thunk: {
              extraArgument: this.extraArguments,
            },
          }),
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
      filesApi,
      chatApi,
      storage,
      notification,
    };
  }
}

export { Store };
