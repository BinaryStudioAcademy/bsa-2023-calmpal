import React from 'react';

import PlusIcon from '#assets/img/icons/plus.svg';
import {
  Card,
  Header,
  InputSearch,
  LinearGradient,
  Link,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor, RootScreenName } from '#libs/enums/enums';
import { useCallback, useEffect, useSearch } from '#libs/hooks/hooks';
import { type NavigationScreenProperties } from '#libs/types/types';

import mockedChats from './libs/data.json';
import { styles } from './styles';

const mockedCount = 12;

const ChatList = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          navigation={navigation}
          title={route.name}
          badgeCount={mockedCount}
          isSettingsVisible
        />
      ),
    });
  }, [navigation, route.name]);

  const handleSelectChat = useCallback(() => {
    // TODO: Implement actual functionality for the onPress event
  }, []);

  const { filteredData: filteredChats, setSearchQuery } = useSearch(
    mockedChats,
    'title',
  );

  return (
    <LinearGradient>
      <View style={styles.container}>
        <InputSearch
          placeholder="Search chat"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredChats.map((item) => (
            <Card title={item.title} onPress={handleSelectChat} key={item.id} />
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
