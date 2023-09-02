import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Card,
  InputSearch,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor, MeditationScreenName } from '#libs/enums/enums';
import { useSearch } from '#libs/hooks/hooks';
import { type NavigationScreenProperties } from '#libs/types/types';

import { mockedData } from './libs/constants';
import { styles } from './styles';

const MeditationTopics = ({
  navigation,
}: NavigationScreenProperties): JSX.Element => {
  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    mockedData,
    'title',
  );
  const handleSelectMeditation = (title: string): void => {
    navigation.navigate(MeditationScreenName.MEDITATION_LIST, {
      title,
    });
  };

  return (
    <LinearGradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <InputSearch
          placeholder="Search topic"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredMeditationTopics.map((item) => (
            <Card
              title={item.title}
              onPress={handleSelectMeditation}
              key={item.id}
            />
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export { MeditationTopics };
