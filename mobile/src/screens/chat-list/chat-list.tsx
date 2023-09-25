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
import { AppColor, ChatScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useNavigation,
  useSearch,
} from '#libs/hooks/hooks';
import { type ChatNavigationParameterList } from '#libs/types/types';
import { actions as chatsActions } from '#slices/chats/chats';

import { EMPTY_ARRAY_LENGTH } from './libs/constants';
import { styles } from './styles';

const ChatList: React.FC = () => {
  const { chats } = useAppSelector(({ chats }) => {
    return {
      chats: chats.chats,
    };
  });
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatNavigationParameterList>>();

  const { filteredData: filteredChats, setSearchQuery } = useSearch(
    chats,
    'name',
  );

  const chatsLength = chats.length;

  const handleSelectChat = useCallback(
    (title: string) => {
      navigation.navigate(ChatScreenName.CHAT, { title });
    },
    [navigation],
  );

  const handleRedirectToChat = useCallback(() => {
    navigation.navigate(ChatScreenName.CHAT, { title: 'New Chat' });
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
    if (chatsLength === EMPTY_ARRAY_LENGTH) {
      handleRedirectToChat();
    }
  }, [chatsLength, handleRedirectToChat]);

  useEffect(() => {
    void dispatch(chatsActions.getAllChats());
  }, [dispatch]);

  return (
    <LinearGradient>
      <View style={styles.container}>
        <InputSearch
          placeholder="Search chat"
          setSearchQuery={setSearchQuery}
        />
        <ScrollView contentContainerStyle={styles.list}>
          {filteredChats.map((item) => {
            return (
              <Card
                title={item.name}
                onPress={(): void => {
                  handleSelectChat(item.name);
                }}
                key={item.id}
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
