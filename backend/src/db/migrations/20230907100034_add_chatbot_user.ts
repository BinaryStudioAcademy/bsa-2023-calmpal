import { type Knex } from 'knex';

const TABLE_NAME = {
  USERS: 'users',
  USER_ROLES: 'user_roles',
} as const;

const COLUMN_NAME = {
  ID: 'id',
  KEY: 'key',
} as const;

const CHATBOT_USER = {
  email: 'chatbot@example.com',
  password_hash: 'password_hash',
  password_salt: 'password_salt',
};

const CHATBOT_ROLE_KEY = 'chatbot';

type RecordId = {
  id: number;
};

async function up(knex: Knex): Promise<void> {
  const chatbotRole = await knex(TABLE_NAME.USER_ROLES)
    .select<RecordId>(COLUMN_NAME.ID)
    .where(COLUMN_NAME.KEY, CHATBOT_ROLE_KEY)
    .first();

  await knex(TABLE_NAME.USERS).insert({
    ...CHATBOT_USER,
    role_id: chatbotRole?.id,
  });
}

async function down(knex: Knex): Promise<void> {
  const userToDelete = await knex(TABLE_NAME.USERS)
    .select<RecordId>(COLUMN_NAME.ID)
    .where({ email: CHATBOT_USER.email })
    .first();
  await knex(TABLE_NAME.USERS)
    .where({ id: userToDelete?.id })
    .del();
}

export { down, up };
