import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Button,
  Header,
  InputSearch,
  LinearGradient,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor, MeditationScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppRoute,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { type MeditationEntryCreateRequestDto } from '#packages/meditation/meditation';
import { actions as meditationActions } from '#slices/meditation/meditation';

import {
  AddMeditationModal,
  MeditationItem,
  TimerModal,
} from './components/components';
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_SONG_DURATION);

  const handleShowModal = (): void => {
    setIsModalVisible(true);
  };

  const handleCloseModal = (): void => {
    setIsModalVisible(false);
  };
  const handleSubmit = useCallback(
    (payload: MeditationEntryCreateRequestDto) => {
      void dispatch(meditationActions.createMeditationEntry(payload));
    },
    [dispatch],
  );

  const handleToggleClick = (): void => {
    setIsTimerModalVisible((previous) => {
      return !previous;
    });
  };

  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();

  const handleSelectMeditation = (id: string): void => {
    void dispatch(meditationActions.setSelectedMeditationEntry(id));
    handleToggleClick();
  };

  const handleSetPlaylist = (): void => {
    navigation.navigate(MeditationScreenName.MEDITATION, { duration });
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
        {isTimerModalVisible && (
          <TimerModal
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
                duration={duration}
                key={item.id}
                onClick={(): void => {
                  handleSelectMeditation(item.id);
                }}
              />
            );
          })}
        </ScrollView>
        <Button
          onPress={handleShowModal}
          iconName="plus"
          label="Add new meditation"
          type="transparent"
          color={AppColor.BLUE_200}
        />
        <AddMeditationModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      </View>
    </LinearGradient>
  );
};

export { MeditationList };
