import { Button, Checkbox, Input } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type DeleteAccountFormPayload } from '#packages/users/users.js';

import {
  CHECKBOX_OPTIONS,
  DEFAULT_DELETE_ACCOUNT_PAYLOAD,
  NO_CHECKBOXES,
  OTHER_OPTION_LABEL,
} from './libs/constants/constants.js';
import { DeleteAccountPayloadKey } from './libs/enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  onNext?: () => void;
  onClose?: () => void;
};

const DeleteAccountForm: React.FC<Properties> = ({ onNext, onClose }) => {
  const { control, errors, handleSubmit } =
    useAppForm<DeleteAccountFormPayload>({
      defaultValues: DEFAULT_DELETE_ACCOUNT_PAYLOAD,
      mode: 'onSubmit',
    });

  const {
    field: { onChange: onCheckboxChange, value: checkboxesValue },
  } = useFormController({
    name: DeleteAccountPayloadKey.CHECKBOXES,
    control,
  });

  const handleCheckboxChange = useCallback(
    (checkboxLabel: string) => {
      return () => {
        if (checkboxesValue.includes(checkboxLabel)) {
          onCheckboxChange(
            checkboxesValue.filter((option) => {
              return option !== checkboxLabel;
            }),
          );
        } else {
          onCheckboxChange([...checkboxesValue, checkboxLabel]);
        }
      };
    },
    [checkboxesValue, onCheckboxChange],
  );

  const isInputDisabled = !checkboxesValue.includes(OTHER_OPTION_LABEL);
  const isNextDisabled = checkboxesValue.length === NO_CHECKBOXES;

  const hasNextStep = Boolean(onNext);
  const hasCloseButton = Boolean(onClose);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(() => {
        onNext?.();
      })(event_);
    },
    [handleSubmit, onNext],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      {CHECKBOX_OPTIONS.map((checkbox) => {
        return (
          <div key={checkbox.label}>
            <Checkbox
              control={control}
              name={DeleteAccountPayloadKey.CHECKBOXES}
              label={checkbox.label}
              onChange={handleCheckboxChange(checkbox.label)}
              style="secondary"
            />
          </div>
        );
      })}
      <Input
        control={control}
        errors={errors}
        name="description"
        placeholder="Please describe your situation"
        autoComplete="off"
        maxLength={60}
        isDisabled={isInputDisabled}
      />
      <div className={styles['footer']}>
        {hasCloseButton && (
          <Button label="Cancel" style="primary" onClick={onClose} />
        )}
        {hasNextStep && (
          <Button
            type="submit"
            label="Continue"
            style="primary"
            isDisabled={isNextDisabled}
          />
        )}
      </div>
    </form>
  );
};

export { DeleteAccountForm };
