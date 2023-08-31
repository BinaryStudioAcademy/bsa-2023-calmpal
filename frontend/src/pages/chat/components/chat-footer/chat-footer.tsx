import { Icon } from '#libs/components/icon/icon.js';
import { BLANK } from '#libs/constants/blank.constant.js';
import { useAppForm, useCallback } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type ChatFooterProperties = {
  onSend: ({ text }: { text: string }) => void;
};

type HandleForm = () => void;

const ChatFooter: React.FC<ChatFooterProperties> = ({ onSend }) => {
  const { register, handleSubmit, reset } = useAppForm<{ text: string }>({
    defaultValues: {
      text: BLANK,
    },
    mode: 'onSubmit',
  });

  const onSubmit = useCallback(
    ({ text }: { text: string }): void => {
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
        <input
          placeholder="Type a message"
          className={styles['input']}
          autoComplete="off"
          required
          {...register('text')}
        />
        <button type="submit" className={styles['send-button']}>
          <Icon name={'send-icon'} />
        </button>
      </form>
    </footer>
  );
};

export { ChatFooter };
