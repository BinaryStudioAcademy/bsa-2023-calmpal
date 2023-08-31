import { type IconName } from '#libs/enums/enums.js';
import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.js';

import styles from './styles.module.scss';

type Properties = {
  name: IconName;
  className?: string;
};

const Icon: React.FC<Properties> = ({ name, className = '' }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  const cssClass = className && styles[className] ? styles[className] : '';

  return (
    <div className={cssClass}>
      <SelectedIcon />
    </div>
  );
};

export { Icon };
