import { Button, Checkbox, Input, Radio } from '#libs/components/components.js';
import { FIRST_ARRAY_INDEX, LAST_INDEX } from '#libs/constants/constants.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  type StepsActions,
  type StepsType,
  type SurveyStatePayload,
} from '#packages/survey/libs/types/types.js';
import {
  OTHER_CATEGORY,
  stepInputValidationSchema,
  SurveyValidationRule,
} from '#packages/survey/survey.js';
import { TEXTAREA_ROWS_COUNT } from '#pages/surveys/libs/constants/constants.js';

import styles from './styles.module.scss';

type Properties = {
  stepCategories: string[];
  question: string;
  step: StepsType;
  type: 'checkbox' | 'radio';
  onSubmit?: StepsActions;
  onNextStep?: StepsActions;
  onPreviousStep?: StepsActions;
  onSetState: (state: string[] | string) => void;
};

const Step: React.FC<Properties> = ({
  step,
  stepCategories,
  question,
  type,
  onSubmit,
  onNextStep,
  onSetState,
  onPreviousStep,
}) => {
  const currentStep = useAppSelector((state) => {
    return state.survey[step];
  });

  const isCheckbox = type === 'checkbox' && Array.isArray(currentStep);

  const otherDefault =
    currentStep.includes(OTHER_CATEGORY) &&
    currentStep.at(LAST_INDEX) !== OTHER_CATEGORY
      ? currentStep.at(LAST_INDEX)
      : '';

  const defaultValues: SurveyStatePayload = {
    [step]: currentStep,
    other: otherDefault as string,
  };

  const { control, errors, isValid, handleSubmit } =
    useAppForm<SurveyStatePayload>({
      defaultValues,
      validationSchema: stepInputValidationSchema,
    });

  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: step,
    control,
  });

  const handleFieldChange = useCallback(
    (category: string): (() => void) => {
      return (): void => {
        if (isCheckbox) {
          const otherCategories = (categoriesValue as string[]).filter(
            (option: string) => {
              return !stepCategories.includes(option);
            },
          );
          const isOther = category === OTHER_CATEGORY;

          if (isOther && otherCategories.length > FIRST_ARRAY_INDEX) {
            otherCategories.push(category);
            const valuesWithoutOthers = (categoriesValue as string[]).filter(
              (option: string) => {
                return !otherCategories.includes(option);
              },
            );
            onCategoryChange(valuesWithoutOthers);

            return;
          }

          if ((categoriesValue as string[]).includes(category)) {
            const valuesWithoutCategory = (categoriesValue as string[]).filter(
              (option: string) => {
                return option !== category;
              },
            );
            onCategoryChange(valuesWithoutCategory);

            return;
          }

          onCategoryChange([...(categoriesValue as string[]), category]);

          return;
        }

        onSetState(category);
        onCategoryChange(category);
      };
    },
    [categoriesValue, isCheckbox, onCategoryChange, onSetState, stepCategories],
  );

  const handleStepsSubmit = useCallback(
    (payload: SurveyStatePayload) => {
      if (onSubmit) {
        onSubmit();

        return;
      }

      if (payload.other && Array.isArray(payload[step])) {
        onSetState([...(payload[step] as string), payload.other]);
      }

      onSetState(payload[step] as string);

      onNextStep?.();
    },
    [onNextStep, onSetState, onSubmit, step],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleStepsSubmit)(event_);
    },
    [handleSubmit, handleStepsSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{question}</div>

      <div className={styles['select']}>
        {isCheckbox
          ? stepCategories.map((category) => {
              return (
                <Checkbox
                  control={control}
                  name={step}
                  key={category}
                  label={category}
                  onChange={handleFieldChange(category)}
                />
              );
            })
          : stepCategories.map((category) => {
              return (
                <Radio
                  control={control}
                  name={step}
                  key={category}
                  label={category}
                  onChange={handleFieldChange(category)}
                />
              );
            })}
        {categoriesValue.includes(OTHER_CATEGORY) && (
          <Input
            control={control}
            errors={errors}
            name="other"
            placeholder="Text"
            maxLength={SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
          />
        )}
      </div>

      <Button
        type="submit"
        label="Continue"
        style="secondary"
        isDisabled={!isValid}
      />

      {onPreviousStep && (
        <Button label="Back" style="outlined" onClick={onPreviousStep} />
      )}
    </form>
  );
};

export { Step };
