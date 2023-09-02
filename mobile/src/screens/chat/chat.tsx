import React from 'react';

import { Header, ScrollView, Text, View } from '#libs/components/components';
import { type ChatScreenName } from '#libs/enums/enums';
import {
  useAppForm,
  useCallback,
  useEffect,
  useRef,
  useState,
} from '#libs/hooks/hooks';
import {
  type ChatNavigationParameterList,
  type NavigationScreenProperties,
} from '#libs/types/types';

import { ChatInput, MessageItem } from './components/components';
import { DEFAULT_VALUES, MOCKED_DATA, PREVIOUS_USER } from './libs/constants';
import { styles } from './styles';

type Message = {
  id: number;
  isUser: boolean;
  message: string;
};

const Chat = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  const { title } =
    route.params as ChatNavigationParameterList[typeof ChatScreenName.CHAT];
  const { control, handleSubmit, reset } = useAppForm<{ text: string }>({
    defaultValues: DEFAULT_VALUES,
  });

  const [messages, setMessages] = useState<Message[]>(MOCKED_DATA);
  const scrollViewReference = useRef<ScrollView | null>(null);

  const scrollViewToEnd = (): void => {
    scrollViewReference.current?.scrollToEnd();
  };

  const handleFormSubmit = useCallback(
    (payload: { text: string }): void => {
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now(),
          isUser: true,
          message: payload.text,
        },
      ]);
      scrollViewToEnd();
      reset();
    },
    [setMessages, reset],
  );

  const handleSend = useCallback((): void => {
    void handleSubmit(handleFormSubmit)();
  }, [handleSubmit, handleFormSubmit]);

  useEffect(() => {
    scrollViewToEnd();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={title} isArrowVisible />,
    });
  }, [navigation, title]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.title}>Doctor Freud.ai</Text>
      </View>
      <ScrollView style={styles.chatWrapper} ref={scrollViewReference}>
        {messages.map((item, index) => (
          <MessageItem
            text={item.message}
            isUser={item.isUser}
            isAvatarVisible={
              item.isUser !== messages[index - PREVIOUS_USER]?.isUser
            }
            key={item.id}
          />
        ))}
      </ScrollView>
      <ChatInput
        scrollViewToEnd={scrollViewToEnd}
        onSend={handleSend}
        control={control}
        name="text"
      />
    </View>
  );
};

export { Chat };
