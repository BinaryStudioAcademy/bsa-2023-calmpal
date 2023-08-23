import React, { useState } from 'react';

import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from '#libs/components/components';

const PreferencesStep = (): JSX.Element => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [otherText, setOtherText] = useState<string>('');
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);

  const handleItemSelected = (item: string): void => {
    if (item === 'Other') {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
    toggleItemSelected(item);
  };

  const toggleItemSelected = (item: string): void => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((index) => index !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleContinue = (): void => {
    if (selectedItems.includes('Other') && otherText.trim() === '') {
      return;
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Select items:</Text>
      <TouchableOpacity
        onPress={(): void => {
          handleItemSelected('Item 1');
        }}
      >
        <Text>Item 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(): void => {
          handleItemSelected('Item 2');
        }}
      >
        <Text>Item 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={(): void => {
          handleItemSelected('Other');
        }}
      >
        <Text>Other</Text>
      </TouchableOpacity>

      {isOtherSelected && (
        <TextInput
          placeholder="Enter details"
          maxLength={1000}
          value={otherText}
          onChangeText={(text): void => {
            setOtherText(text);
          }}
        />
      )}

      <Button label="Continue" onPress={handleContinue} />
    </View>
  );
};

export { PreferencesStep };
