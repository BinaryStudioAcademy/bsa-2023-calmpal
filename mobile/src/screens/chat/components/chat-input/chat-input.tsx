import React from 'react';
import { Keyboard } from 'react-native';

import SendIcon from '~/assets/img/icons/send.svg';
import { Pressable, TextInput, View } from '~/libs/components/components';
import { AppColor } from '~/libs/enums/enums';
import { useEffect, useFormController, useRef } from '~/libs/hooks/hooks';
import {
  type FormControl,
  type FormFieldPath,
  type FormFieldValues,
} from '~/libs/types/types';

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

  const inputReference = useRef<TextInput | null>(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        inputReference.current?.blur();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputReference}
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
