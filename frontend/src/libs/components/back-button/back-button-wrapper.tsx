import { getValidClassNames } from '#libs/helpers/helpers.js';

import { BackButton } from './back-button.js';

type Properties = {
  onGoBack: () => void;
  isVisible?: boolean;
};

const BackButtonWrapper: React.FC<Properties> = ({
  isVisible = false,
  onGoBack,
}) => {
  return (
    <div className={getValidClassNames(!isVisible && 'visually-hidden')}>
      <BackButton onGoBack={onGoBack} />
    </div>
  );
};

export { BackButtonWrapper };
