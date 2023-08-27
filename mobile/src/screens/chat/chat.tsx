import React, { type ReactNode } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Card,
  InputSearch,
  ScrollView,
  Text,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useEffect, useNavigation, useState } from '#libs/hooks/hooks';

import { Badge, ChatLink } from './components/components';
import mockedChats from './libs/constants/data.json';
import { styles } from './styles';

type MockChatItem = {
  id: string;
  title: string;
};

const onPress = (): void => {
  // This function is intentionally left empty for mocking purposes.
};

const Chat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState<MockChatItem[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: ({ children }: { children: ReactNode }) => (
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{children}</Text>
          <Badge />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const filteredItems = mockedChats.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredChats(filteredItems);
  }, [searchQuery]);

  const chatList = filteredChats.map((item) => (
    <Card title={item.title} onPress={onPress} key={item.id} />
  ));

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
        <ScrollView contentContainerStyle={styles.list}>{chatList}</ScrollView>
        <ChatLink />
      </View>
    </LinearGradient>
  );
};

export { Chat };
