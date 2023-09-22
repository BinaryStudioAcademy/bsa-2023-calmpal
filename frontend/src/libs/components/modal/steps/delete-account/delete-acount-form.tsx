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
  NO_CHECKED_BOXES,
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
    field: { onChange: onCheckboxChange, value: checkedBoxes },
  } = useFormController({
    name: 'checkboxes',
    control,
  });

  const handleCheckboxChange = useCallback(
    (checkboxName: string) => {
      return () => {
        if (checkedBoxes.includes(checkboxName)) {
          onCheckboxChange(
            checkedBoxes.filter((option) => {
              return option !== checkboxName;
            }),
          );
        } else {
          onCheckboxChange([...checkedBoxes, checkboxName]);
        }
      };
    },
    [checkedBoxes, onCheckboxChange],
  );

  const isInputDisabled = !checkedBoxes.includes('checkbox4');
  const isNextDisabled = checkedBoxes.length === NO_CHECKED_BOXES;

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
                checked={checkedBoxes.includes(checkbox.name) || false}
                onChange={handleCheckboxChange(checkbox.name)}
                isDefaultStylesDisabled
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
          isDisabled={isInputDisabled}
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
