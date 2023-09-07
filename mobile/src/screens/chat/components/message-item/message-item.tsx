import React from 'react';

import ChatAvatar from '#assets/img/icons/chat-avatar.svg';
import { Text, View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  isUser: boolean;
  text: string;
  isAvatarVisible: boolean;
};

const MessageItem: React.FC<Properties> = ({
  isUser,
  text,
  isAvatarVisible,
}) => {
  return (
    <View
      style={[
        styles.messageWrapper,
        isUser && styles.userWrapper,
        !isAvatarVisible && styles.sameMessageWrapper,
      ]}
    >
      {isUser ? (
        <View
          style={[
            styles.avatar,
            styles.userAvatar,
            !isAvatarVisible && styles.transparentAvatar,
          ]}
        />
      ) : (
        <ChatAvatar
          style={[styles.avatar, !isAvatarVisible && styles.transparentAvatar]}
        />
      )}

      <Text style={[styles.messageText, isUser && styles.userMessage]}>
        {text}
      </Text>
    </View>
  );
};

export { MessageItem };
