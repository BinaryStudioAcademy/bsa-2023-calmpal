import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import ArrowIcon from '#assets/img/icons/arrow-left.svg';
import image from '#assets/img/temp/chat-item.png';
import { Text } from '#libs/components/components';

import { styles } from './styles';

type ChatItemProperties = {
  chatItem: { id: string; title: string };
};

const ChatItem: React.FC<ChatItemProperties> = ({ chatItem }) => {
  return (
    <TouchableOpacity key={chatItem.id} style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {chatItem.title}
      </Text>
      <ArrowIcon style={styles.icon} />
    </TouchableOpacity>
  );
};

export { ChatItem };
