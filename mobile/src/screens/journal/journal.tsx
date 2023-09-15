import React from 'react';

import {
  Card,
  Header,
  Icon,
  InputSearch,
  LinearGradient,
  Link,
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

  const handleSelectJournal = useCallback(() => {
    // TODO: Implement actual functionality for the onPress event
  }, []);

  const handleShowModal = (): void => {
    setIsModalVisible(true);
  };

  const hanleCloseModal = (): void => {
    setIsModalVisible(false);
  };

  const handleDeleteNote = (): void => {
    setIsModalVisible(false);
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
                onDelete={handleShowModal}
              />
            );
          })}
        </ScrollView>
        <View style={styles.linkWrapper}>
          <Link
            label="Add new note"
            to={''}
            style={styles.link}
            icon={
              <View style={styles.icon}>
                <Icon name="plus" color={AppColor.BLUE_300} />
              </View>
            }
          />
        </View>
      </View>
    </LinearGradient>
  );
};
export { Journal };
