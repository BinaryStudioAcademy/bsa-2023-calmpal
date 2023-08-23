import { type Knex } from 'knex';

import {
  createTableWithCommonColumns,
  dropTableIfExists,
} from '#db/helpers/migration-helper.js';
import { TableNames, UserTableColumns } from '#libs/enums/enums.js';

const up = createTableWithCommonColumns(
  TableNames.USERS,
  (table: Knex.CreateTableBuilder) => {
    table.string(UserTableColumns.EMAIL).unique().notNullable();
    table.text(UserTableColumns.PASSWORD_HASH).notNullable();
    table.text(UserTableColumns.PASSWORD_SALT).notNullable();
  },
);

const down = dropTableIfExists(TableNames.USERS);

export { down, up };
