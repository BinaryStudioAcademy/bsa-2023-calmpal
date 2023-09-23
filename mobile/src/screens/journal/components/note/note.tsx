import { type RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { Controller } from 'react-hook-form';
import { BackHandler } from 'react-native';

import {
  LinearGradient,
  ScrollView,
  TextInput,
  View,
} from '#libs/components/components';
import { debounce } from '#libs/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
} from '#libs/hooks/hooks';
import { type JournalNavigationParameterList } from '#libs/types/types';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
} from '#packages/journal/journal';
import {
  DEFAULT_NOTE_PAYLOAD,
  SAVE_NOTE_TIMEOUT,
  TEXT_PLACEHOLDER,
  //   NOTE_SANITIZER_OPTIONS,
} from '#screens/journal/libs/constants';
import { actions as journalActions } from '#slices/journal/journal';

import { styles } from './styles';

type NoteScreenRouteProperty = RouteProp<
  JournalNavigationParameterList,
  'Note'
>;

const Note: React.FC = () => {
  const route = useRoute<NoteScreenRouteProperty>();
  const id = route.params.id;

  const dispatch = useAppDispatch();

  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry:
        journal.selectedJournalEntry as JournalEntryGetAllItemResponseDto,
    };
  });

  const { control, watch, isDirty } = useAppForm({
    defaultValues: {
      title: selectedJournalEntry.title,
      text: selectedJournalEntry.text,
    },
    mode: 'onChange',
  });

  const { title: titleValue, text: textValue } = watch();

  const handleSaveNote = useCallback(
    (data: JournalEntryCreateRequestDto) => {
      void dispatch(
        journalActions.updateJournalEntry({
          id: Number(id),
          title: data.title || DEFAULT_NOTE_PAYLOAD.title,
          text: data.text,
        }),
      );
    },
    [id, dispatch],
  );

  const handleSaveNoteWithDebounce = useMemo(() => {
    return debounce(handleSaveNote, SAVE_NOTE_TIMEOUT);
  }, [handleSaveNote]);

  useEffect(() => {
    if (id && isDirty) {
      handleSaveNoteWithDebounce({
        title: titleValue,
        text: textValue,
      });
    }
  }, [titleValue, textValue, handleSaveNoteWithDebounce, id, isDirty]);

  useEffect(() => {
    const handleBeforeBackNavigation = (): boolean => {
      handleSaveNote({
        title: titleValue,
        text: textValue,
      });

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBeforeBackNavigation,
    );

    return () => {
      backHandler.remove();
    };
  }, [id, titleValue, textValue, handleSaveNote]);

  return (
    <LinearGradient>
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Controller
            control={control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  placeholder={DEFAULT_NOTE_PAYLOAD.title}
                  onChangeText={field.onChange}
                  value={field.value}
                  style={styles.title}
                />
              );
            }}
            name="title"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  placeholder={TEXT_PLACEHOLDER}
                  onChangeText={field.onChange}
                  value={textValue}
                  multiline
                  style={styles.noteText}
                />
              );
            }}
            name="text"
            defaultValue=""
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export { Note };
