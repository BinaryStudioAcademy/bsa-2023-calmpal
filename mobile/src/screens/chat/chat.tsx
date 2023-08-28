import React, { type ReactNode } from 'react';
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
import mockedChats from './libs/constants/data.json';
import { styles } from './styles';

const onPress = (): void => {
  // This function is intentionally left empty for mocking purposes.
};

const Chat: React.FC = () => {
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

  const { filteredData: filteredChats, setSearchQuery } =
    useSearch(mockedChats);

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

export { Chat };
