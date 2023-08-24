import React, { type FC } from 'react';

import { ScrollView, Text, View } from '#libs/components/components';

import { MessageItem } from './components/message-item/message-item';
import { PREVIOUS_USER } from './libs/constants';
import { styles } from './styles';

const ChatLayout: FC = () => {
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
  ];
  return (
    <View style={styles.chatLayoutWrapper}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.title}>Doctor Freud.ai</Text>
      </View>
      <View style={styles.divider} />
      <ScrollView style={styles.chatWrapper}>
        {mockedData.map((item, index) => (
          <MessageItem
            text={item.message}
            isUser={item.isUser}
            showAvatar={
              item.isUser !== mockedData[index - PREVIOUS_USER]?.isUser
            }
            key={item.id}
          />
        ))}
      </ScrollView>
      <View />
    </View>
  );
};

export { ChatLayout };
