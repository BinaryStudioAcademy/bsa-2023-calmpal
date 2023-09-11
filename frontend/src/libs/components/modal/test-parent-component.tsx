import { MeditationTimer } from '#libs/components/components.js';
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
        title="Test modal"
        onClose={handleClick(false)}
      >
        <MeditationTimer onClose={handleClick(false)} />
      </Modal>
    </div>
  );
};

export { TestParentComponent };
