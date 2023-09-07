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
  type SurveyInputDto,
  surveyInputValidationSchema,
} from '#packages/survey/survey';
import {
  DEFAULT_SURVEY_PAYLOAD,
  TEXTAREA_ROWS_COUNT,
  WORRIES_CATEGORIES,
} from '#screens/survey/libs/constants';

import { SurveyCategory } from '../components';
import { styles } from './styles';

const WorriesStep: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SurveyNavigationParameterList>>();

  const { control, errors, isValid } = useAppForm<SurveyInputDto>({
    defaultValues: DEFAULT_SURVEY_PAYLOAD,
    validationSchema: surveyInputValidationSchema,
  });
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

  const handleContinue = (): void => {
    navigation.navigate(SurveyScreenName.MEDITATION_EXPERIENCE);
  };

  const handleBack = (): void => {
    navigation.navigate(SurveyScreenName.GOAL);
  };

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>
        What do you usually worry about most?
      </Text>
      {WORRIES_CATEGORIES.map((category) => {
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

export { WorriesStep };
