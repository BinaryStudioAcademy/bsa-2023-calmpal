import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Input, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useAppForm } from '#libs/hooks/hooks';

import { ChatItem, ChatLink } from './components/components';
import data from './data.json';
import { styles } from './styles';

const Chat: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { control, errors } = useAppForm({
    defaultValues: { search: '' },
  });

  return (
    <LinearGradient
      colors={[AppColor.WHITE, AppColor.BLUE_100]}
      style={styles.linearGradient}
    >
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <Input
            control={control}
            errors={errors}
            name="search"
            placeholder="Search topic"
            setSearchQuery={setSearchQuery}
            style={styles.input}
          />
          <ScrollView contentContainerStyle={styles.list}>
            {data
              .filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((item) => (
                <ChatItem chatItem={item} key={item.id} />
              ))}
          </ScrollView>
          <ChatLink />
        </View>
      </View>
    </LinearGradient>
  );
};

export { Chat };
