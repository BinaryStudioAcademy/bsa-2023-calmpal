import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppRoute } from '#libs/enums/enums.js';
import { type AsyncThunkConfig } from '#libs/types/types.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdateRequestDto,
} from '#packages/journal/journal.js';
import { actions as appActions } from '#slices/app/app.js';

import { name as sliceName } from './journal.slice.js';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra, dispatch }) => {
  const { journalApi } = extra;
  const journalEntry = await journalApi.createJournalEntry(payload);
  dispatch(
    appActions.navigate(
      AppRoute.JOURNAL_ENTRY_$ID.replace(
        ':id',
        String(journalEntry.id),
      ) as typeof AppRoute.JOURNAL_ENTRY_$ID,
    ),
  );

  return journalEntry;
});

const getAllJournalEntries = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (_, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllJournalEntries();
});

const updateJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryUpdateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/update-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.updateJournalEntry(payload);
});
export { createJournalEntry, getAllJournalEntries, updateJournalEntry };
