import { useEffect } from '~/libs/hooks/hooks.js';

type Properties = {
  ref: React.RefObject<HTMLElement>;
  onClose: () => void;
};

const useHandleClickOutside = ({ ref, onClose }: Properties): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);
};

export { useHandleClickOutside };
