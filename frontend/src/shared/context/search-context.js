import { createContext } from 'react';

export const SearchContext = createContext({
  searchState: {},
  inputHandler: () => {},
});
