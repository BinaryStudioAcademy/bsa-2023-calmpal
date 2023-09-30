import { Button, Checkbox, Input } from '#libs/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#libs/constants/constants.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  DELETE_ACCOUNT_OTHER_CATEGORY,
  type DeleteAccountFormPayload,
  deleteAccountFormValidationSchema,
} from '#packages/users/users.js';

import {
  CHECKBOX_OPTIONS,
  DEFAULT_DELETE_ACCOUNT_PAYLOAD,
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
      validationSchema: deleteAccountFormValidationSchema,
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

  const hasError = Object.keys(errors).length > EMPTY_ARRAY_LENGTH;
  const isInputDisplayed = checkboxesValue.includes(
    DELETE_ACCOUNT_OTHER_CATEGORY,
  );

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
              label={checkbox.label}
              isChecked={checkboxesValue.includes(checkbox.label)}
              onChange={handleCheckboxChange(checkbox.label)}
              style="secondary"
            />
          </div>
        );
      })}
      {isInputDisplayed && (
        <Input
          control={control}
          errors={errors}
          name="description"
          placeholder="Please describe your situation"
          autoComplete="off"
          maxLength={60}
        />
      )}
      <div className={styles['footer']}>
        {hasCloseButton && (
          <Button label="Cancel" style="primary" onClick={onClose} />
        )}
        {hasNextStep && (
          <Button
            type="submit"
            label="Continue"
            style="primary"
            isDisabled={hasError}
          />
        )}
      </div>
    </form>
  );
};

export { DeleteAccountForm };
