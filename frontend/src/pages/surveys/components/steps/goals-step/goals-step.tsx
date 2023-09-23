import { Button, Checkbox, Input } from '#libs/components/components.js';
import { FIRST_INDEX } from '#libs/constants/index.constant.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type GoalInputDto } from '#packages/survey/libs/types/types.js';
import {
  goalsStepInputValidationSchema,
  SurveyValidationRule,
} from '#packages/survey/survey.js';
import {
  GOALS_CATEGORIES,
  GOALS_QUESTION,
  TEXTAREA_ROWS_COUNT,
} from '#pages/surveys/libs/constants.js';
import { useSurvey } from '#pages/surveys/libs/hooks/survey.hooks.js';
import {
  getOtherDefault,
  getOthersCategories,
  hasOther,
} from '#pages/surveys/libs/utils.js';

import styles from '../styles.module.scss';

type Properties = {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

const GoalsStep: React.FC<Properties> = ({
  handleNextStep,
  handlePreviousStep,
}) => {
  const { goals, setGoals } = useSurvey();
  const { control, errors, isValid, handleSubmit } = useAppForm<GoalInputDto>({
    defaultValues: { goals: goals },
    validationSchema: goalsStepInputValidationSchema,
  });

  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'goals',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        const otherCategories = getOthersCategories(
          GOALS_CATEGORIES,
          categoriesValue,
        );
        if (category === 'Other' && otherCategories.length > FIRST_INDEX) {
          otherCategories.push(category);
          onCategoryChange(
            categoriesValue.filter((option) => {
              return !otherCategories.includes(option);
            }),
          );
          setGoals(
            goals.filter((option) => {
              return !otherCategories.includes(option);
            }),
          );

          return;
        }

        if (categoriesValue.includes(category)) {
          onCategoryChange(
            categoriesValue.filter((option) => {
              return option !== category;
            }),
          );
          setGoals(
            goals.filter((option) => {
              return option !== category;
            }),
          );

          return;
        }

        setGoals([...goals, category]);
        onCategoryChange([...categoriesValue, category]);
      };
    },
    [categoriesValue, goals, onCategoryChange, setGoals],
  );

  const handleGoalsSubmit = useCallback(
    (payload: GoalInputDto) => {
      if (payload.other) {
        payload.goals.push(payload.other);
        setGoals(payload.goals);
      } else {
        setGoals(payload.goals);
      }

      handleNextStep();
    },
    [handleNextStep, setGoals],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleGoalsSubmit)(event_);
    },
    [handleSubmit, handleGoalsSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{GOALS_QUESTION}</div>

      <div className={styles['select']}>
        {GOALS_CATEGORIES.map((category) => {
          return (
            <Checkbox
              key={category}
              label={category}
              isChecked={categoriesValue.includes(category)}
              onChange={handleFieldChange(category)}
            />
          );
        })}
        {hasOther(goals) && (
          <Input
            control={control}
            errors={errors}
            name="other"
            placeholder="Text"
            maxLength={SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
            defaultValue={getOtherDefault(goals)}
          />
        )}
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

export { GoalsStep };
