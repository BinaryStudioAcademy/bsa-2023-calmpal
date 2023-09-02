import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  Header,
  InputSearch,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor, type MeditationScreenName } from '#libs/enums/enums';
import { useEffect, useSearch } from '#libs/hooks/hooks';
import {
  type MeditationNavigationParameterList,
  type NavigationScreenProperties,
} from '#libs/types/types';

import { MeditationListItem } from './components/components';
import { mockedData } from './libs/constants';
import { styles } from './styles';

const MeditationList = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  const { title } =
    route.params as MeditationNavigationParameterList[typeof MeditationScreenName.MEDITATION_LIST];

  const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
    mockedData,
    'title',
  );

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={title} isArrowVisible />,
    });
  }, [navigation, route.name, title]);

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
            <MeditationListItem
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
