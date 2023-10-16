import { createAsyncThunk } from '@reduxjs/toolkit';

import { EMPTY_ARRAY_LENGTH } from '~/libs/constants/constants.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { NotificationType } from '~/libs/packages/notification/notification.js';
import { type AsyncThunkConfig } from '~/libs/types/types.js';
import {
  type JournalEntryCreateRequestDto,
  type JournalEntryGetAllItemResponseDto,
  type JournalEntryGetAllResponseDto,
  type JournalEntryUpdatePayloadDto,
} from '~/packages/journal/journal.js';
import { actions as appActions } from '~/slices/app/app.js';

import { actions as journalActions } from './journal.js';
import { name as sliceName } from './journal.slice.js';

const createJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryCreateRequestDto,
  AsyncThunkConfig
>(`${sliceName}/create-journal-entry`, async (payload, { extra, dispatch }) => {
  const { journalApi } = extra;
  const journalEntry = await journalApi.createEntry(payload);
  dispatch(
    appActions.navigate(
      AppRoute.JOURNAL_$ID.replace(
        ':id',
        String(journalEntry.id),
      ) as typeof AppRoute.JOURNAL_$ID,
    ),
  );
  void dispatch(
    appActions.notify({
      type: NotificationType.SUCCESS,
      message: 'New note was created.',
    }),
  );

  return journalEntry;
});

const getAllJournalEntries = createAsyncThunk<
  JournalEntryGetAllResponseDto,
  string,
  AsyncThunkConfig
>(`${sliceName}/get-all-journal-entries`, async (query, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.getAllEntries(query);
});

const updateJournalEntry = createAsyncThunk<
  JournalEntryGetAllItemResponseDto,
  JournalEntryUpdatePayloadDto,
  AsyncThunkConfig
>(`${sliceName}/update-journal-entry`, async (payload, { extra }) => {
  const { journalApi } = extra;

  return await journalApi.updateEntry(payload);
});

const deleteJournal = createAsyncThunk<
  JournalEntryGetAllItemResponseDto[],
  number,
  AsyncThunkConfig
>(
  `${sliceName}/delete-journal-entry`,
  async (id, { extra, getState, dispatch }) => {
    const { journalApi } = extra;
    await journalApi.deleteEntry(id);
    const {
      journal: { allJournalEntries, selectedJournalEntry },
    } = getState();

    const filteredJournalEntries = allJournalEntries.filter((journal) => {
      return journal.id !== id;
    });

    if (
      selectedJournalEntry?.id === id ||
      filteredJournalEntries.length === EMPTY_ARRAY_LENGTH
    ) {
      dispatch(journalActions.setSelectedJournalEntry(null));
      dispatch(appActions.navigate(AppRoute.JOURNAL));
    }

    return filteredJournalEntries;
  },
);

export {
  createJournalEntry,
  deleteJournal,
  getAllJournalEntries,
  updateJournalEntry,
};
