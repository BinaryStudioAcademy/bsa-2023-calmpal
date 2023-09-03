import React from 'react';

import SendIcon from '#assets/img/icons/send.svg';
import { Pressable, TextInput, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useFormController } from '#libs/hooks/hooks';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '#libs/types/types';

import { styles } from './styles';

type Properties<T extends FormFieldValues> = {
  name: FormFieldPath<T>;
  control: FormControl<T, null>;
  scrollViewToEnd: () => void;
  onSend: () => void;
};

const ChatInput = <T extends FormFieldValues>({
  name,
  control,
  scrollViewToEnd,
  onSend,
}: Properties<T>): JSX.Element => {
  const {
    field: { value, onChange },
  } = useFormController({ name, control });
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
          <SendIcon style={styles.button} color={AppColor.BLUE_300} />
        </Pressable>
      )}
    </View>
  );
};

export { ChatInput };
