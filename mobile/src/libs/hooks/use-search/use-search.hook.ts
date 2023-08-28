import { useEffect, useState } from '#libs/hooks/hooks';

type MockChatItem = {
  id: string;
  title: string;
};

type UseSearchResult = {
  filteredData: MockChatItem[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const useSearch = (data: MockChatItem[]): UseSearchResult => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<MockChatItem[]>([]);

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
