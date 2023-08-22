import { type Knex } from 'knex';

import {
  createTableWithCommonColumns,
  dropTableIfExists,
} from '#db/helpers/migration-helper.js';

const TABLE_NAME = 'chat_messages';

const ColumnName = {
  NAME: 'name',
  CHAT_ID: 'chat_id',
  SENDER_ID: 'sender_id',
  MESSAGE: 'message',
};

const up = createTableWithCommonColumns(
  TABLE_NAME,
  (table: Knex.CreateTableBuilder) => {
    table.string(ColumnName.NAME).notNullable();
    table
      .integer(ColumnName.CHAT_ID)
      .notNullable()
      .references('id')
      .inTable('chats');
    table
      .integer(ColumnName.SENDER_ID)
      .notNullable()
      .references('id')
      .inTable('users');
    table.text(ColumnName.MESSAGE).notNullable();
  },
);

const down = dropTableIfExists(TABLE_NAME);

export { down, up };
