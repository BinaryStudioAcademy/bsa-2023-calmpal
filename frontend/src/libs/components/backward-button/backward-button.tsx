import { IconColor } from '#libs/enums/icon-color.enum.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  handleButtonBackward: () => void;
};

const BackwardButton: React.FC<Properties> = ({ handleButtonBackward }) => {
  return (
    <button className={styles['backward']} onClick={handleButtonBackward}>
      <Icon name="back" color={IconColor.BLUE} />
    </button>
  );
};

export { BackwardButton };
