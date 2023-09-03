import { IconButton } from '#libs/components/icon-button/icon-button.js';
import { Input } from '#libs/components/input/input.js';
import { DEFAULT_INPUT } from '#libs/constants/constants.js';
import { useAppForm, useCallback } from '#libs/hooks/hooks.js';
import { type ChatInputValue } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  onSend: ({ text }: { text: string }) => void;
};

type HandleForm = () => void;

const ChatFooter: React.FC<Properties> = ({ onSend }) => {
  const { control, handleSubmit, errors, reset } =
    useAppForm<ChatInputValue>(DEFAULT_INPUT);

  const onSubmit = useCallback(
    ({ text }: ChatInputValue): void => {
      onSend({ text });
      reset();
    },
    [onSend, reset],
  );

  return (
    <footer className={styles['chat-footer']}>
      <form
        className={styles['form']}
        onSubmit={handleSubmit(onSubmit) as HandleForm}
      >
        <Input
          placeholder="Type a message"
          errors={errors}
          style="chat-input"
          autoComplete="off"
          isRequired
          name="text"
          control={control}
        />
        <IconButton type="submit" style="primary" icon="send-icon" />
      </form>
    </footer>
  );
};

export { ChatFooter };
