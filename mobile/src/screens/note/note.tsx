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
import { debounce, sanitizeInput } from '#libs/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
} from '#libs/hooks/hooks';
import { type JournalNavigationParameterList } from '#libs/types/types';
import { type JournalEntryCreateRequestDto } from '#packages/journal/journal';
import { actions as journalActions } from '#slices/journal/journal';

import {
  DEFAULT_NOTE_PAYLOAD,
  NOTE_SANITIZER_OPTIONS,
  SAVE_NOTE_TIMEOUT,
  TEXT_PLACEHOLDER,
} from './libs/constants';
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
      selectedJournalEntry: journal.selectedJournalEntry,
    };
  });

  const { control, watch, isDirty } = useAppForm({
    defaultValues: selectedJournalEntry
      ? {
          title: selectedJournalEntry.title || DEFAULT_NOTE_PAYLOAD.title,
          text: selectedJournalEntry.text || DEFAULT_NOTE_PAYLOAD.text,
        }
      : DEFAULT_NOTE_PAYLOAD,
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
                  value={sanitizeInput(titleValue, NOTE_SANITIZER_OPTIONS)}
                  style={styles.title}
                />
              );
            }}
            name="title"
            defaultValue={DEFAULT_NOTE_PAYLOAD.title}
          />

          <Controller
            control={control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  placeholder={TEXT_PLACEHOLDER}
                  onChangeText={field.onChange}
                  value={sanitizeInput(textValue, NOTE_SANITIZER_OPTIONS)}
                  multiline
                  style={styles.noteText}
                />
              );
            }}
            name="text"
            defaultValue={TEXT_PLACEHOLDER}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export { Note };
