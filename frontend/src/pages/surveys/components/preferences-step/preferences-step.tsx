import { type ControllerRenderProps } from 'react-hook-form';

import {
  Button,
  SurveyCategory,
  Textarea,
} from '#libs/components/components.js';
import {
  useAppForm,
  useCallback,
  useFormController,
} from '#libs/hooks/hooks.js';
import {
  type SurveyInputDto,
  surveyInputValidationSchema,
  SurveyTextareaOptions,
} from '#packages/survey/survey.js';
import { DEFAULT_SURVEY_PAYLOAD } from '#pages/surveys/libs/constants.js';

import styles from './styles.module.scss';

const textareaMaxLength = 1000;

type Properties = {
  onSubmit: (options: string[]) => void;
};

const PreferencesStep: React.FC<Properties> = ({ onSubmit }) => {
  const { watch, control, errors, isValid, handleSubmit } =
    useAppForm<SurveyInputDto>({
      defaultValues: DEFAULT_SURVEY_PAYLOAD,
      validationSchema: surveyInputValidationSchema,
    });
  const { field: optionsField } = useFormController({
    name: 'option',
    control,
  });

  const activeOptions = watch('option');
  const hasOther = activeOptions.includes('Other');

  const options: string[] = [
    'Get emotional support',
    'Reduce stress or anxiety',
    'Improve sleep quality',
    'Get over with depression',
    'Improve focus',
    SurveyTextareaOptions.OTHER,
  ];

  const handleOnSubmit = useCallback(
    (payload: SurveyInputDto) => {
      let options = payload.option;
      options = [
        ...new Set(
          options.map((option) =>
            option === SurveyTextareaOptions.OTHER ? payload.textarea : option,
          ),
        ),
      ];

      onSubmit(options);
    },
    [onSubmit],
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(handleOnSubmit)(event_);
    },
    [handleSubmit, handleOnSubmit],
  );

  return (
    <form className={styles['form']} onSubmit={handleFormSubmit}>
      <div className={styles['title']}>What can we help you with?</div>

      <div className={styles['select']}>
        {options.map((option, index) => (
          <SurveyCategory
            key={index}
            field={
              optionsField as ControllerRenderProps<
                SurveyInputDto,
                'option' | 'textarea' | `option.${number}`
              >
            }
            label={option}
          />
        ))}
        {hasOther && (
          <Textarea
            control={control}
            errors={errors}
            name="textarea"
            placeholder="Text"
            maxLength={textareaMaxLength}
          />
        )}
      </div>

      <Button
        type={'submit'}
        label={'Continue'}
        style={'secondary'}
        disabled={!isValid}
      />
    </form>
  );
};

export { PreferencesStep };
