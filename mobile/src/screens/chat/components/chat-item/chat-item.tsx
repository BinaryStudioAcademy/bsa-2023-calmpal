import React from 'react';

import ArrowIcon from '#assets/img/icons/arrow-right.svg';
import image from '#assets/img/temp/chat-item.png';
import { Image, Text, TouchableOpacity } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  chatItem: { id: string; title: string };
};

const ChatItem: React.FC<Properties> = ({ chatItem }) => {
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
