// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { Card } from '#libs/components/card/card';
import {
  InputSearch,
  ScrollView,
  // Text,
  View,
} from '#libs/components/components';
import { MeditationScreenName } from '#libs/enums/enums';
// import { useEffect } from '#libs/hooks/hooks';
import { type NavigationScreenProperties } from '#libs/types/types';

// import { useSearch } from '#libs/hooks/hooks';
import { mockedData } from './libs/constants';
import { styles } from './styles';

const MeditationTopics = ({
  navigation,
}: NavigationScreenProperties): JSX.Element => {
  // const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
  //   mockedData,
  //   'title',
  // );

  return (
    <View style={styles.container}>
      <InputSearch placeholder="Search topic" />
      <ScrollView contentContainerStyle={styles.list}>
        {mockedData.map((item) => (
          <Card
            title={item.title}
            onPress={(): void => {
              navigation.navigate(MeditationScreenName.MEDITATION_LIST);
            }}
            key={item.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export { MeditationTopics };
