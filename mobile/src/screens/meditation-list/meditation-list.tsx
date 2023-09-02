import React from 'react';

import { Header, ScrollView, View } from '#libs/components/components';
import { type MeditationScreenName } from '#libs/enums/enums';
import { useEffect, useSearch } from '#libs/hooks/hooks';
import {
  type MeditationNavigationParameterList,
  type NavigationScreenProperties,
} from '#libs/types/types';

import { MeditationListItem } from './components/components';
import { mockedData } from './libs/constants';
import { styles } from './styles';

// type Topic = {
//   id: number;
//   title: string;
//   duration: number;
//   uri: string;
// };

const MeditationList = ({
  navigation,
  route,
}: NavigationScreenProperties): JSX.Element => {
  const { title } =
    route.params as MeditationNavigationParameterList[typeof MeditationScreenName.MEDITATION_LIST];

  const { filteredData: filteredMeditationTopics } = useSearch(
    mockedData,
    'title',
  );

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header title={title} isArrowVisible />,
    });
  }, [navigation, route.name, title]);

  return (
    <View style={styles.container}>
      {/* <InputSearch placeholder="Search topic" /> */}
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
  );
};

export { MeditationList };
