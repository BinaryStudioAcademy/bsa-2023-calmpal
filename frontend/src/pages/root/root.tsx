import { useAppSelector } from '#libs/hooks/hooks.js';

const Root: React.FC = () => {
  const { users, dataStatus } = useAppSelector(({ users }) => ({
    users: users.users,
    dataStatus: users.dataStatus,
  }));

  return (
    <>
      <h2>Users:</h2>
      <h3>Status: {dataStatus}</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </>
  );
};

export { Root };
