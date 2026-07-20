import { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextType {
  isPreloaderComplete: boolean;
  setIsPreloaderComplete: (state: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderComplete: false,
  setIsPreloaderComplete: () => {},
});

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isPreloaderComplete, setIsPreloaderComplete }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export const usePreloader = () => useContext(PreloaderContext);
