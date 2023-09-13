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
import { ChatScreenName } from '#libs/enums/enums';
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

import { styles } from './styles';

const mockedCount = 12;
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

  const handleSelectChat = useCallback(
    (title: string) => {
      navigation.navigate(ChatScreenName.CHAT, { title });
    },
    [navigation],
  );

  const handleAddChat = useCallback(() => {
    //
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <Header title="Chat" badgeCount={mockedCount} isProfileVisible />
        );
      },
    });
  }, [navigation]);

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
                onPress={handleSelectChat}
                key={item.id}
              />
            );
          })}
        </ScrollView>
        <Button
          onPress={handleAddChat}
          iconName="plus"
          label="Add new note"
          type="transparent"
          isAddButton
        />
      </View>
    </LinearGradient>
  );
};

export { ChatList };
