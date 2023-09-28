import { type Track } from '#libs/packages/player/player';
import { type MeditationEntryGetAllItemResponseDto } from '#packages/meditation/meditation';

const meditationEntryToTrack = (
  meditations: MeditationEntryGetAllItemResponseDto[],
): Track[] => {
  const tracks: Track[] = meditations.map((meditation) => {
    return {
      id: meditation.id.toString(),
      url: meditation.mediaUrl,
      title: meditation.name,
      artist: 'meditation',
      artwork: '',
    };
  });

  return tracks;
};

export { meditationEntryToTrack };
