import { Button } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '#libs/hooks/hooks.js';
import { actions as meditationActions } from '#slices/meditation/meditation.js';

import { MeditationModal } from '../components.js';
import styles from './styles.module.scss';

// Temporary component, that will be removed with implementation of the sidebar

const ModalWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const [isReseted, setIsReseted] = useState<boolean>(false);
  const { meditationDataStatus } = useAppSelector(({ meditation }) => {
    return {
      meditationDataStatus: meditation.dataStatus,
    };
  });

  useEffect(() => {
    if (meditationDataStatus === DataStatus.FULFILLED) {
      setIsDisplayed(false);
      setIsReseted(true);
    }
  }, [meditationDataStatus]);

  const handleOpen = useCallback(() => {
    setIsDisplayed(true);
    setIsReseted(false);
  }, [setIsDisplayed]);

  const handleClose = useCallback(() => {
    setIsDisplayed(false);
  }, [setIsDisplayed]);

  const handleSubmit = useCallback(
    (title: string, file: File) => {
      void dispatch(
        meditationActions.createMeditationEntry({
          topicName: title,
          file: file,
        }),
      );
    },
    [dispatch],
  );

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['button']}>
          <Button label="Open modal" onClick={handleOpen} style="secondary" />
        </div>
      </div>

      <MeditationModal
        isDisplayed={isDisplayed}
        isReseted={isReseted}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { ModalWrapper };
