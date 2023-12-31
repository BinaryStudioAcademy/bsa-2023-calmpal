import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import ChatAvatar from '~/assets/img/icons/chat-avatar.svg';
import { Header, ScrollView, Text, View } from '~/libs/components/components';
import { EMPTY_ARRAY_LENGTH } from '~/libs/constants/constants';
import { TimeFormat } from '~/libs/enums/enums';
import { getFormattedDate } from '~/libs/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppRoute,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigation,
  useRef,
} from '~/libs/hooks/hooks';
import { type ChatNavigationParameterList } from '~/libs/types/types';
import { type UserAuthResponseDto } from '~/packages/users/users';
import { actions as chatsActions } from '~/slices/chats/chats';

import { ChatDivider, ChatInput, MessageItem } from './components/components';
import { DEFAULT_VALUES, PREVIOUS_USER } from './libs/constants/constants';
import { type ChatInputValue } from './libs/types/chat-input-value.type';
import { styles } from './styles';

type RouteParameters = {
  title: string;
  id: string;
};

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatNavigationParameterList>>();
  const { title, id } = useAppRoute().params as RouteParameters;
  const hasId = Boolean(id);

  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_VALUES,
  });

  const { currentChatMessages, authenticatedUser } = useAppSelector(
    ({ chats, auth }) => {
      return {
        currentChatMessages: chats.currentChatMessages,
        authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
      };
    },
  );

  const scrollViewReference = useRef<ScrollView | null>(null);
  const messagesLength = Object.values(currentChatMessages).flat().length;

  const scrollViewToEnd = (): void => {
    scrollViewReference.current?.scrollToEnd();
  };

  const handleFormSubmit = useCallback(
    ({ message }: ChatInputValue): void => {
      if (!hasId || messagesLength === EMPTY_ARRAY_LENGTH) {
        void dispatch(
          chatsActions.createChat({ payload: { message }, navigation }),
        );
      } else {
        void dispatch(chatsActions.createMessage({ message, chatId: id }));
      }

      reset();
    },
    [reset, dispatch, messagesLength, id, hasId, navigation],
  );

  const handleSend = useCallback((): void => {
    void handleSubmit(handleFormSubmit)();
  }, [handleSubmit, handleFormSubmit]);

  useEffect(() => {
    scrollViewToEnd();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <Header title={title} isArrowVisible fontSize="small" />;
      },
    });
  }, [navigation, title]);

  useEffect(() => {
    scrollViewToEnd();
  }, [messagesLength]);

  useEffect(() => {
    void dispatch(chatsActions.getCurrentChatMessages(id));
  }, [dispatch, id, hasId]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <ChatAvatar />
        <Text style={styles.title}>Doctor Freud.ai</Text>
      </View>
      <ScrollView style={styles.chatWrapper} ref={scrollViewReference}>
        {Object.entries(currentChatMessages).map(([date, group]) => {
          return (
            <React.Fragment key={date}>
              <ChatDivider date={new Date(date)} />
              {group.map((item, index) => {
                const previousMessage = group[index - PREVIOUS_USER];
                const currentTime = getFormattedDate(
                  new Date(item.createdAt),
                  TimeFormat.HH_MM,
                );
                const isDifferentMessageOwner =
                  item.senderId !== previousMessage?.senderId;

                return (
                  <MessageItem
                    text={item.message}
                    time={currentTime}
                    isUser={item.senderId === authenticatedUser.id}
                    isAvatarVisible={isDifferentMessageOwner}
                    key={item.id}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </ScrollView>
      <ChatInput
        scrollViewToEnd={scrollViewToEnd}
        onSend={handleSend}
        control={control}
        name="message"
      />
    </View>
  );
};

export { Chat };
