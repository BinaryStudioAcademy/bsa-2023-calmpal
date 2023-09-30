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
import { DEFAULT_DURATION } from './components/timer-modal/libs/constants/constants';
import { styles } from './styles';

type RouteParameters = {
  title: string;
};

const MeditationList: React.FC = () => {
  const { meditationEntries } = useAppSelector(({ meditation }) => {
    return {
      meditationEntries: meditation.meditationEntries,
    };
  });

  const dispatch = useAppDispatch();
  const route = useAppRoute();
  const { title } = route.params as RouteParameters;

  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    meditationEntries,
    'title',
  );
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);
  const [duration, setDuration] = useState(DEFAULT_DURATION);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();

  const handleSubmit = useCallback(
    (payload: MeditationEntryCreateRequestDto) => {
      void dispatch(meditationActions.createMeditationEntry(payload));
    },
    [dispatch],
  );

  const handleToggleAddModalVisibility = (): void => {
    setIsAddModalVisible((previous) => {
      return !previous;
    });
  };

  const handleToggleTimerModalVisibility = (): void => {
    setIsTimerModalVisible((previous) => {
      return !previous;
    });
  };

  const handleSelectMeditation = (id: string): void => {
    void dispatch(meditationActions.setSelectedMeditationEntry(id));
    handleToggleTimerModalVisibility();
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
            onClose={handleToggleTimerModalVisibility}
            onSetDuration={setDuration}
            onStartMeditation={handleSetPlaylist}
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
                key={item.id}
                onClick={(): void => {
                  handleSelectMeditation(item.id);
                }}
              />
            );
          })}
        </ScrollView>
        <Button
          onPress={handleToggleAddModalVisibility}
          iconName="plus"
          label="Add new meditation"
          type="transparent"
          color={AppColor.BLUE_200}
        />
        <AddMeditationModal
          isVisible={isAddModalVisible}
          onClose={handleToggleAddModalVisibility}
          onSubmit={handleSubmit}
        />
      </View>
    </LinearGradient>
  );
};

export { MeditationList };
