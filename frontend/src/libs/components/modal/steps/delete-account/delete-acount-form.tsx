import { type ChangeEvent, type FC } from 'react';

import { useCallback, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onNext?: () => void;
  onClose?: () => void;
};

const DeleteAccountForm: FC<Properties> = ({ onNext, onClose }) => {
  const [isChecked, setIsChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const [text, setText] = useState('');

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { name, checked } = event.target;
      setIsChecked((previousState) => {
        return { ...previousState, [name]: checked };
      });
    },
    [],
  );

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setText(event.target.value);
    },
    [],
  );

  const isNextDisabled = !Object.values(isChecked).some(Boolean);

  return (
    <div className={styles['modal-body']}>
      <form className={styles['form']}>
        <div>
          <label>
            <input
              type="checkbox"
              name="checkbox1"
              onChange={handleCheckboxChange}
              checked={isChecked.checkbox1}
            />
            I&apos;ve chose another app
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="checkbox2"
              onChange={handleCheckboxChange}
              checked={isChecked.checkbox2}
            />
            I&apos;ve reached my goal
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="checkbox3"
              onChange={handleCheckboxChange}
              checked={isChecked.checkbox3}
            />
            I can&apos;t afford the current pricing
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="checkbox4"
              onChange={handleCheckboxChange}
              checked={isChecked.checkbox4}
            />
            Other
          </label>
        </div>
        <input
          type="text"
          value={text}
          className={styles['input']}
          onChange={handleTextChange}
          placeholder="Please describe your situation"
          disabled={!isChecked.checkbox4}
        />
      </form>
      <div className={styles['footer']}>
        <button onClick={onClose} className={styles['button']}>
          Cancel
        </button>
        <button
          onClick={onNext}
          className={styles['button']}
          disabled={isNextDisabled}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export { DeleteAccountForm };
