import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.js';
import { type IconName } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  name: IconName;
  className?: string;
};

const Icon: React.FC<Properties> = ({ name, className = '' }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  const cssClass = styles[className] ?? '';

  return (
    <div className={cssClass}>
      <SelectedIcon />
    </div>
  );
};

export { Icon };
