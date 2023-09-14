import { type Knex } from 'knex';

type Chat = {
  id: number;
  name: string;
};

const NAME_INDEX_INCREMENT_NUMBER = 1;

const TABLE_NAME = 'chats';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropUnique([ColumnName.NAME]);
  });
}

async function down(knex: Knex): Promise<void> {
  const nonUniqueItemsSubquery = knex
    .select(ColumnName.NAME)
    .from<Chat>(TABLE_NAME)
    .groupBy(ColumnName.NAME)
    .havingRaw(`COUNT(${ColumnName.NAME}) > 1`);

  const nonUniqueItems = await knex<Chat>(TABLE_NAME)
    .select(ColumnName.ID, ColumnName.NAME)
    .whereIn(ColumnName.NAME, nonUniqueItemsSubquery);

  const updates = nonUniqueItems.map((item, index) => {
    return knex
      .table(TABLE_NAME)
      .where(ColumnName.ID, item.id)
      .update({
        name: `${item.name} #${index + NAME_INDEX_INCREMENT_NUMBER}`,
      });
  });

  await Promise.all(updates);

  await knex.schema.table(TABLE_NAME, (table) => {
    table.unique([ColumnName.NAME]);
  });
}

export { down, up };
