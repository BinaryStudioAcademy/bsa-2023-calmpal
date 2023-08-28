import sendIcon from '#/assets/img/send-icon.svg';
import { Controller } from '#libs/components/components.js';
import { useAppForm, useCallback } from '#libs/hooks/hooks.js';
import { type ChatInputProperties } from '#libs/types/chat-input-properties.type.js';

import { ChatInput } from '../chat-input/chat-input.js';
import styles from './styles.module.scss';

type ChatFooterProperties = {
  onSend: ({ text }: { text: string }) => void;
};

const ChatFooter: React.FC<ChatFooterProperties> = ({ onSend }) => {
  const { control, getValues, reset } = useAppForm({
    defaultValues: {
      text: '',
    },
    mode: 'onSubmit',
  });

  const handleFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { text } = getValues();
      onSend({ text });
      reset();
    },
    [getValues, onSend, reset],
  );

  const renderInput = useCallback(
    ({ field }: ChatInputProperties): React.ReactElement => (
      <ChatInput field={field} />
    ),
    [],
  );

  return (
    <footer className={styles['chat-footer']}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Controller
          control={control}
          name="text"
          rules={{ required: true }}
          render={renderInput}
        />
        <button type="submit" className={styles['send-button']}>
          <img src={sendIcon} className={styles['send-icon']} alt="send-icon" />
        </button>
      </form>
    </footer>
  );
};

export { ChatFooter };
