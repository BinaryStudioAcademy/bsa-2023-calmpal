import { Button, Checkbox, Input } from '#libs/components/components.js';
import { FIRST_INDEX } from '#libs/constants/index.constant.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import { type PreferenceInputDto } from '#packages/survey/libs/types/types.js';
import {
  preferenceStepInputValidationSchema,
  SurveyValidationRule,
} from '#packages/survey/survey.js';
import {
  PREFERENCES_CATEGORIES,
  PREFERENCES_QUESTION,
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
};

const PreferencesStep: React.FC<Properties> = ({ handleNextStep }) => {
  const { preferences, setPreferences } = useSurvey();

  const { control, errors, isValid, handleSubmit } =
    useAppForm<PreferenceInputDto>({
      defaultValues: {
        preferences: preferences,
      },
      validationSchema: preferenceStepInputValidationSchema,
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
        const otherCategories = getOthersCategories(
          PREFERENCES_CATEGORIES,
          categoriesValue,
        );
        if (category === 'Other' && otherCategories.length > FIRST_INDEX) {
          otherCategories.push(category);
          onCategoryChange(
            categoriesValue.filter((option) => {
              return !otherCategories.includes(option);
            }),
          );
          setPreferences(
            preferences.filter((option) => {
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
          setPreferences(
            preferences.filter((option) => {
              return option !== category;
            }),
          );

          return;
        }

        setPreferences([...preferences, category]);
        onCategoryChange([...categoriesValue, category]);
      };
    },
    [categoriesValue, onCategoryChange, preferences, setPreferences],
  );

  const handlePreferencesSubmit = useCallback(
    (payload: PreferenceInputDto) => {
      if (payload.other) {
        payload.preferences.push(payload.other);
        setPreferences(payload.preferences);
      } else {
        setPreferences(payload.preferences);
      }

      handleNextStep();
    },
    [handleNextStep, setPreferences],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handlePreferencesSubmit)(event_);
    },
    [handleSubmit, handlePreferencesSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>{PREFERENCES_QUESTION}</div>

      <div className={styles['select']}>
        {PREFERENCES_CATEGORIES.map((category) => {
          return (
            <Checkbox
              groupName="preferences"
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
