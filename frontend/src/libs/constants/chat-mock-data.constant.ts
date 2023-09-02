import { ChatRole } from '#libs/enums/enums.js';
import { generateUUID } from '#libs/helpers/helpers.js';
import { type ChatMessage } from '#libs/types/types.js';

const DOCTOR_FREUD_GREETING =
  'Hello, I am Doctor Freud 👨‍⚕️. How can I help you?';

const MOCK_MESSAGE: ChatMessage = {
  id: generateUUID(),
  sender: ChatRole.BOT,
  message: [DOCTOR_FREUD_GREETING],
};

export { MOCK_MESSAGE };
