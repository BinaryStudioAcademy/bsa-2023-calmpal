import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Header,
  InputSearch,
  LinearGradient,
  ScrollView,
  View,
} from '#libs/components/components';
import {
  useAppDispatch,
  useAppRoute,
  useEffect,
  useNavigation,
  useSearch,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { actions as meditationActions } from '#slices/meditation/meditation';

import { MeditationItem } from './components/components';
import { MOCKED_DATA } from './libs/constants/constants';
import { styles } from './styles';

type RouteParameters = {
  title: string;
};

const MeditationList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
  const route = useAppRoute();
  const { title } = route.params as RouteParameters;

  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    MOCKED_DATA,
    'title',
  );

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <Header title={title} isArrowVisible />;
      },
    });
  }, [navigation, title]);

  useEffect(() => {
    void dispatch(meditationActions.initPlayer());
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
              <MeditationItem
                title={item.title}
                duration={item.duration}
                key={item.id}
              />
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export { MeditationList };
