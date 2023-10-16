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
} from '~/libs/components/components';
import { EMPTY_ARRAY_LENGTH } from '~/libs/constants/constants';
import { AppColor, ChatScreenName } from '~/libs/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigation,
  useSearch,
  useState,
} from '~/libs/hooks/hooks';
import { type ChatNavigationParameterList } from '~/libs/types/types';
import { actions as chatsActions } from '~/slices/chats/chats';

import { styles } from './styles';

const ChatList: React.FC = () => {
  const { chats, isLoaded } = useAppSelector(({ chats }) => {
    return {
      chats: chats.chats,
      isLoaded: chats.chatsDataStatus === 'fulfilled',
    };
  });
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatNavigationParameterList>>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [chatIdToDelete, setChatIdToDelete] = useState<number | null>(null);

  const { filteredData: filteredChats, setSearchQuery } = useSearch(
    chats,
    'name',
  );

  const chatsLength = chats.length;

  const handleShowDeleteModal = (id: number): void => {
    setChatIdToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const hanleCloseDeleteModal = (): void => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteChat = (): void => {
    hanleCloseDeleteModal();
    void dispatch(chatsActions.deleteChat(chatIdToDelete as number));
  };

  const handleSelectChat = useCallback(
    (title: string, id: string | undefined) => {
      navigation.navigate(ChatScreenName.CHAT, { title, id: id ?? '' });
    },
    [navigation],
  );

  const handleRedirectToChat = useCallback(() => {
    navigation.navigate(ChatScreenName.CHAT, {
      title: 'New Chat',
      id: '',
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <Header title="Chat" badgeCount={chatsLength} isProfileVisible />
        );
      },
    });
  }, [navigation, chatsLength]);

  useEffect(() => {
    if (isLoaded && chatsLength === EMPTY_ARRAY_LENGTH) {
      handleRedirectToChat();
    }
  }, [chatsLength, handleRedirectToChat, isLoaded]);

  useEffect(() => {
    void dispatch(chatsActions.getAllChats());
  }, [dispatch]);

  return (
    <LinearGradient>
      <Modal
        isVisible={isDeleteModalVisible}
        onClose={hanleCloseDeleteModal}
        onDelete={handleDeleteChat}
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
                key={item.id}
                title={item.name}
                onPress={(): void => {
                  handleSelectChat(item.name, item.id.toString());
                }}
                iconRight="delete"
                onIconPress={(): void => {
                  handleShowDeleteModal(item.id);
                }}
              />
            );
          })}
        </ScrollView>
        <Button
          onPress={handleRedirectToChat}
          iconName="plus"
          label="Add new chat"
          type="transparent"
          color={AppColor.BLUE_200}
        />
      </View>
    </LinearGradient>
  );
};

export { ChatList };
