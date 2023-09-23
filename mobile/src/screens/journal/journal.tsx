import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Button,
  Card,
  Header,
  InputSearch,
  LinearGradient,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor, JournalScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigation,
  useSearch,
} from '#libs/hooks/hooks';
import { type JournalNavigationParameterList } from '#libs/types/types';
import { actions as journalActions } from '#slices/journal/journal';

import {
  DEFAULT_NOTE_PAYLOAD,
  INCREMENT_DECREMENT_STEP,
} from './libs/constants/constants';
import { styles } from './styles';

const Journal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<JournalNavigationParameterList>>();

  const { allJournalEntries } = useAppSelector(({ journal }) => {
    return {
      allJournalEntries: journal.allJournalEntries,
    };
  });
  const badgeCount = allJournalEntries.length;

  const { filteredData: filteredJournals, setSearchQuery } = useSearch(
    allJournalEntries,
    'title',
  );

  const handleSelectJournalEntry = (id: number): void => {
    dispatch(journalActions.setSelectedJournalEntry(id));
    navigation.navigate(JournalScreenName.NOTE, { id });
  };

  const handleAddNote = (): void => {
    void dispatch(
      journalActions.createJournalEntry({
        title: DEFAULT_NOTE_PAYLOAD.title,
        text: DEFAULT_NOTE_PAYLOAD.text,
      }),
    );

    const lastJournalEntry =
      allJournalEntries[allJournalEntries.length - INCREMENT_DECREMENT_STEP];
    if (lastJournalEntry?.id) {
      handleSelectJournalEntry(lastJournalEntry.id + INCREMENT_DECREMENT_STEP);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return <Header badgeCount={badgeCount} isProfileVisible />;
      },
    });
  }, [navigation, badgeCount]);

  useEffect(() => {
    void dispatch(journalActions.getAllJournalEntries());
  }, [dispatch]);

  return (
    <LinearGradient>
      <View style={styles.container}>
        <InputSearch
          placeholder="Search note"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredJournals.map((item) => {
            return (
              <Card
                title={item.title}
                handlePassId={handleSelectJournalEntry}
                noteId={item.id}
                key={item.id}
              />
            );
          })}
        </ScrollView>
        <View style={styles.linkWrapper}>
          <Button
            onPress={handleAddNote}
            iconName="plus"
            label="Add new note"
            type="transparent"
            color={AppColor.BLUE_200}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
export { Journal };
