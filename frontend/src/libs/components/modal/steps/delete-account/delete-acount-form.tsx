import { type FC } from 'react';

import { Button, Checkbox, Input } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';

import {
  CHECKBOX_OPTIONS,
  DEFAULT_DELETE_ACCOUNT_PAYLOAD,
  type DeleteAccountFormPayload,
} from '../../libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onNext?: () => void;
  onClose?: () => void;
};

const DeleteAccountForm: FC<Properties> = ({ onNext, onClose }) => {
  const { control, errors, handleSubmit } =
    useAppForm<DeleteAccountFormPayload>({
      defaultValues: DEFAULT_DELETE_ACCOUNT_PAYLOAD,
      mode: 'onSubmit',
    });

  const {
    field: { onChange: onCheckboxChange, value: checkboxValues },
  } = useFormController({
    name: 'checkboxes',
    control,
  });

  const handleCheckboxChange = useCallback(
    (checkboxName: 'checkbox1' | 'checkbox2' | 'checkbox3' | 'checkbox4') => {
      return () => {
        const newValue = {
          ...checkboxValues,
          [checkboxName]: !checkboxValues[checkboxName],
        };
        onCheckboxChange(newValue);
      };
    },
    [checkboxValues, onCheckboxChange],
  );

  const isInputDisabled = !checkboxValues['checkbox4'];
  const isNextDisabled = !Object.values(checkboxValues).some(Boolean);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(() => {
        onNext?.();
      })(event_);
    },
    [handleSubmit, onNext],
  );

  return (
    <div className={styles['modal-body']}>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        {CHECKBOX_OPTIONS.map((checkbox) => {
          return (
            <div key={checkbox.name}>
              <Checkbox
                label={checkbox.label}
                name={checkbox.name}
                checked={checkboxValues[checkbox.name] || false}
                onChange={handleCheckboxChange(checkbox.name)}
                disableDefaultStyles
              />
            </div>
          );
        })}
        <Input
          control={control}
          errors={errors}
          name="describeYourSituation"
          placeholder="Please describe your situation"
          autoComplete="off"
          maxLength={60}
          disabled={isInputDisabled}
        />
        <div className={styles['footer']}>
          {onClose && (
            <Button label="Cancel" style="primary" onClick={onClose} />
          )}
          {onNext && (
            <Button
              type="submit"
              label="Continue"
              style="primary"
              isDisabled={isNextDisabled}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export { DeleteAccountForm };
