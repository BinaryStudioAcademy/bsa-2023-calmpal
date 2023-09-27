import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  onGoBack: () => void;
  isVisible?: boolean;
};

const BackButton: React.FC<Properties> = ({ onGoBack, isVisible = false }) => {
  return (
    <button
      className={getValidClassNames(
        styles['backward'],
        !isVisible && 'visually-hidden',
      )}
      onClick={onGoBack}
    >
      <Icon name="back" color={IconColor.BLUE} width={30} height={20} />
    </button>
  );
};

export { BackButton };
