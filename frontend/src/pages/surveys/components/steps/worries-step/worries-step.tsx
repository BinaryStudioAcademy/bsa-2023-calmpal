import { Button, Checkbox, Input } from '#libs/components/components.js';
import { FIRST_INDEX } from '#libs/constants/index.constant.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type WorryInputDto } from '#packages/survey/libs/types/types.js';
import {
  SurveyValidationRule,
  worriesStepInputValidationSchema,
} from '#packages/survey/survey.js';
import {
  TEXTAREA_ROWS_COUNT,
  WORRIES_CATEGORIES,
  WORRIES_QUESTION,
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

const WorriesStep: React.FC<Properties> = ({
  handleNextStep,
  handlePreviousStep,
}) => {
  const { worries, setWorries } = useSurvey();

  const { control, errors, isValid, handleSubmit } = useAppForm<WorryInputDto>({
    defaultValues: { worries: worries },
    validationSchema: worriesStepInputValidationSchema,
  });
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'worries',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        const otherCategories = getOthersCategories(
          WORRIES_CATEGORIES,
          categoriesValue,
        );
        if (category === 'Other' && otherCategories.length > FIRST_INDEX) {
          otherCategories.push(category);
          onCategoryChange(
            categoriesValue.filter((option) => {
              return !otherCategories.includes(option);
            }),
          );
          setWorries(
            worries.filter((option) => {
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
          setWorries(
            worries.filter((option) => {
              return option !== category;
            }),
          );

          return;
        }

        onCategoryChange([...categoriesValue, category]);
        setWorries([...worries, category]);
      };
    },
    [categoriesValue, onCategoryChange, setWorries, worries],
  );

  const handleWorriesSubmit = useCallback(
    (payload: WorryInputDto) => {
      if (payload.other) {
        payload.worries.push(payload.other);
        setWorries(payload.worries);
      } else {
        setWorries(payload.worries);
      }

      handleNextStep();
    },
    [handleNextStep, setWorries],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleWorriesSubmit)(event_);
    },
    [handleSubmit, handleWorriesSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{WORRIES_QUESTION}</div>

      <div className={styles['select']}>
        {WORRIES_CATEGORIES.map((category) => {
          return (
            <Checkbox
              key={category}
              label={category}
              onChange={handleFieldChange(category)}
              isChecked={categoriesValue.includes(category)}
            />
          );
        })}
        {hasOther(worries) && (
          <Input
            control={control}
            errors={errors}
            name="other"
            placeholder="Text"
            maxLength={SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
            defaultValue={getOtherDefault(worries)}
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

export { WorriesStep };
