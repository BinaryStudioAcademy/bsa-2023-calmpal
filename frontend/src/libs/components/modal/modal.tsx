import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  children: React.ReactNode;
  isDisplayed: boolean;
  title: string;
  onClose?: () => void;
};

const Modal: React.FC<Properties> = ({
  children,
  isDisplayed,
  title,
  onClose,
}) => {
  return (
    <div
      className={getValidClassNames(
        styles['overlay'],
        !isDisplayed && 'visually-hidden',
      )}
    >
      <div className={styles['container']}>
        <div className={styles['modal']}>
          <div className={styles['header']}>
            <span className={styles['title']}>{title}</span>
            <button
              className={getValidClassNames(styles['icon-container'])}
              onClick={onClose}
            >
              <Icon name="close" color={IconColor.BLACK} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal };
