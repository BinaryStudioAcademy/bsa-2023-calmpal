import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
} from '#packages/journal/journal.js';

import { name as sliceName } from './journal.slice.js';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.createJournalEntry(payload);
});

const getAllJournalEntries = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (_, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllJournalEntries();
});

const deleteJournal = createAsyncThunk<
  JournalEntryGetAllItemResponseDto[],
  number,
  AsyncThunkConfig
>(`${sliceName}/delete-journal-entry`, async (id, { extra, getState }) => {
  const { journalApi } = extra;
  await journalApi.deleteJournalEntry(id);
  const {
    journal: { allJournalEntries },
  } = getState();

  return allJournalEntries.filter((journal) => {
    return journal.id !== id;
  });
});

export { createJournalEntry, deleteJournal, getAllJournalEntries };
