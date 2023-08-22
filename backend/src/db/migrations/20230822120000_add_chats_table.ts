import { type Knex } from 'knex';

import {
  createTableWithCommonColumns,
  dropTableIfExists,
} from '#db/helpers/migration-helper.js';

const TABLE_NAME = 'chats';

const ColumnName = {
  NAME: 'name',
};

const up = createTableWithCommonColumns(
  TABLE_NAME,
  (table: Knex.CreateTableBuilder) => {
    table.string(ColumnName.NAME).notNullable();
  },
);

const down = dropTableIfExists(TABLE_NAME);

export { down, up };
