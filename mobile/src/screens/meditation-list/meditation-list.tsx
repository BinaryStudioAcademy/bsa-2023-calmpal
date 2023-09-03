import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Header,
  InputSearch,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import {
  useAppRoute,
  useEffect,
  useNavigation,
  useSearch,
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

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={title} isArrowVisible />,
    });
  }, [navigation, title]);

  return (
    <LinearGradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <InputSearch
          placeholder="Search topic"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView>
          {filteredMeditationTopics.map((item) => (
            <MeditationItem
              title={item.title}
              duration={item.duration}
              key={item.id}
            />
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export { MeditationList };
