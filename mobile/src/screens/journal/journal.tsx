import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import {
  Button,
  Card,
  Header,
  InputSearch,
  LinearGradient,
  Modal,
  ScrollView,
  View,
} from '#libs/components/components';
import { DEFAULT_NOTE_PAYLOAD } from '#libs/constants/constants';
import { AppColor, JournalScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type JournalNavigationParameterList } from '#libs/types/types';
import { actions as journalActions } from '#slices/journal/journal';

import { INCREMENT_DECREMENT_STEP } from './libs/constants/constants';
import { styles } from './styles';

const Journal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<JournalNavigationParameterList>>();

  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);

  const { allJournalEntries, selectedJournalEntry } = useAppSelector(
    ({ journal }) => {
      return {
        allJournalEntries: journal.allJournalEntries,
        selectedJournalEntry: journal.selectedJournalEntry,
      };
    },
  );

  const badgeCount = allJournalEntries.length;

  const { filteredData: filteredJournals, setSearchQuery } = useSearch(
    allJournalEntries,
    'title',
  );

  const handleSelectJournalEntry = (id: number): void => {
    dispatch(journalActions.setSelectedJournalEntry(id));
    navigation.navigate(JournalScreenName.NOTE, { id });
  };

  const handleShowModal = (id: number): void => {
    dispatch(journalActions.setSelectedJournalEntry(id));
    setIsDeleteModalVisible(true);
  };

  const hanleCloseModal = (): void => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteNote = (): void => {
    hanleCloseModal();
    if (selectedJournalEntry) {
      void dispatch(journalActions.deleteJournal(selectedJournalEntry.id));
    }
  };

  const handleAddNote = (): void => {
    void dispatch(
      journalActions.createJournalEntry({
        title: DEFAULT_NOTE_PAYLOAD.title,
        text: DEFAULT_NOTE_PAYLOAD.text,
      }),
    );

    const lastJournalEntry = allJournalEntries.findLast(Boolean);
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
      <Modal
        isVisible={isDeleteModalVisible}
        onClose={hanleCloseModal}
        onDelete={handleDeleteNote}
        type="Note"
      />
      <View style={styles.container}>
        <InputSearch
          placeholder="Search note"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredJournals.map((item) => {
            return (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                onPress={(): void => {
                  handleSelectJournalEntry(item.id);
                }}
                iconRight="delete"
                onIconPress={(): void => {
                  handleShowModal(item.id);
                }}
                isModalVisible={isDeleteModalVisible}
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
