import React, { type ReactNode, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import PlusIcon from '#assets/img/icons/plus.svg';
import {
  Card,
  InputSearch,
  Link,
  ScrollView,
  Text,
  View,
} from '#libs/components/components';
import { AppColor, RootScreenName } from '#libs/enums/enums';
import { useEffect, useNavigation, useSearch } from '#libs/hooks/hooks';

import { Badge } from './components/components';
import mockedChats from './libs/data.json';
import { styles } from './styles';

const mockedCount = 12;

const ChatList: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: ({ children }: { children: ReactNode }) => (
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>{children}</Text>
          <Badge count={mockedCount} />
        </View>
      ),
    });
  }, [navigation]);

  const onPress = useCallback(() => {
    // TODO: Implement actual functionality for the onPress event
  }, []);

  const { filteredData: filteredChats, setSearchQuery } = useSearch(
    mockedChats,
    'title',
  );

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
          {filteredChats.map((item) => (
            <Card title={item.title} onPress={onPress} key={item.id} />
          ))}
        </ScrollView>
        <View style={styles.linkWrapper}>
          <Link
            label="Add new chat"
            to={`/${RootScreenName.SIGN_IN}`}
            style={styles.link}
            icon={<PlusIcon style={styles.icon} color={AppColor.BLUE_300} />}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export { ChatList };
