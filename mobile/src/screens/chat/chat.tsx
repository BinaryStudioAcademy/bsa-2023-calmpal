import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  InputSearch,
  ScrollView,
  Text,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useEffect, useNavigation, useState } from '#libs/hooks/hooks';

import { Badge, ChatItem, ChatLink } from './components/components';
import data from './data.json';
import { styles } from './styles';

const Chat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: ({ children }: { children: React.ReactNode }) => (
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{children}</Text>
          <Badge />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <LinearGradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <InputSearch
          placeholder="Search chat"
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
    </LinearGradient>
  );
};

export { Chat };
