import { type FC } from 'react';
import React from 'react';

import SendButton from '#assets/img/icons/send-button.svg';
import { Pressable, TextInput, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useState } from '#libs/hooks/hooks';

import { styles } from './styles';

type Message = {
  id: number;
  isUser: boolean;
  message: string;
};

type Properties = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  scrollViewToEnd: () => void;
};

const ChatInput: FC<Properties> = ({ setMessages, scrollViewToEnd }) => {
  const [text, setText] = useState('');

  const handlePress = (): void => {
    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        isUser: true,
        message: text,
      },
    ]);
    setText('');
    scrollViewToEnd();
  };

  return (
    <View style={styles.chatInputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        placeholderTextColor={AppColor.GRAY_300}
        value={text}
        onFocus={scrollViewToEnd}
        onChangeText={(text): void => {
          setText(text);
        }}
      />
      {text && (
        <Pressable onPress={handlePress}>
          <SendButton style={styles.button} />
        </Pressable>
      )}
    </View>
  );
};

export { ChatInput };
