import { Button, Checkbox, Input } from '#libs/components/components.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  type HandleFieldChangeType,
  type OnOther,
  type PreferenceInputDto,
} from '#packages/survey/libs/types/types.js';
import {
  stepWithOtherInputValidationSchema,
  SurveyValidationRule,
} from '#packages/survey/survey.js';
import {
  PREFERENCES_CATEGORIES,
  TEXTAREA_ROWS_COUNT,
} from '#pages/surveys/libs/constants/constants.js';

import styles from '../styles.module.scss';

type Properties = {
  onNextStep: () => void;
  onSetPreferences: (preferences: string[]) => void;
  onFieldChange: (options: HandleFieldChangeType) => () => void;
  onOther: OnOther;
};

const PreferencesStep: React.FC<Properties> = ({
  onNextStep,
  onSetPreferences,
  onFieldChange,
  onOther,
}) => {
  const { getOtherDefault, hasOther } = onOther;

  const preferences = useAppSelector((state) => {
    return state.survey.preferences;
  });
  const { control, errors, isValid, handleSubmit } =
    useAppForm<PreferenceInputDto>({
      defaultValues: {
        preferences: preferences,
        other: getOtherDefault(preferences),
      },
      validationSchema: stepWithOtherInputValidationSchema,
    });
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'preferences',
    control,
  });

  const handleFieldChange = useCallback(
    (category: string) => {
      return () => {
        onFieldChange({
          category,
          currentCategories: categoriesValue,
          stateValue: preferences,
          defaultCategories: PREFERENCES_CATEGORIES,
          isOther: category === 'Other',
          categoryChange: onCategoryChange,
          stateChange: onSetPreferences,
        });
      };
    },
    [
      onFieldChange,
      categoriesValue,
      preferences,
      onCategoryChange,
      onSetPreferences,
    ],
  );

  const handlePreferencesSubmit = useCallback(
    (payload: PreferenceInputDto) => {
      if (payload.other) {
        payload.preferences.push(payload.other);
        onSetPreferences(payload.preferences);
      } else {
        onSetPreferences(payload.preferences);
      }

      onNextStep();
    },
    [onNextStep, onSetPreferences],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handlePreferencesSubmit)(event_);
    },
    [handleSubmit, handlePreferencesSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>What can we help you with?</div>

      <div className={styles['select']}>
        {PREFERENCES_CATEGORIES.map((category) => {
          return (
            <Checkbox
              control={control}
              name="preferences"
              isChecked={categoriesValue.includes(category)}
              key={category}
              label={category}
              onChange={handleFieldChange(category)}
            />
          );
        })}
        {hasOther(preferences) && (
          <Input
            control={control}
            errors={errors}
            name="other"
            placeholder="Text"
            maxLength={SurveyValidationRule.MAXIMUM_PREFERENCE_ITEM_LENGTH}
            rowsCount={TEXTAREA_ROWS_COUNT}
            defaultValue={getOtherDefault(preferences)}
          />
        )}
      </div>

      <Button
        type="submit"
        label="Continue"
        style="secondary"
        isDisabled={!isValid}
      />
    </form>
  );
};

export { PreferencesStep };
