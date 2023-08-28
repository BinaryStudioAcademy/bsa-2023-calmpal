import { type ChatInputProperties } from '#libs/types/types.js';

import styles from './styles.module.scss';

const ChatInput: React.FC<ChatInputProperties> = ({ field }) => (
  <input
    placeholder="Type a message"
    className={styles['input']}
    required
    {...field}
  />
);

export { ChatInput };
