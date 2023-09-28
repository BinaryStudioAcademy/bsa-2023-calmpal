import { Button, Checkbox, Input, Radio } from '#libs/components/components.js';
import { FIRST_INDEX, LAST_INDEX } from '#libs/constants/constants.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  type HandleFieldChangeType,
  type StepsType,
} from '#packages/survey/libs/types/types.js';
import {
  stepInputValidationSchema,
  SurveyValidationRule,
} from '#packages/survey/survey.js';
import { TEXTAREA_ROWS_COUNT } from '#pages/surveys/libs/constants/constants.js';

import styles from './styles.module.scss';

type SurveyState = {
  preferences?: string[];
  feelings?: string[];
  goals?: string[];
  worries?: string[];
  meditationExperience?: string;
  journalingExperience?: string;
  other?: string;
};

const hasOther = (category: string[]): boolean => {
  return category.includes('Other');
};

const getOtherDefault = (categories: string[]): string => {
  return hasOther(categories) && categories.at(LAST_INDEX) !== 'Other'
    ? (categories.at(LAST_INDEX) as string)
    : '';
};

const getOthersCategories = (
  categories: string[],
  payload: string[],
): string[] => {
  return payload.filter((category) => {
    return !categories.includes(category);
  });
};

const onFieldChange = ({
  category,
  currentCategories,
  stateValue,
  defaultCategories,
  isOther = false,
  categoryChange,
  stateChange,
}: HandleFieldChangeType): void => {
  const otherCategories = getOthersCategories(
    defaultCategories,
    currentCategories,
  );
  if (isOther && otherCategories.length > FIRST_INDEX) {
    otherCategories.push(category);
    categoryChange(
      currentCategories.filter((option) => {
        return !otherCategories.includes(option);
      }),
    );
    stateChange(
      stateValue.filter((option) => {
        return !otherCategories.includes(option);
      }),
    );

    return;
  }

  if (currentCategories.includes(category)) {
    categoryChange(
      currentCategories.filter((option) => {
        return option !== category;
      }),
    );
    stateChange(
      stateValue.filter((option) => {
        return option !== category;
      }),
    );

    return;
  }

  stateChange([...stateValue, category]);
  categoryChange([...currentCategories, category]);
};

type Properties = {
  stepCategories: string[];
  question: string;
  step: StepsType;
  type: 'checkbox' | 'radio';
  onSubmit?: () => void;
  onNextStep?: () => void;
  onPreviousStep?: () => void;
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

  const defaultValues: SurveyState = {
    [step]: currentStep,
    other: Array.isArray(currentStep) ? getOtherDefault(currentStep) : '',
  };

  const { control, errors, isValid, handleSubmit } = useAppForm<SurveyState>({
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
          onFieldChange({
            category,
            currentCategories: categoriesValue as string[],
            stateValue: currentStep,
            defaultCategories: stepCategories,
            isOther: category === 'Other',
            categoryChange: onCategoryChange,
            stateChange: onSetState,
          });

          return;
        }

        onSetState(category);
        onCategoryChange(category);
      };
    },
    [
      categoriesValue,
      currentStep,
      isCheckbox,
      onCategoryChange,
      onSetState,
      stepCategories,
    ],
  );

  const handleStepsSubmit = useCallback(
    (payload: SurveyState) => {
      if (onSubmit) {
        onSubmit();

        return;
      }

      if (payload.other && Array.isArray(payload[step])) {
        const categories: string[] = payload[step] as string[];
        categories.push(payload.other);
        onSetState(categories);
      } else {
        onSetState(payload[step] as string);
      }

      onNextStep && onNextStep();
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
                  isChecked={(categoriesValue as string[]).includes(category)}
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
                  isChecked={currentStep === category}
                />
              );
            })}
        {hasOther([...currentStep]) && (
          <Input
            control={control}
            errors={errors}
            name="other"
            placeholder="Text"
            maxLength={SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
            defaultValue={getOtherDefault([...currentStep])}
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
