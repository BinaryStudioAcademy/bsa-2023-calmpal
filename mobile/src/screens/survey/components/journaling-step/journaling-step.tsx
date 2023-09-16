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
  JOURNALING_EXPERIENCE_CATEGORIES,
  TEXTAREA_ROWS_COUNT,
} from '#screens/survey/libs/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

type JournalingStepProperties = {
  route: RouteProp<
    SurveyNavigationParameterList,
    typeof SurveyScreenName.JOURNALING_EXPERIENCE
  >;
};

type JournalingStepInitialParameters = {
  handleSubmitSurvey: (payload: string[]) => void;
};

const JournalingStep: React.FC<JournalingStepProperties> = ({ route }) => {
  const { handleSubmitSurvey } =
    route.params as JournalingStepInitialParameters;
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
      handleSubmitSurvey(getSurveyCategories(payload));
    },
    [handleSubmitSurvey],
  );

  const handleFormSubmit = useCallback((): void => {
    void handleSubmit(handleSurveySubmit)();
  }, [handleSubmit, handleSurveySubmit]);

  const handleBack = (): void => {
    navigation.navigate(SurveyScreenName.MEDITATION_EXPERIENCE);
  };

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>
        What&apos;s your experience with journaling?
      </Text>
      {JOURNALING_EXPERIENCE_CATEGORIES.map((category) => {
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
        onPress={handleFormSubmit}
        isDisabled={!isValid}
        type="outlined"
      />
      <Button label="Go back" onPress={handleBack} type="solid" />
    </ScrollView>
  );
};

export { JournalingStep };
