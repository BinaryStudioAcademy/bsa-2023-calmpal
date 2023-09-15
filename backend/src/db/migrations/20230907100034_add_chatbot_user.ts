import { type Knex } from 'knex';

const TABLE_NAME = {
  USERS: 'users',
  USER_DETAILS: 'user_details',
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

const CHATBOT_USER_DETAILS = {
  full_name: 'Chatbot',
  is_survey_completed: false,
};

const CHATBOT_ROLE_KEY = 'chatbot';

type UserRole = {
  id: number;
};

async function up(knex: Knex): Promise<void> {
  const chatbotRole = await knex(TABLE_NAME.USER_ROLES)
    .select<UserRole>(COLUMN_NAME.ID)
    .where(COLUMN_NAME.KEY, CHATBOT_ROLE_KEY)
    .first();

  await knex(TABLE_NAME.USERS).insert({
    ...CHATBOT_USER,
    role_id: chatbotRole?.id,
  });

  const chatbot = await knex(TABLE_NAME.USERS)
    .select<UserRole>(COLUMN_NAME.ID)
    .where({ email: CHATBOT_USER.email })
    .first();

  await knex(TABLE_NAME.USER_DETAILS).insert({
    ...CHATBOT_USER_DETAILS,
    user_id: chatbot?.id,
  });
}

async function down(knex: Knex): Promise<void> {
  const userToDelete = await knex(TABLE_NAME.USERS)
    .select<UserRole>(COLUMN_NAME.ID)
    .where({ email: CHATBOT_USER.email })
    .first();
  await knex(TABLE_NAME.USERS)
    .where({ id: userToDelete?.id })
    .del();
}

export { down, up };
