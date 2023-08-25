import React, { useState } from 'react';

import {
  Button,
  ScrollView,
  SurveyCategory,
  TextInput,
} from '#libs/components/components';

import { styles } from './styles';

const categoryNames = [
  'Get emotional support',
  'Reduce stress or anxiety',
  'Improve sleep quality',
  'Get over with depression',
  'Improve focus',
  'Other',
];
const EMPTY_ARRAY_LENGTH = 0;

const PreferencesStep = (): JSX.Element => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [otherText, setOtherText] = useState<string>('');
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);

  const handleCategorySelect = (category: string): void => {
    if (category === 'Other') {
      setIsOtherSelected(false);
    }

    setSelectedCategories((previousSelected) => {
      return previousSelected.includes(category)
        ? previousSelected.filter((item) => item !== category)
        : [...previousSelected, category];
    });
    toggleCategorySelected(category);
  };

  const toggleCategorySelected = (category: string): void => {
    if (selectedItems.includes(category)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== category),
      );
    } else {
      setSelectedItems([...selectedItems, category]);
      if (category === 'Other') {
        setIsOtherSelected(true);
      }
    }
  };

  const handleContinue = (): void => {
    if (selectedItems.includes('Other') && otherText.trim() === '') {
      return;
    }

    if (selectedCategories.length === EMPTY_ARRAY_LENGTH) {
      return;
    }
  };

  return (
    <ScrollView
      style={styles.surveyContainer}
      showsVerticalScrollIndicator={false}
    >
      {categoryNames.map((category) => (
        <SurveyCategory
          key={category}
          category={category}
          selected={selectedCategories.includes(category)}
          onSelect={(): void => {
            handleCategorySelect(category);
          }}
        />
      ))}

      {isOtherSelected && (
        <TextInput
          placeholder="Enter your preferences"
          placeholderTextColor={styles.placeholder.color}
          maxLength={1000}
          value={otherText}
          multiline={true}
          numberOfLines={2}
          onChangeText={(text): void => {
            setOtherText(text);
          }}
          style={styles.otherTextInput}
        />
      )}

      <Button label="Continue" onPress={handleContinue} isSurvey />
    </ScrollView>
  );
};

export { PreferencesStep };
