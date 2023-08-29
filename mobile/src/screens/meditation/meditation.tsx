import React from 'react';

import { ScrollView } from '#libs/components/components';

// import { useSearch, useState } from '#libs/hooks/hooks';
import { MeditationItem } from './components/components';

// type Topic = {
//   id: number;
//   title: string;
//   duration: number;
//   uri: string;
// };

const Meditation: React.FC = () => {
  const mockedData = [
    { id: 0, title: '1Meditation for deep sleep', duration: 10, uri: '' },
    { id: 1, title: 'Breathing meditation', duration: 100, uri: '' },
    { id: 2, title: '2Meditation for deep sleep', duration: 99, uri: '' },
    { id: 3, title: '3Meditation for deep sleep', duration: 10, uri: '' },
    { id: 4, title: '4Breathing meditation', duration: 100, uri: '' },
    { id: 5, title: '5Meditation for deep sleep', duration: 99, uri: '' },
  ];

  return (
    <>
      <ScrollView>
        {mockedData.map((item) => (
          <MeditationItem
            title={item.title}
            duration={item.duration}
            // uri={item.uri}
            key={item.id}
          />
        ))}
      </ScrollView>
    </>
  );
};

export { Meditation };
