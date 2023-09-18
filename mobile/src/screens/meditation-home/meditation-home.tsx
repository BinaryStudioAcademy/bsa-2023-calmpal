import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Card,
  InputSearch,
  LinearGradient,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { MeditationScreenName } from '#libs/enums/enums';
import {
  useCallback,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';

import { AddMeditationModal } from './components/add-meditation-modal/add-meditation-modal';
import { mockedData } from './libs/constants';
import { styles } from './styles';

const MeditationHome: React.FC = () => {
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

  const handleAddMeditation = useCallback(() => {
    showModal();
  }, []);

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
        <TouchableOpacity onPress={handleAddMeditation}>
          <Text>add med</Text>
        </TouchableOpacity>
        <AddMeditationModal
          isVisible={isModalVisible}
          closeModal={closeModal}
        />
      </View>
    </LinearGradient>
  );
};

export { MeditationHome };
