import { Navigate } from '#libs/components/components.js';
// import { UserProfileInfo } from './components/components.js';
import { AppRoute } from '#libs/enums/enums.js';

const Dashboard: React.FC = () => {
  // return <UserProfileInfo />;
  return <Navigate to={AppRoute.MEDITATION} />;
};

export { Dashboard };
