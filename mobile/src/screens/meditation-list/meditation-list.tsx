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
import { AppColor } from '#libs/enums/enums';
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

import { AddMeditationModal, MeditationItem } from './components/components';
import { MOCKED_DURATION } from './libs/constants/constants';
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
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
  const route = useAppRoute();
  const { title } = route.params as RouteParameters;

  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    meditationEntries,
    'name',
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

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
                title={item.name}
                duration={MOCKED_DURATION}
                key={item.id}
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
