import { Button, Checkbox } from '#libs/components/components.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  type FeelingInputDto,
  type HandleFieldChangeType,
} from '#packages/survey/libs/types/types.js';
import { stepInputValidationSchema } from '#packages/survey/survey.js';
import { FEELINGS_CATEGORIES } from '#pages/surveys/libs/constants.js';

import styles from '../styles.module.scss';

type Properties = {
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSetFeelings: (feelings: string[]) => void;
  onFieldChange: (options: HandleFieldChangeType) => () => void;
};

const FeelingsStep: React.FC<Properties> = ({
  onNextStep,
  onPreviousStep,
  onSetFeelings,
  onFieldChange,
}) => {
  const feelings = useAppSelector((state) => {
    return state.survey.feelings;
  });

  const { control, isValid, handleSubmit } = useAppForm<FeelingInputDto>({
    defaultValues: { feelings: feelings },
    validationSchema: stepInputValidationSchema,
  });
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'feelings',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        onFieldChange({
          category,
          currentCategories: categoriesValue,
          stateValue: feelings,
          defaultCategories: FEELINGS_CATEGORIES,
          categoryChange: onCategoryChange,
          stateChange: onSetFeelings,
        });
      };
    },
    [categoriesValue, feelings, onCategoryChange, onFieldChange, onSetFeelings],
  );

  const handleFeelingsSubmit = useCallback(
    (payload: { feelings: string[] }) => {
      onSetFeelings(payload.feelings);
      onNextStep();
    },
    [onNextStep, onSetFeelings],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleFeelingsSubmit)(event_);
    },
    [handleSubmit, handleFeelingsSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>How have you been feeling lately?</div>

      <div className={styles['select']}>
        {FEELINGS_CATEGORIES.map((category) => {
          return (
            <Checkbox
              control={control}
              name="feelings"
              key={category}
              isChecked={categoriesValue.includes(category)}
              label={category}
              onChange={handleFieldChange(category)}
            />
          );
        })}
      </div>

      <Button
        type="submit"
        label="Continue"
        style="secondary"
        isDisabled={!isValid}
      />

      <Button label="Back" style="outlined" onClick={onPreviousStep} />
    </form>
  );
};

export { FeelingsStep };
