import { Icon } from '#libs/components/components.js';
import { Input } from '#libs/components/input/input.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppForm,
  useCallback,
  useEffect,
  useParams,
} from '#libs/hooks/hooks.js';
import {
  CHAT_INPUT_DEFAULT_VALUES,
  CHAT_RESPONSE_IS_LOADING_MESSAGE,
} from '#pages/chat/libs/constants/constants.js';
import { type ChatInputValue } from '#pages/chat/libs/types/types.js';
import { appActions } from '#slices/app/app-notification.js';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    reset();
  }, [id, reset]);

  const onSubmit = useCallback(
    ({ message }: ChatInputValue): void => {
      if (isChatbotReplyLoading) {
        void dispatch(
          appActions.notify({
            type: 'info',
            message: CHAT_RESPONSE_IS_LOADING_MESSAGE,
          }),
        );

        return;
      }

      onSend({ message });
      reset();
    },
    [onSend, reset, isChatbotReplyLoading, dispatch],
  );

  const messageValue = watch('message');

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const isMessageEmpty = messageValue.trim() === '';

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
          disabled={isMessageEmpty}
        >
          <span className="visually-hidden">Send message</span>
          <Icon name="send" color={IconColor.BLUE} width={24} height={24} />
        </button>
      </form>
    </footer>
  );
};

export { ChatFooter };
