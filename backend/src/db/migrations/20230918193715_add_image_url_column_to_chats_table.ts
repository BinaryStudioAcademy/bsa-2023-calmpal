import { type Knex } from 'knex';

const TABLE_NAME = 'chats';

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string('image_url');
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn('image_url');
  });
}

export { down, up };
