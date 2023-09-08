import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Header,
  InputSearch,
  LinearGradient,
  Modal,
  ScrollView,
  View,
} from '#libs/components/components';
import {
  useAppRoute,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';

import { MeditationItem } from './components/components';
import { mockedData } from './libs/constants';
import { styles } from './styles';

type RouteParameters = {
  title: string;
};

const MeditationList: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();
  const route = useAppRoute();
  const { title } = route.params as RouteParameters;

  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    mockedData,
    'title',
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  const handleClose = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <Header title={title} isArrowVisible />;
      },
    });
  }, [navigation, title]);

  return (
    <LinearGradient>
      <View style={styles.container}>
        {isModalVisible && <Modal onClose={handleClose} />}
        <InputSearch
          placeholder="Search topic"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView>
          {filteredMeditationTopics.map((item) => {
            return (
              <MeditationItem
                title={item.title}
                duration={item.duration}
                key={item.id}
                id={item.id}
                onClick={handleClick}
              />
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export { MeditationList };
