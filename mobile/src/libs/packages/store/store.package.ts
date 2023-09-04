import {
  type AnyAction,
  configureStore,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '#libs/enums/enums';
import { authApi } from '#packages/auth/auth';
import { reducer as authReducer } from '#slices/auth/auth';

import { type Config } from '../config/config';
import { notification } from '../notification/notification';
import { storage } from '../storage/storage';
import { handleError } from './middlewares/middlewares';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  notification: typeof notification;
  storage: typeof storage;
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
      notification,
      storage,
    };
  }
}

export { Store };
