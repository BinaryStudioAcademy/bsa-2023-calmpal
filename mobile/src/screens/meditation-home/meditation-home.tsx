import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Card,
  InputSearch,
  LinearGradient,
  ScrollView,
  View,
} from '#libs/components/components';
import { MeditationScreenName } from '#libs/enums/enums';
import { useNavigation, useSearch } from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';

import { mockedData } from './libs/constants';
import { styles } from './styles';

const MeditationHome: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
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
    <LinearGradient>
      <View style={styles.container}>
        <InputSearch
          placeholder="Search topic"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredMeditationTopics.map((item) => {
            return (
              <Card
                title={item.title}
                onPress={handleSelectMeditation}
                key={item.id}
              />
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export { MeditationHome };
