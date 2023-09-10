import { createPortal } from 'react-dom';

import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';

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
  return createPortal(
    <div
      className={getValidClassNames(
        styles['overlay'],
        !isDisplayed && 'visually-hidden',
      )}
    >
      <div className={styles['modal']}>
        <div className={styles['header']}>
          <span className={styles['title']}>{title}</span>
          <div className={styles['icon-container']}>
            <Button
              icon={{ name: 'close', color: IconColor.BLACK }}
              label="Close modal"
              isLabelVisuallyHidden={true}
              style="rounded-transparent"
              onClick={onClose}
            />
          </div>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export { Modal };
