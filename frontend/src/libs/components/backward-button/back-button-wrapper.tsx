import { getValidClassNames } from '#libs/helpers/helpers.js';

import { BackButton } from './components/backward-button.js';

type BackButtonWrapperProperties = {
  onGoBack: () => void;
  isVisible?: boolean;
};

const BackButtonWrapper: React.FC<BackButtonWrapperProperties> = ({
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
