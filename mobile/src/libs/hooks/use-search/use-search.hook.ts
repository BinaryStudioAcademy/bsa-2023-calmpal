import { useEffect, useState } from '#libs/hooks/hooks';

type MockChatItem = {
  id: string;
  title: string;
};

type MockMeditationTopic = {
  id: number;
  title: string;
  uri: string;
  duration: number;
};

type MockData = MockChatItem | MockMeditationTopic;

type UseSearchResult = {
  filteredData: MockData[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const useSearch = (data: MockData[]): UseSearchResult => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<MockData[]>([]);

  useEffect(() => {
    const filteredItems = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filteredItems);
  }, [searchQuery, data]);

  return {
    filteredData,
    setSearchQuery,
  };
};

export { useSearch };
