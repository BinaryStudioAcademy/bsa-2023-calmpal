import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Header,
  InputSearch,
  LinearGradient,
  MeditationTimerModal,
  ScrollView,
  View,
} from '#libs/components/components';
import { MeditationScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppRoute,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { actions as meditationActions } from '#slices/meditation/meditation';

import { MeditationItem } from './components/components';
import { DEFAULT_SONG_DURATION, MOCKED_DATA } from './libs/constants/constants';
import { styles } from './styles';

type RouteParameters = {
  title: string;
};

const MeditationList: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useAppRoute();
  const { title } = route.params as RouteParameters;

  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    MOCKED_DATA,
    'title',
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_SONG_DURATION);

  const handleToggleClick = (): void => {
    setIsModalVisible((previous) => {
      return !previous;
    });
  };

  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();

  const handleSetPlaylist = (): void => {
    navigation.navigate(MeditationScreenName.MEDITATION, {
      duration: duration,
    });
  };

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
        {isModalVisible && (
          <MeditationTimerModal
            onClose={handleToggleClick}
            setDuration={setDuration}
            startMeditation={handleSetPlaylist}
          />
        )}
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
                onClick={handleToggleClick}
              />
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export { MeditationList };
