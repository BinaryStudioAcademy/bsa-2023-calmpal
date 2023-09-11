// without this I have too much typeScript errors in Note, so i decided to make this custom debounce function

import { debounce } from 'debounce';

const customDebounce = <T extends React.SyntheticEvent<HTMLDivElement>>(
  function_: (event: T) => void,
  delay: number,
): ((event: T) => void) => {
  const debouncedFunction = debounce((event: T) => {
    function_(event);
  }, delay);

  return (event: T) => {
    debouncedFunction(event);
  };
};

export { customDebounce };
