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
import { journalApi } from '#packages/journal/journal.js';
import { reducer as appReducer } from '#slices/app/app.js';
import { reducer as authReducer } from '#slices/auth/auth.js';
import { reducer as journalReducer } from '#slices/journal/journal.js';

import { storage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  app: ReturnType<typeof appReducer>;
  journal: ReturnType<typeof journalReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  journalApi: typeof journalApi;
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
      storage,
      notification,
    };
  }
}

export { Store };
