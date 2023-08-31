import React from 'react';

import { InputSearch, ScrollView, View } from '#libs/components/components';
import { useSearch } from '#libs/hooks/hooks';

import { MeditationListItem } from './components/components';
import { styles } from './styles';

// type Topic = {
//   id: number;
//   title: string;
//   duration: number;
//   uri: string;
// };

const MeditationList: React.FC = () => {
  const mockedData = [
    { id: 0, title: '1Meditation for deep sleep', duration: 10 },
    { id: 1, title: 'Breathing meditation', duration: 100 },
    { id: 2, title: '2Meditation for deep sleep', duration: 99 },
    { id: 3, title: '3Meditation for deep sleep', duration: 10 },
    { id: 4, title: '4Breathing meditation', duration: 100 },
    { id: 5, title: '5Meditation for deep sleep', duration: 99 },
  ];
  const { filteredData: filteredMeditationTopics } = useSearch(
    mockedData,
    'title',
  );

  return (
    <View style={styles.container}>
      <InputSearch placeholder="Search topic" />
      <ScrollView style={styles.contentContainer}>
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
