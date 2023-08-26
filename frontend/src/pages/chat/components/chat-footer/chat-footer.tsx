import { type ChangeEvent } from 'react';

import sendIcon from '#/assets/img/send-icon.svg';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type ChatFooterProperties = {
  onSend: (text: string) => void;
};

const ChatFooter: React.FC<ChatFooterProperties> = ({ onSend }) => {
  const [text, setText] = useState('');

  const textHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setText(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSend(text);
      setText('');
    },
    [onSend, text],
  );

  return (
    <footer className={styles['chat-footer']}>
      <form className={styles['form']} onSubmit={handleSubmit}>
        <input
          placeholder="Type a message"
          className={styles['input']}
          value={text}
          onChange={textHandler}
          required
        />
        <button type="submit" className={styles['send-button']}>
          <img src={sendIcon} className={styles['send-icon']} alt="send-icon" />
        </button>
      </form>
    </footer>
  );
};

export { ChatFooter };
