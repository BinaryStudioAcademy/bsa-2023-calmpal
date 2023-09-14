import { type RefObject } from 'react';

import { useEffect } from '#libs/hooks/hooks.js';

type Properties = {
  reference: RefObject<HTMLElement>;
  onClose: () => void;
};

const useHandleClickOutside = ({ reference, onClose }: Properties): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        reference.current &&
        !reference.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [reference, onClose]);
};

export { useHandleClickOutside };
