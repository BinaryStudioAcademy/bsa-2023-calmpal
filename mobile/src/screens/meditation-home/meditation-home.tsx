import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Button,
  Card,
  InputSearch,
  LinearGradient,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor, MeditationScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useCallback,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';
import { type MeditationEntryCreateRequestDto } from '#packages/meditation/meditation';
import { actions as meditationActions } from '#slices/meditation/meditation';

import { AddMeditationModal } from './components/components';
import { mockedData } from './libs/constants';
import { styles } from './styles';

const MeditationHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    setIsModalVisible(false);
  };
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    mockedData,
    'title',
  );

  const handleSelectMeditation = useCallback(
    (title: string): void => {
      navigation.navigate(MeditationScreenName.MEDITATION_LIST, {
        title,
      });
    },
    [navigation],
  );

  const handleSubmit = useCallback(
    (payload: MeditationEntryCreateRequestDto) => {
      void dispatch(meditationActions.createMeditationEntry(payload));
    },
    [dispatch],
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
                title={item.title}
                onPress={handleSelectMeditation}
                key={item.id}
              />
            );
          })}
        </ScrollView>
        <Button
          onPress={showModal}
          iconName="plus"
          label="Add new meditation"
          type="transparent"
          color={AppColor.BLUE_200}
        />
        <AddMeditationModal
          isVisible={isModalVisible}
          closeModal={closeModal}
          onSubmit={handleSubmit}
        />
      </View>
    </LinearGradient>
  );
};

export { MeditationHome };
