import { IconColor } from '#libs/enums/enums.js';
import {
  forwardRef,
  useCallback,
  useHandleClickOutside,
  useRef,
} from '#libs/hooks/hooks.js';

import { Button } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  title: string;
  showCrossIcon: boolean;
};

const Modal: React.ForwardRefRenderFunction<
  HTMLDialogElement | null,
  Properties
> = ({ children, title, showCrossIcon }, reference) => {
  const childrenReference =
    reference as React.RefObject<HTMLDialogElement | null>;
  const modalReference = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    childrenReference.current?.close();
  }, [childrenReference]);

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
            {showCrossIcon && (
              <div className={styles['icon-container']}>
                <Button
                  label="Close modal"
                  iconName="close"
                  iconColor={IconColor.BLACK}
                  style="rounded-transparent"
                  onClick={handleClose}
                  isLabelVisuallyHidden
                />
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </dialog>
  );
};

const ForwardedModal = forwardRef(Modal);

export { ForwardedModal as Modal };
