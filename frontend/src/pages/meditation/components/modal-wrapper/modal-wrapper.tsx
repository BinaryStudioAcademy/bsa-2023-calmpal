import { ContentType, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as meditationActions } from '#slices/meditation/meditation.js';

import { MeditationModal } from '../meditation-modal/meditation-modal.js';
import styles from './styles.module.scss';

// Temporary coponent, that will be removed with implementation of the sidebar

const ModalWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const { meditationDataStatus } = useAppSelector(({ meditation }) => {
    return {
      meditationDataStatus: meditation.dataStatus,
    };
  });

  if (meditationDataStatus === DataStatus.FULFILLED) {
    setIsDisplayed(false);
  }

  const handleOpenModal = useCallback(() => {
    setIsDisplayed(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsDisplayed(false);
  }, []);

  const handleSubmit = useCallback(
    (title: string, file: File) => {
      void dispatch(
        meditationActions.createMeditationEntry({
          topicName: title,
          file: file,
          contentType: ContentType.MPEG,
        }),
      );
    },
    [dispatch],
  );

  return (
    <>
      <div className={styles['container']}>
        <button onClick={handleOpenModal}>Open modal</button>
      </div>

      <MeditationModal
        isDisplayed={isDisplayed}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { ModalWrapper };
