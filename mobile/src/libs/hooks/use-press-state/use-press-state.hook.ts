import { AppColor } from '#libs/enums/enums';
import { useEffect, useState } from '#libs/hooks/hooks';

import { PRESS_TIMEOUT } from './libs/constants';

type Properties = {
  onPress: () => void;
  isRounded: boolean | undefined;
};

type PressState = {
  handlePress: () => void;
  color: string;
};

const usePressState = ({ onPress, isRounded }: Properties): PressState => {
  const [isPressed, setIsPressed] = useState(false);

  let color;
  if (isPressed) {
    color = AppColor.BLUE_200;
  } else {
    color = isRounded ? AppColor.BLUE_200 : AppColor.GRAY_400;
  }

  const handlePress = (): void => {
    setIsPressed(true);
    onPress();
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isPressed) {
      timeoutId = setTimeout(() => {
        setIsPressed(false);
      }, PRESS_TIMEOUT);
    }

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [isPressed]);

  return {
    handlePress,
    color,
  };
};

export { usePressState };
