import React, { useState } from 'react';

import {
  Button,
  SurveyCategory,
  TextInput,
  View,
} from '#libs/components/components';

import { styles } from './styles';

const categoryNames = ['Category 1', 'Category 2', 'Other'];
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
    <View style={styles.surveyContainer}>
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
          placeholder="Enter category details"
          maxLength={1000}
          value={otherText}
          onChangeText={(text): void => {
            setOtherText(text);
          }}
          style={styles.otherTextInput}
        />
      )}

      <Button label="Continue" onPress={handleContinue} />
    </View>
  );
};

export { PreferencesStep };
