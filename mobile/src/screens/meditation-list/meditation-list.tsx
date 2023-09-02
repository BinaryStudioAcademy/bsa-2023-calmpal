import React from 'react';

import { ScrollView, View } from '#libs/components/components';
import { useSearch } from '#libs/hooks/hooks';

import { MeditationListItem } from './components/components';
import { mockedData } from './libs/constants';
import { styles } from './styles';

// type Topic = {
//   id: number;
//   title: string;
//   duration: number;
//   uri: string;
// };

const MeditationList: React.FC = () => {
  const { filteredData: filteredMeditationTopics } = useSearch(
    mockedData,
    'title',
  );

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
