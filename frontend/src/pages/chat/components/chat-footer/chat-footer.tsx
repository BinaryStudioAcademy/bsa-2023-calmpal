import { Icon } from '~/libs/components/components.js';
import { Input } from '~/libs/components/input/input.js';
import { IconColor } from '~/libs/enums/enums.js';
import {
  useAppForm,
  useCallback,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { CHAT_INPUT_DEFAULT_VALUES } from '~/pages/chat/libs/constants/constants.js';
import { type ChatInputValue } from '~/pages/chat/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  onSend: ({ message }: ChatInputValue) => void;
  isChatbotReplyLoading: boolean;
};

const ChatFooter: React.FC<Properties> = ({
  onSend,
  isChatbotReplyLoading,
}) => {
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, errors, reset, watch } =
    useAppForm<ChatInputValue>({
      defaultValues: CHAT_INPUT_DEFAULT_VALUES,
      mode: 'onSubmit',
    });

  useEffect(() => {
    reset();
  }, [id, reset]);

  const onSubmit = useCallback(
    ({ message }: ChatInputValue): void => {
      onSend({ message });
      reset();
    },
    [onSend, reset],
  );

  const messageValue = watch('message');

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const isMessageEmpty = messageValue.trim() === '';
  const isDisabled = isMessageEmpty || isChatbotReplyLoading;

  return (
    <footer className={styles['chat-footer']}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          placeholder="Type a message"
          errors={errors}
          autoComplete="off"
          name="message"
          control={control}
          isChatInput
        />
        <button
          type="submit"
          className={styles['send-button']}
          disabled={isDisabled}
        >
          <span className="visually-hidden">Send message</span>
          <Icon name="send" color={IconColor.BLUE} width={24} height={24} />
        </button>
      </form>
    </footer>
  );
};

export { ChatFooter };
