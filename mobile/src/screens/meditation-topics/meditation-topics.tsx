import React from 'react';

import { Card } from '#libs/components/card/card';
import { InputSearch, ScrollView, View } from '#libs/components/components';

// import { useSearch } from '#libs/hooks/hooks';
import { mockedData } from './libs/constants';
import { styles } from './styles';

const MeditationTopics: React.FC = () => {
  // const { filteredData: filteredMeditationTopics, setSearchQuery } = useSearch(
  //   mockedData,
  //   'title',
  // );

  return (
    <View style={styles.container}>
      <InputSearch placeholder="Search topic" />
      <ScrollView contentContainerStyle={styles.list}>
        {mockedData.map((item) => (
          <Card
            title={item.title}
            onPress={(): void => {
              return;
            }}
            key={item.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export { MeditationTopics };
