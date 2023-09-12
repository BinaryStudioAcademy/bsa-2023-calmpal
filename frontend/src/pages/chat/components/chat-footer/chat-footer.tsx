import { Icon } from '#libs/components/components.js';
import { Input } from '#libs/components/input/input.js';
import { IconColor } from '#libs/enums/enums.js';
import { useAppForm, useCallback } from '#libs/hooks/hooks.js';
import { CHAT_INPUT_DEFAULT_VALUES } from '#pages/chat/libs/constants/constants.js';
import { type ChatInputValue } from '#pages/chat/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  onSend: ({ text }: { text: string }) => void;
};

const ChatFooter: React.FC<Properties> = ({ onSend }) => {
  const { control, handleSubmit, errors, reset } = useAppForm<ChatInputValue>({
    defaultValues: CHAT_INPUT_DEFAULT_VALUES,
    mode: 'onSubmit',
  });

  const onSubmit = useCallback(
    ({ text }: ChatInputValue): void => {
      onSend({ text });
      reset();
    },
    [onSend, reset],
  );
  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <footer className={styles['chat-footer']}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          placeholder="Type a message"
          errors={errors}
          autoComplete="off"
          name="text"
          control={control}
          isChatInput
        />
        <button type="submit" className={styles['send-button']}>
          <span className="visually-hidden">Send message</span>
          <Icon name="send" color={IconColor.BLUE} />
        </button>
      </form>
    </footer>
  );
};

export { ChatFooter };
