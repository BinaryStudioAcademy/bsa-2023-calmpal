import { type ChangeEvent, type FC } from 'react';

import { Button, Checkbox } from '#libs/components/components.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onNext?: () => void;
  onClose?: () => void;
};

const DeleteAccountForm: FC<Properties> = ({ onNext, onClose }) => {
  const [isChecked, setIsChecked] = useState({
    'checkbox1': false,
    'checkbox2': false,
    'checkbox3': false,
    'checkbox4': false,
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
          <Checkbox
            label="I've chose another app"
            name="checkbox1"
            checked={isChecked.checkbox1}
            onChange={handleCheckboxChange}
            disableDefaultStyles
          />
        </div>
        <div>
          <Checkbox
            label="I've reached my goal"
            name="checkbox2"
            checked={isChecked.checkbox2}
            onChange={handleCheckboxChange}
            disableDefaultStyles
          />
        </div>
        <div>
          <Checkbox
            label="I can't afford the current pricing"
            name="checkbox3"
            checked={isChecked.checkbox3}
            onChange={handleCheckboxChange}
            disableDefaultStyles
          />
        </div>
        <div>
          <Checkbox
            label="Other"
            name="checkbox4"
            checked={isChecked.checkbox4}
            onChange={handleCheckboxChange}
            disableDefaultStyles
          />
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
        {onClose && <Button label="Cancel" style="primary" onClick={onClose} />}
        {onNext && (
          <Button
            label="Continue"
            style="primary"
            isDisabled={isNextDisabled}
            onClick={onNext}
          />
        )}
      </div>
    </div>
  );
};

export { DeleteAccountForm };
