import { type RefObject } from 'react';

import { useEffect } from '#libs/hooks/hooks.js';

type Properties = {
  isHandle: boolean;
  ref: RefObject<HTMLElement>;
  onClose: () => void;
};

const useHandleClickOutside = ({
  isHandle,
  ref,
  onClose,
}: Properties): void => {
  useEffect(() => {
    if (!isHandle) {
      return;
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHandle, ref, onClose]);
};

export { useHandleClickOutside };
