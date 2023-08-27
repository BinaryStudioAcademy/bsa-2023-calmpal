import React from 'react';

import image from '#assets/img/card-image-placeholder.png';
import { Image, Text, TouchableOpacity } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  chatItem: { id: string; title: string };
};

const Card: React.FC<Properties> = ({ chatItem }) => {
  return (
    <TouchableOpacity key={chatItem.id} style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {chatItem.title}
      </Text>
    </TouchableOpacity>
  );
};

export { Card };
