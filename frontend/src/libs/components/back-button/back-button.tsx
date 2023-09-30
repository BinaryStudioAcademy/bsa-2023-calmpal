import { IconColor } from '#libs/enums/enums.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  onGoBack: () => void;
};

const BackButton: React.FC<Properties> = ({ onGoBack }) => {
  return (
    <button className={styles['backward']} onClick={onGoBack}>
      <Icon name="back" color={IconColor.BLUE} width={30} height={20} />
    </button>
  );
};

export { BackButton };
