import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import ChatAvatar from '#assets/img/icons/chat-avatar.svg';
import { Header, ScrollView, Text, View } from '#libs/components/components';
import {
  useAppDispatch,
  useAppForm,
  useAppRoute,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigation,
  useRef,
} from '#libs/hooks/hooks';
import { type ChatNavigationParameterList } from '#libs/types/types';
import { type UserAuthResponseDto } from '#packages/users/users';
import { actions as chatsActions } from '#slices/chats/chats';

import { ChatInput, MessageItem } from './components/components';
import { DEFAULT_VALUES, EMPTY_ARRAY_LENGTH } from './libs/constants';
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
  const messagesLength = currentChatMessages.length;
  const scrollViewToEnd = (): void => {
    scrollViewReference.current?.scrollToEnd();
  };

  const handleFormSubmit = useCallback(
    ({ message }: ChatInputValue): void => {
      if (!hasId || messagesLength === EMPTY_ARRAY_LENGTH) {
        void dispatch(chatsActions.createChat({ message }));
      } else {
        void dispatch(chatsActions.createMessage({ message, chatId: id }));
      }

      scrollViewToEnd();
      reset();
    },
    [reset, dispatch, messagesLength, id, hasId],
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
        return <Header title={title} isArrowVisible />;
      },
    });
  }, [navigation, title]);

  useEffect(() => {
    if (hasId) {
      void dispatch(chatsActions.getCurrentChatMessages(id));
    }
  }, [dispatch, id, hasId]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <ChatAvatar />
        <Text style={styles.title}>Doctor Freud.ai</Text>
      </View>
      <ScrollView style={styles.chatWrapper} ref={scrollViewReference}>
        {currentChatMessages.map((item) => {
          // const isDifferentUser =
          // item.isUser !== messages[index - PREVIOUS_USER]?.isUser;

          return (
            <MessageItem
              text={item.message}
              isUser={item.senderId === authenticatedUser.id}
              isAvatarVisible={true}
              key={item.id}
            />
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
