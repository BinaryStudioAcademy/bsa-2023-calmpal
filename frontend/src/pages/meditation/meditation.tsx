import { MeditationList, MeditationSidebar } from './components/components.js';

const Meditation: React.FC = () => {
  return (
    <>
      <MeditationSidebar />
      <MeditationList />
    </>
  );
};
export { Meditation };
