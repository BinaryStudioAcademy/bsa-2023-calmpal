import { Button, Checkbox } from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type FeelingInputDto } from '#packages/survey/libs/types/types.js';
import { feelingsStepInputValidationSchema } from '#packages/survey/survey.js';
import {
  FEELINGS_CATEGORIES,
  FEELINGS_QUESTION,
} from '#pages/surveys/libs/constants.js';
import { useSurvey } from '#pages/surveys/libs/hooks/survey.hooks.js';

import styles from '../styles.module.scss';

type Properties = {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

const FeelingsStep: React.FC<Properties> = ({
  handleNextStep,
  handlePreviousStep,
}) => {
  const { feelings, setFeelings } = useSurvey();

  const { control, isValid, handleSubmit } = useAppForm<FeelingInputDto>({
    defaultValues: { feelings: feelings },
    validationSchema: feelingsStepInputValidationSchema,
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
        if (categoriesValue.includes(category)) {
          onCategoryChange(
            categoriesValue.filter((option) => {
              return option !== category;
            }),
          );
          setFeelings(
            feelings.filter((option) => {
              return option !== category;
            }),
          );

          return;
        }

        onCategoryChange([...categoriesValue, category]);
        setFeelings([...feelings, category]);
      };
    },
    [categoriesValue, feelings, onCategoryChange, setFeelings],
  );

  const handleFeelingsSubmit = useCallback(
    (payload: { feelings: string[] }) => {
      setFeelings(payload.feelings);
      handleNextStep();
    },
    [handleNextStep, setFeelings],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleFeelingsSubmit)(event_);
    },
    [handleSubmit, handleFeelingsSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{FEELINGS_QUESTION}</div>

      <div className={styles['select']}>
        {FEELINGS_CATEGORIES.map((category) => {
          return (
            <Checkbox
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

      <Button label="Back" style="outlined" onClick={handlePreviousStep} />
    </form>
  );
};

export { FeelingsStep };
