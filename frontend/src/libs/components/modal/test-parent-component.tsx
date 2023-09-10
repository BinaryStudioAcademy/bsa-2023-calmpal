import { useCallback, useState } from '#libs/hooks/hooks.js';

import { Modal } from './modal.js';

const TestParentComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback((click: boolean) => {
    return () => {
      setIsOpen(click);
    };
  }, []);

  return (
    <div>
      <button type="button" onClick={handleClick(true)}>
        Open modal
      </button>
      <Modal
        isDisplayed={isOpen}
        title="Modal title"
        onClose={handleClick(false)}
      >
        <div>Modal content</div>
      </Modal>
    </div>
  );
};

export { TestParentComponent };
