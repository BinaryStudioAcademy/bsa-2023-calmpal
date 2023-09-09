import React from 'react';

import PlusIcon from '#assets/img/icons/plus.svg';
import {
  Card,
  InputSearch,
  LinearGradient,
  Link,
  ScrollView,
  View,
} from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useSearch,
} from '#libs/hooks/hooks';
import { actions as journalActions } from '#slices/journal/journal';

import { styles } from './styles';

const Journal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allJournalEntries } = useAppSelector(({ journal }) => {
    return {
      allJournalEntries: journal.allJournalEntries,
      // selectedJournalEntry: journal.selectedJournalEntry,
    };
  });
  const { filteredData: filteredJournals, setSearchQuery } = useSearch(
    allJournalEntries,
    'title',
  );

  //   const handleSelectJournal = (): void => {
  //     return;
  //   };

  useEffect(() => {
    void dispatch(journalActions.getAllJournalEntriers());
  }, [dispatch]);

  return (
    <LinearGradient>
      <View style={styles.container}>
        <InputSearch
          placeholder="Search journal"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredJournals.map((item) => {
            return (
              <Card
                title={item.title}
                onPress={(): void => {
                  return;
                }}
                key={item.id}
              />
            );
          })}
        </ScrollView>
        <View style={styles.linkWrapper}>
          <Link
            label="Add new journal"
            to={''}
            style={styles.link}
            icon={<PlusIcon style={styles.icon} color={AppColor.BLUE_300} />}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
export { Journal };
