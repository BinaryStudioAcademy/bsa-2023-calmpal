import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  isOverflow?: boolean;
};

const Loader: React.FC<Properties> = ({ isOverflow = false }) => {
  const { container, ellipsis, child } = styles;

  return (
    <div
      className={getValidClassNames(
        container,
        isOverflow && styles['overflow'],
      )}
    >
      <div className={ellipsis}>
        <div className={child} />
        <div className={child} />
        <div className={child} />
        <div className={child} />
      </div>
    </div>
  );
};

export { Loader };
