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
import { reducer as appReducer } from '#slices/app/app.js';
import { reducer as authReducer } from '#slices/auth/auth.js';
import { chatReducer } from '#slices/chat/chat.js';

import { storage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  chat: ReturnType<typeof chatReducer>;
  app: ReturnType<typeof appReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
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
        chat: chatReducer,
        app: appReducer,
      },
      middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments,
          },
        }),
        handleError,
      ],
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      storage,
      notification,
    };
  }
}

export { Store };
