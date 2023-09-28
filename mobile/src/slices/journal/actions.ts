import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '#libs/types/types';
import {
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
} from '#packages/journal/journal';
import { actions as journalActions } from '#slices/journal/journal';

import { name as sliceName } from './journal.slice';

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

export { deleteJournal, getAllJournalEntries };
