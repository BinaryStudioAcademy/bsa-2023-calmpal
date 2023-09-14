import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useHandleClickOutside, useRef } from '#libs/hooks/hooks.js';

import { Button } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  isDisplayed: boolean;
  title: string;
  onClose: () => void;
};

const Modal: React.FC<Properties> = ({
  children,
  isDisplayed,
  title,
  onClose,
}) => {
  const reference = useRef<HTMLDivElement>(null);
  useHandleClickOutside({ reference, onClose });

  return (
    <dialog
      open={isDisplayed}
      className={getValidClassNames(isDisplayed && styles['overlay'])}
    >
      <div className={styles['modal']}>
        <div className={styles['header']}>
          <span className={styles['title']}>{title}</span>
          <div className={styles['icon-container']}>
            <Button
              label="Close modal"
              iconName="close"
              iconColor={IconColor.BLACK}
              isLabelVisuallyHidden={true}
              style="rounded-transparent"
              onClick={onClose}
            />
          </div>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export { Modal };
