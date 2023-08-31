import { ChatBody } from '#pages/chat/components/chat-body/chat-body.js';
import { ChatHeader } from '#pages/chat/components/chat-header/chat-header.js';

const ChatLayout: React.FC = () => {
  return (
    <>
      <ChatHeader />
      <ChatBody />
    </>
  );
};

export { ChatLayout };
