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
  passwordHash: 'password_hash',
  passwordSalt: 'password_salt',
};

const CHATBOT_USER_DETAILS = {
  fullName: 'Chatbot',
  isSurveyCompleted: false,
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
    roleId: (chatbotRole as UserRole).id,
  });

  const chatbot = await knex(TABLE_NAME.USERS)
    .select<UserRole>(COLUMN_NAME.ID)
    .where({ email: CHATBOT_USER.email })
    .first();

  await knex(TABLE_NAME.USER_DETAILS).insert({
    ...CHATBOT_USER_DETAILS,
    userId: (chatbot as UserRole).id,
  });
}

async function down(knex: Knex): Promise<void> {
  const userToDelete = await knex(TABLE_NAME.USERS)
    .select<UserRole>(COLUMN_NAME.ID)
    .where({ email: CHATBOT_USER.email })
    .first();
  await knex(TABLE_NAME.USERS)
    .where({ id: (userToDelete as UserRole).id })
    .del();
}

export { down, up };
