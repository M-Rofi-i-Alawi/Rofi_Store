import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { FocusModeProvider } from './context/FocusModeContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import DapurRofi from './pages/DapurRofi';
import RofiDesign from './pages/RofiDesign';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <FocusModeProvider>
      <Preloader />
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Dapur Rofi Routes & Aliases */}
          <Route path="/dapur-rofi" element={<DapurRofi />} />
          <Route path="/dapur rofi" element={<DapurRofi />} />
          <Route path="/dapur_rofi" element={<DapurRofi />} />
          <Route path="/dapur" element={<DapurRofi />} />

          {/* Rofi Design Routes & Aliases */}
          <Route path="/rofi-design" element={<RofiDesign />} />
          <Route path="/rofi design" element={<RofiDesign />} />
          <Route path="/rofi_design" element={<RofiDesign />} />
          <Route path="/design" element={<RofiDesign />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </FocusModeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
