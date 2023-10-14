import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '~/libs/components/components';
import { JournalScreenName } from '~/libs/enums/enums';
import { type JournalNavigationParameterList } from '~/libs/types/types';
import { Journal as JournalScreen } from '~/screens/journal/journal';
import { Note } from '~/screens/note/note';

const NativeStack =
  createNativeStackNavigator<JournalNavigationParameterList>();

const Journal: React.FC = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name={JournalScreenName.JOURNAL}
        component={JournalScreen}
      />
      <NativeStack.Screen
        name={JournalScreenName.NOTE}
        component={Note}
        options={{
          header: (): React.ReactNode => {
            return <Header isArrowVisible />;
          },
        }}
      />
    </NativeStack.Navigator>
  );
};

export { Journal };
