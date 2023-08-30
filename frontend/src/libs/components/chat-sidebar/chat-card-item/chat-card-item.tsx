import { useCallback } from '#libs/hooks/hooks.js';

import { Card } from '../../components.js';

type Properties = {
  chat: Chat;
};

type Chat = {
  id: number;
  name: string;
};

const mockedSelectedChat = {
  id: 1,
};

const ChatCardItem: React.FC<Properties> = ({ chat }) => {
  const handleSelectChat = useCallback((): void => {
    mockedSelectedChat.id = chat.id; //change to redux logic
  }, [chat.id]);

  return (
    <Card
      title={chat.name}
      imageUrl="images/card-image-placeholder.png"
      onPress={handleSelectChat}
      isActive={mockedSelectedChat.id === chat.id}
    />
  );
};

export { ChatCardItem };
