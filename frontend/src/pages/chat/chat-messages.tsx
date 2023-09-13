import { useAppSelector } from '#libs/hooks/hooks.js';

import { ChatMessage } from './components/components.js';
import { MOCK_MESSAGES } from './libs/constants/constants.js';

const ChatMessages: React.FC = () => {
  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser,
    };
  });

  return (
    <>
      {MOCK_MESSAGES.map((item) => {
        return (
          <ChatMessage
            key={item.id}
            message={item.message}
            isSender={item.senderId === authenticatedUser?.id}
          />
        );
      })}
    </>
  );
};
export { ChatMessages };
