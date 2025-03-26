import React, { createContext, useState, ReactNode } from "react";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  searchTerm: "",
  setSearchTerm: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<ProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
