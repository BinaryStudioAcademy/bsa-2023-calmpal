import { ChatBody } from '../chat-body/chat-body.js';
import { ChatHeader } from '../chat-header/chat-header.js';

const ChatLayout: React.FC = () => {
  return (
    <>
      <ChatHeader />
      <ChatBody />
    </>
  );
};

export { ChatLayout };
