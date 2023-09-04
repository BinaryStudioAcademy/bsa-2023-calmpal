import { iconNameToPlainSvgMap } from '#libs/components/icon/icon-name-to-plain-svg.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { type IconName } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  name: IconName;
  className?: string;
};

const Icon: React.FC<Properties> = ({ name, className = '' }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  const cssClass = getValidClassNames(styles[className]);

  return <SelectedIcon className={cssClass} />;
};

export { Icon };
