import { type Knex } from 'knex';

const TABLE_NAME = 'chat_messages';

type ChatMessage = {
  id: number;
  name: string;
};

const NAME_INDEX_INCREMENT_NUMBER = 1;
const NAME_COLUMN_DEFAULT_VALUE = 'Message';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.NAME);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(ColumnName.NAME);
  });

  const rows: ChatMessage[] = await knex
    .select(ColumnName.ID, ColumnName.NAME)
    .from(TABLE_NAME);

  const updates = rows.map((item, index) => {
    return knex
      .table(TABLE_NAME)
      .where(ColumnName.ID, item.id)
      .update({
        name: `${NAME_COLUMN_DEFAULT_VALUE} #${
          index + NAME_INDEX_INCREMENT_NUMBER
        }`,
      });
  });

  await Promise.all(updates);

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(ColumnName.NAME).unique().notNullable().alter();
  });
}

export { down, up };
