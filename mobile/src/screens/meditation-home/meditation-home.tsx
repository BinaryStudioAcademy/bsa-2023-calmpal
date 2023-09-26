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

import { styles } from './styles';

const MOCKED_DATA = [{ id: 1, name: 'Meditation' }];

const MeditationHome: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    MOCKED_DATA,
    'name',
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
                title={item.name}
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
