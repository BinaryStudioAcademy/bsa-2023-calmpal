import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import ChatAvatar from '#assets/img/icons/chat-avatar.svg';
import { Header, ScrollView, Text, View } from '#libs/components/components';
import {
  useAppDispatch,
  useAppForm,
  useAppRoute,
  useCallback,
  useEffect,
  useNavigation,
  useRef,
  useState,
} from '#libs/hooks/hooks';
import { type ChatNavigationParameterList } from '#libs/types/types';
import { actions as chatsActions } from '#slices/chats/chats';

import { ChatInput, MessageItem } from './components/components';
import {
  DEFAULT_VALUES,
  EMPTY_ARRAY_LENGTH,
  PREVIOUS_USER,
} from './libs/constants';
import { type ChatInputValue } from './libs/types/chat-input-value.type';
import { styles } from './styles';

type Message = {
  id: number;
  isUser: boolean;
  message: string;
};

type RouteParameters = {
  title: string;
};

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatNavigationParameterList>>();
  const { title } = useAppRoute().params as RouteParameters;
  const { control, handleSubmit, reset } = useAppForm({
    defaultValues: DEFAULT_VALUES,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewReference = useRef<ScrollView | null>(null);
  const messagesLength = messages.length;
  const scrollViewToEnd = (): void => {
    scrollViewReference.current?.scrollToEnd();
  };

  const handleFormSubmit = useCallback(
    (payload: ChatInputValue): void => {
      if (messagesLength === EMPTY_ARRAY_LENGTH) {
        void dispatch(chatsActions.createChat({ message: payload.message }));
      }

      setMessages((previous) => {
        return [
          ...previous,
          {
            id: Date.now(),
            isUser: true,
            message: payload.message,
          },
        ];
      });
      scrollViewToEnd();
      reset();
    },
    [setMessages, reset, dispatch, messagesLength],
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

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <ChatAvatar />
        <Text style={styles.title}>Doctor Freud.ai</Text>
      </View>
      <ScrollView style={styles.chatWrapper} ref={scrollViewReference}>
        {messages.map((item, index) => {
          const isDifferentUser =
            item.isUser !== messages[index - PREVIOUS_USER]?.isUser;

          return (
            <MessageItem
              text={item.message}
              isUser={item.isUser}
              isAvatarVisible={isDifferentUser}
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
