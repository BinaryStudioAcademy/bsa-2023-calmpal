import { logger } from '#libs/packages/logger/logger.js';

import { JournalEntryController } from './journal-entry.controller.js';
import { JournalEntryModel } from './journal-entry.model.js';
import { JournalEntryRepository } from './journal-entry.repository.js';
import { JournalEntryService } from './journal-entry.service.js';

const journalEntryRepository = new JournalEntryRepository(JournalEntryModel);
const journalEntryService = new JournalEntryService(journalEntryRepository);
const journalEntryController = new JournalEntryController(
  logger,
  journalEntryService,
);
export { JournalEntryModel } from './journal-entry.model.js';
export { JournalEntryRepository } from './journal-entry.repository.js';
export { JournalError } from './libs/exceptions/exceptions.js';
export { journalEntryController };
