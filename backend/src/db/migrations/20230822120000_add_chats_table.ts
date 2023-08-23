import { type Knex } from 'knex';

import {
  createTableWithCommonColumns,
  dropTableIfExists,
} from '#db/helpers/migration-helper.js';
import { ChatsTableColumns, TableNames } from '#libs/enums/enums.js';

const up = createTableWithCommonColumns(
  TableNames.CHATS,
  (table: Knex.CreateTableBuilder) => {
    table.string(ChatsTableColumns.NAME).notNullable();
  },
);

const down = dropTableIfExists(TableNames.CHATS);

export { down, up };
