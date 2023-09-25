import { type RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';

import {
  BackHandler,
  FormController,
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

const handleSanitizeInput = (textInput: string): string => {
  return sanitizeInput(textInput, NOTE_SANITIZER_OPTIONS);
};

const Note: React.FC = () => {
  const route = useRoute<NoteScreenRouteProperty>();
  const id = route.params.id;

  const dispatch = useAppDispatch();

  const { selectedJournalEntry } = useAppSelector(({ journal }) => {
    return {
      selectedJournalEntry: journal.selectedJournalEntry,
    };
  });

  // const { control, watch, isDirty } = useAppForm({
  //   defaultValues: selectedJournalEntry
  //     ? {
  //         title: selectedJournalEntry.title || DEFAULT_NOTE_PAYLOAD.title,
  //         text: selectedJournalEntry.text || DEFAULT_NOTE_PAYLOAD.text,
  //       }
  //     : DEFAULT_NOTE_PAYLOAD,
  //   mode: 'onChange',
  // });

  const { control, watch, isDirty } = useAppForm({
    defaultValues: selectedJournalEntry
      ? {
          title: selectedJournalEntry.title || '',
          text: selectedJournalEntry.text || '',
        }
      : {
          title: '',
          text: '',
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
          <FormController
            control={control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  placeholder="Type your title here"
                  onChangeText={field.onChange}
                  value={handleSanitizeInput(titleValue)}
                  style={styles.title}
                />
              );
            }}
            name="title"
            defaultValue={DEFAULT_NOTE_PAYLOAD.title}
          />
          <FormController
            control={control}
            render={({ field }): JSX.Element => {
              return (
                <TextInput
                  placeholder="Type your text here"
                  onChangeText={field.onChange}
                  value={handleSanitizeInput(textValue)}
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
