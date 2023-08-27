import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { InputSearch, ScrollView, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useState } from '#libs/hooks/hooks';

import { ChatItem, ChatLink } from './components/components';
import data from './data.json';
import { styles } from './styles';

const Chat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <LinearGradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <InputSearch
            placeholder="Search topic"
            setSearchQuery={setSearchQuery}
          />
          <ScrollView contentContainerStyle={styles.list}>
            {data
              .filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((item) => (
                <ChatItem chatItem={item} key={item.id} />
              ))}
          </ScrollView>
          <ChatLink />
        </View>
      </View>
    </LinearGradient>
  );
};

export { Chat };
