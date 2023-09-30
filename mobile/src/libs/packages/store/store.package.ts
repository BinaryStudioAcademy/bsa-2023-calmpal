import {
  type AnyAction,
  configureStore,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '#libs/enums/enums';
import { authApi } from '#packages/auth/auth';
import { chatMessagesApi } from '#packages/chat-messages/chat-messages';
import { chatApi } from '#packages/chats/chats';
import { journalApi } from '#packages/journal/journal';
import { meditationApi } from '#packages/meditation/meditation';
import { reducer as authReducer } from '#slices/auth/auth';
import { reducer as chatsReducer } from '#slices/chats/chats';
import { reducer as journalReducer } from '#slices/journal/journal';
import { reducer as meditationReducer } from '#slices/meditation/meditation';

import { type Config } from '../config/config';
import { notification } from '../notification/notification';
import { player } from '../player/player';
import { storage } from '../storage/storage';
import { handleError } from './middlewares/middlewares';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  journal: ReturnType<typeof journalReducer>;
  chats: ReturnType<typeof chatsReducer>;
  meditation: ReturnType<typeof meditationReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  journalApi: typeof journalApi;
  chatApi: typeof chatApi;
  meditationApi: typeof meditationApi;
  notification: typeof notification;
  chatMessagesApi: typeof chatMessagesApi;
  player: typeof player;
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
        journal: journalReducer,
        chats: chatsReducer,
        meditation: meditationReducer,
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
      chatApi,
      meditationApi,
      notification,
      chatMessagesApi,
      player,
      storage,
    };
  }
}

export { Store };
