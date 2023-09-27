import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Header,
  InputSearch,
  LinearGradient,
  ScrollView,
  View,
} from '#libs/components/components';
import { MeditationScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppRoute,
  useAppSelector,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { actions as meditationActions } from '#slices/meditation/meditation';

import { MeditationItem, TimerModal } from './components/components';
import { DEFAULT_SONG_DURATION } from './libs/constants/constants';
import { styles } from './styles';

type RouteParameters = {
  title: string;
};

const MeditationList: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useAppRoute();
  const { title } = route.params as RouteParameters;

  const { meditationEntries } = useAppSelector(({ meditation }) => {
    return {
      meditationEntries: meditation.meditationEntries,
    };
  });

  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    meditationEntries,
    'title',
  );

  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_SONG_DURATION);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();

  const handleToggleBottomModalVisibility = (): void => {
    setIsBottomModalVisible((previous) => {
      return !previous;
    });
  };

  const handleSelectMeditation = (id: string): void => {
    void dispatch(meditationActions.setSelectedMeditationEntry(id));
    handleToggleBottomModalVisibility();
  };

  const handleSetPlaylist = (): void => {
    navigation.navigate(MeditationScreenName.MEDITATION);
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
    void dispatch(meditationActions.getAllMeditationEntries());
  }, [dispatch]);

  useEffect(() => {
    void dispatch(meditationActions.setPlaylist(meditationEntries));
  }, [dispatch, meditationEntries]);

  return (
    <LinearGradient>
      <View style={styles.container}>
        {isBottomModalVisible && (
          <TimerModal
            onClose={handleToggleBottomModalVisibility}
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
                duration={duration}
                key={item.id}
                onClick={(): void => {
                  handleSelectMeditation(item.id);
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export { MeditationList };
