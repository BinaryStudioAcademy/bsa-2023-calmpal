import { IconColor } from '#libs/enums/enums.js';
import {
  useCallback,
  useHandleClickOutside,
  useRef,
} from '#libs/hooks/hooks.js';

import { Button } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  title: string;
  reference: React.RefObject<HTMLDialogElement>;
};

const Modal: React.FC<Properties> = ({ children, title, reference }) => {
  const modalReference = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    reference.current?.close();
  }, [reference]);

  useHandleClickOutside({
    ref: modalReference,
    onClose: handleClose,
  });

  return (
    <dialog ref={reference}>
      <div className={styles['overlay']}>
        <div className={styles['modal']} ref={modalReference}>
          <div className={styles['header']}>
            <span className={styles['title']}>{title}</span>
            <form method="dialog" className={styles['icon-container']}>
              <Button
                label="Close modal"
                iconName="close"
                iconColor={IconColor.BLACK}
                style="rounded-transparent"
                onClick={handleClose}
                isLabelVisuallyHidden
              />
            </form>
          </div>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export { Modal };
