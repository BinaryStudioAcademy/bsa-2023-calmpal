import React from 'react';

import { ScrollView, Text, View } from '#libs/components/components';
import {
  useAppForm,
  useCallback,
  useEffect,
  useRef,
  useState,
} from '#libs/hooks/hooks';

import { ChatInput, MessageItem } from './components/components';
import { PREVIOUS_USER } from './libs/constants';
import { styles } from './styles';

type Message = {
  id: number;
  isUser: boolean;
  message: string;
};

const ChatLayout: React.FC = () => {
  const mockedData = [
    {
      id: 1,
      isUser: true,
      message:
        'Hi, Doctor. I’ve been feeling really down lately, and I’m not sure why. Can you help me? 😢😭',
    },
    {
      id: 2,
      isUser: false,
      message:
        'Of course! I’m here to support you. 🙂 Can you tell me more about how you’ve been feeling? Any specific symptoms or changes in your daily life?',
    },
    {
      id: 3,
      isUser: true,
      message: 'Ok, here’s the symptoms for me',
    },
    {
      id: 4,
      isUser: true,
      message: 'I’ll be there in 2 mins ⏰',
    },
    {
      id: 5,
      isUser: false,
      message:
        'I’ve been experiencing persistent sadness, loss of interest in things I used to enjoy. It’s been affecting my work and relationships too!! 💊❌😵',
    },
    {
      id: 6,
      isUser: false,
      message: 'I’ll be there in 2 mins ⏰',
    },
    {
      id: 7,
      isUser: false,
      message:
        'I’ve been5435345 experiencing persistent sadness, loss of interest in things I used to enjoy. It’s been affecting my work and relationships too!! 💊❌😵',
    },
    {
      id: 8,
      isUser: true,
      message:
        'I’ve been234234 experiencing persistent sadness, loss of interest in things I used to enjoy. It’s been affecting my work and relationships too!! 💊❌😵',
    },
  ];

  const { control, handleSubmit, reset } = useAppForm<{ text: string }>({
    defaultValues: { text: '' },
  });

  const [messages, setMessages] = useState<Message[]>(mockedData);
  const scrollViewReference = useRef<ScrollView | null>(null);

  const scrollViewToEnd = (): void => {
    scrollViewReference.current?.scrollToEnd();
  };

  const onSubmit = useCallback(
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

  const handlePress = useCallback((): void => {
    void handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  useEffect(() => {
    scrollViewToEnd();
  }, []);

  return (
    <View style={styles.chatLayoutWrapper}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.title}>Doctor Freud.ai</Text>
      </View>
      <View style={styles.divider} />
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
        onPress={handlePress}
        control={control}
        name="text"
      />
    </View>
  );
};

export { ChatLayout };
