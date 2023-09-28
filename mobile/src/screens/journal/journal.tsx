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
import { AppColor } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { actions as journalActions } from '#slices/journal/journal';

import { styles } from './styles';

const Journal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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

  const handleSelectJournal = useCallback(() => {
    // TODO: Implement actual functionality for the onPress event
  }, []);

  const handleShowModal = (id: number): void => {
    dispatch(journalActions.setSelectedJournalEntry(id));
    setIsModalVisible(true);
  };

  const hanleCloseModal = (): void => {
    setIsModalVisible(false);
  };

  const handleDeleteNote = (): void => {
    hanleCloseModal();
    if (selectedJournalEntry) {
      void dispatch(journalActions.deleteJournal(selectedJournalEntry.id));
    }
  };

  const handleAddNote = useCallback(() => {
    // TODO: Implement actual functionality for the onPress event
  }, []);

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
        isVisible={isModalVisible}
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
                title={item.title}
                onPress={handleSelectJournal}
                key={item.id}
                onIconPress={(): void => {
                  handleShowModal(item.id);
                }}
              />
            );
          })}
        </ScrollView>
        <Button
          onPress={handleAddNote}
          iconName="plus"
          label="Add new note"
          type="transparent"
          color={AppColor.BLUE_200}
        />
      </View>
    </LinearGradient>
  );
};
export { Journal };
