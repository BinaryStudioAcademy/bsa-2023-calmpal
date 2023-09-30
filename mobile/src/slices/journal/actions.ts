import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdatePayloadDto,
} from '#packages/journal/journal';
import { actions as journalActions } from '#slices/journal/journal';

import { name as sliceName } from './journal.slice';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.create(payload);
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
>(
  `${sliceName}/delete-journal-entry`,
  async (id, { extra, getState, dispatch }) => {
    const { journalApi } = extra;
    await journalApi.deleteJournalEntry(id);
    const {
      journal: { allJournalEntries, selectedJournalEntry },
    } = getState();

    if (selectedJournalEntry?.id === id) {
      dispatch(journalActions.setSelectedJournalEntry(null));
    }

    return allJournalEntries.filter((journal) => {
      return journal.id !== id;
    });
  },
);

const updateJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryUpdatePayloadDto,
  AsyncThunkConfig
>(`${sliceName}/update-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.update(payload);
});

export {
  createJournalEntry,
  deleteJournal,
  getAllJournalEntries,
  updateJournalEntry,
};
