import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { AppColor, ChatScreenName, RootScreenName } from '#libs/enums/enums';
import {
  useCallback,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '#libs/hooks/hooks';
import { type ChatNavigationParameterList } from '#libs/types/types';

import mockedChats from './libs/data.json';
import { styles } from './styles';

const mockedCount = 12;
const ChatList: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatNavigationParameterList>>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleShowModal = (): void => {
    setIsModalVisible(true);
  };

  const hanleCloseModal = (): void => {
    setIsModalVisible(false);
  };

  const handleDeletChat = (): void => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <Header title="Chat" badgeCount={mockedCount} isProfileVisible />
        );
      },
    });
  }, [navigation]);

  const handleSelectChat = useCallback(
    (title: string) => {
      navigation.navigate(ChatScreenName.CHAT, { title });
    },
    [navigation],
  );

  const { filteredData: filteredChats, setSearchQuery } = useSearch(
    mockedChats,
    'title',
  );

  return (
    <LinearGradient>
      <Modal
        isVisible={isModalVisible}
        onClose={hanleCloseModal}
        onDelete={handleDeletChat}
        type="Chat"
      />
      <View style={styles.container}>
        <InputSearch
          placeholder="Search chat"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredChats.map((item) => {
            return (
              <Card
                title={item.title}
                onPress={handleSelectChat}
                key={item.id}
                onDelete={handleShowModal}
              />
            );
          })}
        </ScrollView>
        <View style={styles.linkWrapper}>
          <Link
            label="Add new chat"
            to={`/${RootScreenName.SIGN_IN}`}
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

export { ChatList };
