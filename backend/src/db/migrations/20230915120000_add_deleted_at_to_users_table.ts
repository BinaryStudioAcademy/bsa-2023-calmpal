import { type Knex } from 'knex';

const TABLE_NAME = 'users';
const COLUMN_NAME = 'deleted_at';

async function up(knex: Knex): Promise<void> {
  await knex.schema.table(TABLE_NAME, (table) => {
    table.dateTime(COLUMN_NAME).nullable();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

export { down, up };
