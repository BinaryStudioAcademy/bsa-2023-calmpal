import React from 'react';

import { Text, View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  isUser: boolean;
  text: string;
  showAvatar: boolean;
};

const MessageItem: React.FC<Properties> = ({ isUser, text, showAvatar }) => {
  return (
    <View
      style={[
        styles.messageWrapper,
        isUser && styles.userWrapper,
        !showAvatar && styles.sameMessageWrapper,
      ]}
    >
      <View
        style={[
          styles.avatar,
          isUser && styles.userAvatar,
          !showAvatar && styles.transparentAvatar,
        ]}
      />
      <Text style={[styles.messageText, isUser && styles.userMessage]}>
        {text}
      </Text>
    </View>
  );
};

export { MessageItem };
