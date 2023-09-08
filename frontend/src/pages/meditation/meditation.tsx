import { MeditationList } from './meditation-list/meditation-list.js';
import { MeditationSidebar } from './meditation-sidebar/meditation-sidebar.js';

const Meditation: React.FC = () => {
  return (
    <>
      <MeditationSidebar />
      <MeditationList />
    </>
  );
};
export { Meditation };
