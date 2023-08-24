import { type Knex } from 'knex';

const TABLE_NAME = 'meditation_entries';

const ColumnName = {
  ID: 'id',
  TOPIC_ID: 'topic_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const ForeignTable = {
  MEDITATION_TOPICS: 'meditation_topics',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.TOPIC_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(ForeignTable.MEDITATION_TOPICS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
