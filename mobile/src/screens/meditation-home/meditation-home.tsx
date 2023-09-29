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
import {
  useAppDispatch,
  useCallback,
  useEffect,
  useNavigation,
  useSearch,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { actions as meditationActions } from '#slices/meditation/meditation';

import { navigationItems } from './libs/constants/constants';
import { styles } from './styles';

const MeditationHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    navigationItems,
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

  useEffect(() => {
    void dispatch(meditationActions.getAllMeditationEntries());
  }, [dispatch]);

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
