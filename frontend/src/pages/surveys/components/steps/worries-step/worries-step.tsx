import { Button, Checkbox, Input } from '#libs/components/components.js';
import { FIRST_INDEX } from '#libs/constants/index.constant.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type WorryInputDto } from '#packages/survey/libs/types/types.js';
import {
  stepWithOtherInputValidationSchema,
  SurveyValidationRule,
} from '#packages/survey/survey.js';
import {
  TEXTAREA_ROWS_COUNT,
  WORRIES_CATEGORIES,
} from '#pages/surveys/libs/constants.js';

import styles from '../styles.module.scss';

type OnOther = {
  getOtherDefault: (categories: string[]) => string;
  getOthersCategories: (categories: string[], payload: string[]) => string[];
  hasOther: (category: string[]) => boolean;
};

type Properties = {
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSetWorries: (worries: string[]) => void;
  onOther: OnOther;
};

const WorriesStep: React.FC<Properties> = ({
  onNextStep,
  onPreviousStep,
  onSetWorries,
  onOther,
}) => {
  const { getOtherDefault, getOthersCategories, hasOther } = onOther;
  const worries = useAppSelector((state) => {
    return state.survey.worries;
  });
  const { control, errors, isValid, handleSubmit } = useAppForm<WorryInputDto>({
    defaultValues: { worries: worries, other: getOtherDefault(worries) },
    validationSchema: stepWithOtherInputValidationSchema,
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
          onSetWorries(
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
          onSetWorries(
            worries.filter((option) => {
              return option !== category;
            }),
          );

          return;
        }

        onCategoryChange([...categoriesValue, category]);
        onSetWorries([...worries, category]);
      };
    },
    [
      categoriesValue,
      getOthersCategories,
      onCategoryChange,
      onSetWorries,
      worries,
    ],
  );

  const handleWorriesSubmit = useCallback(
    (payload: WorryInputDto) => {
      if (payload.other) {
        payload.worries.push(payload.other);
        onSetWorries(payload.worries);
      } else {
        onSetWorries(payload.worries);
      }

      onNextStep();
    },
    [onNextStep, onSetWorries],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleWorriesSubmit)(event_);
    },
    [handleSubmit, handleWorriesSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>
        What do you usually worry about most?
      </div>

      <div className={styles['select']}>
        {WORRIES_CATEGORIES.map((category) => {
          return (
            <Checkbox
              control={control}
              name="worries"
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

      <Button label="Back" style="outlined" onClick={onPreviousStep} />
    </form>
  );
};

export { WorriesStep };
