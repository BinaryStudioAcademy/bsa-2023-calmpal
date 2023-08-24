import { Button } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  onActivate: (label: string) => void;
  onDisable: (label: string) => void;
};

const SurveyOption: React.FC<Properties> = ({
  label,
  onActivate,
  onDisable,
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleOnClick = useCallback(() => {
    active ? onDisable(label) : onActivate(label);
    setActive(!active);
  }, [active, label, onDisable, onActivate]);

  return (
    <Button
      label={label}
      className={getValidClassNames(
        styles['option'],
        active && styles['active'],
      )}
      onClick={handleOnClick}
    />
  );
};

export { SurveyOption };
