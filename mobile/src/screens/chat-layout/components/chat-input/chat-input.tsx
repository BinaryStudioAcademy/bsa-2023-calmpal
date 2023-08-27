import React from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import SendIcon from '#assets/img/icons/send-button.svg';
import { Pressable, TextInput, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useFormController } from '#libs/hooks/hooks';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T, null>;
  scrollViewToEnd: () => void;
  onSend: () => void;
};

const ChatInput = <T extends FieldValues>({
  name,
  control,
  scrollViewToEnd,
  onSend,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });
  const { value, onChange } = field;
  const hasValue = Boolean(value);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        placeholderTextColor={AppColor.GRAY_300}
        value={value}
        onFocus={scrollViewToEnd}
        onChangeText={onChange}
      />
      {hasValue && (
        <Pressable onPress={onSend}>
          <SendIcon style={styles.button} />
        </Pressable>
      )}
    </View>
  );
};

export { ChatInput };
