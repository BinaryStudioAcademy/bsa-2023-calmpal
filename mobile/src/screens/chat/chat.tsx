import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { Input, View } from '#libs/components/components';
import { useAppForm } from '#libs/hooks/hooks';

import { ChatItem } from './components/chat-item';
import data from './data.json';
import { styles } from './styles';

type chatItem = {
  id: string;
  title: string;
};

const Chat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { control, errors } = useAppForm({
    defaultValues: { search: '' },
  });

  return (
    <View style={styles.container}>
      <Input
        control={control}
        errors={errors}
        label=""
        name="search"
        placeholder="Search topic"
        setSearchQuery={setSearchQuery}
        style={styles.input}
      />

      <FlatList
        data={data.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )}
        renderItem={({ item }: { item: chatItem }): React.ReactElement => {
          return <ChatItem chatItem={item} />;
        }}
      />
    </View>
  );
};

export { Chat };
