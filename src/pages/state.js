// context/state.js
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const sharedState = {
    value: 42, // Whatever data you want to share
  };

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
