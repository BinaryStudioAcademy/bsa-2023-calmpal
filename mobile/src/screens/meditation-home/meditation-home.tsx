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
import { useCallback, useNavigation, useSearch } from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';

import { NAVIGATION_ITEMS } from './libs/constants/constants';
import { styles } from './styles';

const MeditationHome: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    NAVIGATION_ITEMS,
    'name',
  );
  const handleSelectMeditation = useCallback(
    (title: string) => {
      return () => {
        navigation.navigate(MeditationScreenName.MEDITATION_LIST, { title });
      };
    },
    [navigation],
  );

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
                onPress={handleSelectMeditation(item.name)}
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
