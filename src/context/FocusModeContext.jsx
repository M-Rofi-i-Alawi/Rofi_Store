import { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const FocusModeContext = createContext();

export function FocusModeProvider({ children }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isFokus = searchParams.get('mode') === 'fokus';

  const path = decodeURIComponent(location.pathname).toLowerCase();

  // Detect which brand is in focus
  const fokusBrand = isFokus && path.includes('dapur')
    ? 'dapur'
    : isFokus && path.includes('design')
      ? 'design'
      : null;

  return (
    <FocusModeContext.Provider value={{ isFokus, fokusBrand }}>
      {children}
    </FocusModeContext.Provider>
  );
}

export function useFocusMode() {
  const context = useContext(FocusModeContext);
  if (!context) {
    return { isFokus: false, fokusBrand: null };
  }
  return context;
}
