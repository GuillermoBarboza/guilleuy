import { createContext, useContext } from "react";

export interface AppContextType {
  isAuthenticated: boolean;
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: string;
  setItemId: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  userHasAuthenticated: useAppContext,
  itemId: '',
  setItemId: useAppContext,
});

export function useAppContext() {
  return useContext(AppContext);
}