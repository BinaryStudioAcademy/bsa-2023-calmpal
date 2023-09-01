import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';

const mockedTracks = [
  {
    id: 1,
    title: 'Meditation for deep sleep',
    duration: '10 min',
    image: meditationListPlaceholder,
  },
  {
    id: 2,
    title: 'Breathing meditation',
    duration: '5 min',
    image: meditationListPlaceholder,
  },
  {
    id: 3,
    title: 'Meditation for relax',
    duration: '15 min',
    image: meditationListPlaceholder,
  },
  {
    id: 4,
    title: 'Nature meditation',
    duration: '45 min',
    image: meditationListPlaceholder,
  },
] as const;

export { mockedTracks };
