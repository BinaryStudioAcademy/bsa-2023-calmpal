import { type Knex } from 'knex';

import {
  createTableWithCommonColumns,
  dropTableIfExists,
} from '#db/helpers/migration-helper.js';
import {
  ChatMessagesTableColumns,
  CommonTableColumns,
  TableNames,
} from '#libs/enums/enums.js';

const up = createTableWithCommonColumns(
  TableNames.CHAT_MESSAGES,
  (table: Knex.CreateTableBuilder) => {
    table.string(ChatMessagesTableColumns.NAME).notNullable();
    table
      .integer(ChatMessagesTableColumns.CHAT_ID)
      .notNullable()
      .references(CommonTableColumns.ID)
      .inTable(TableNames.CHATS);
    table
      .integer(ChatMessagesTableColumns.SENDER_ID)
      .notNullable()
      .references(CommonTableColumns.ID)
      .inTable(TableNames.USERS);
    table.text(ChatMessagesTableColumns.MESSAGE).notNullable();
  },
);

const down = dropTableIfExists(TableNames.CHAT_MESSAGES);

export { down, up };
