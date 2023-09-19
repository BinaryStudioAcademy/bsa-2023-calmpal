import { type RouteProp } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { Button, Input, ScrollView, Text } from '#libs/components/components';
import { SurveyScreenName } from '#libs/enums/enums';
import {
  useAppForm,
  useCallback,
  useFormController,
  useNavigation,
} from '#libs/hooks/hooks';
import { type SurveyNavigationParameterList } from '#libs/types/types';
import {
  getSurveyCategories,
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  MEDITATION_EXPERIENCE_CATEGORIES,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type MeditationStepProperties = {
  route: RouteProp<
    SurveyNavigationParameterList,
    typeof SurveyScreenName.MEDITATION_EXPERIENCE
  >;
};

type MeditationStepInitialParameters = {
  setMeditationSurvey: (payload: string[]) => void;
};

const MeditationStep: React.FC<MeditationStepProperties> = ({ route }) => {
  const { setMeditationSurvey } =
    route.params as MeditationStepInitialParameters;
  const navigation =
    useNavigation<NativeStackNavigationProp<SurveyNavigationParameterList>>();

  const { control, errors, isValid, handleSubmit } = useAppForm<SurveyInputDto>(
    {
      defaultValues: DEFAULT_SURVEY_PAYLOAD,
      validationSchema: surveyInputValidationSchema,
    },
  );
  const {
    field: { onChange: onCategoryChange, value: categoriesValue },
  } = useFormController({
    name: 'preferences',
    control,
  });
  const hasOther = categoriesValue.includes('Other');
  const handleFieldChange = useCallback(
    (option: string) => {
      if (categoriesValue.includes(option)) {
        onCategoryChange(
          categoriesValue.filter((category) => {
            return category !== option;
          }),
        );

        return;
      }

      onCategoryChange([...categoriesValue, option]);
    },
    [categoriesValue, onCategoryChange],
  );

  const handleSurveySubmit = useCallback(
    (payload: SurveyInputDto) => {
      setMeditationSurvey(getSurveyCategories(payload));
    },
    [setMeditationSurvey],
  );

  const handleContinue = (): void => {
    navigation.navigate(SurveyScreenName.JOURNALING_EXPERIENCE);
    void handleSubmit(handleSurveySubmit)();
  };

  const handleBack = (): void => {
    navigation.navigate(SurveyScreenName.WORRIES);
  };

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>
        What&apos;s your experience with meditation?
      </Text>
      {MEDITATION_EXPERIENCE_CATEGORIES.map((category) => {
        return (
          <SurveyCategory
            key={category}
            onChange={handleFieldChange}
            label={category}
          />
        );
      })}
      {hasOther && (
        <Input
          control={control}
          errors={errors}
          name="other"
          placeholder="Enter your preferences"
          rowsCount={TEXTAREA_ROWS_COUNT}
        />
      )}
      <Button
        label="Continue"
        onPress={handleContinue}
        isDisabled={!isValid}
        type="outlined"
      />
      <Button label="Go back" onPress={handleBack} type="solid" />
    </ScrollView>
  );
};
export { MeditationStep };
