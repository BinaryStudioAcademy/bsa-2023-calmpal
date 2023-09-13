import { UserRole } from '#libs/enums/enums.js';

import { ChatMessage } from './components/components.js';
import { MOCK_MESSAGES } from './libs/constants/constants.js';

const ChatMessages: React.FC = () => {
  return (
    <>
      {MOCK_MESSAGES.map((item) => {
        return (
          <ChatMessage
            key={item.id}
            item={item}
            isSender={item.sender === UserRole.USER}
          />
        );
      })}
    </>
  );
};
export { ChatMessages };
