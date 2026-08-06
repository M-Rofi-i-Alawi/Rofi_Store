import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFocusMode } from '../context/FocusModeContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isFokus, fokusBrand } = useFocusMode();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const handleNavAnchor = (e, sectionId) => {
    e.preventDefault();
    setMobileOpen(false);

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (!isFokus) {
      navigate('/');
      setTimeout(() => {
        const targetEl = document.getElementById(sectionId);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  // ===== FOCUS MODE: Dapur Rofi standalone navbar =====
  if (isFokus && fokusBrand === 'dapur') {
    return (
      <header className="site-header">
        <div className="app-container header-inner">
          {/* Logo: Dapur Rofi branding */}
          <div className="brand-logo" style={{ cursor: 'default' }}>
            <div className="brand-logo-icon" style={{ background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))' }}>
              <i className="fas fa-utensils"></i>
            </div>
            <div>
              <span>Dapur <span className="highlight" style={{ color: 'var(--dr-primary)' }}>Rofi</span></span>
            </div>
          </div>

          {/* Focus Mode Nav: Only section anchors */}
          <nav className="nav-links">
            <a
              href="#menu"
              onClick={(e) => handleNavAnchor(e, 'menu')}
              className="nav-link-item active-dapur"
            >
              <i className="fas fa-utensils" style={{ marginRight: '6px', opacity: 0.8 }}></i>
              Menu
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavAnchor(e, 'faq')}
              className="nav-link-item"
            >
              FAQ
            </a>
            <a
              href="#kontak"
              onClick={(e) => handleNavAnchor(e, 'kontak')}
              className="nav-link-item"
            >
              Kontak
            </a>
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--card-bg, rgba(243, 244, 246, 0.8))',
                color: isDark ? '#F59E0B' : '#4B5563',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.15rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
                boxShadow: 'var(--shadow-sm)'
              }}
              title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            <a
              href="https://wa.me/6287812822400?text=Halo%20Dapur%20Rofi!%20Saya%20ingin%20memesan%20makanan."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-header"
            >
              <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }}></i>
              <span className="hide-on-mobile">Pesan Sekarang</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'var(--card-bg, #F3F4F6)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: 'var(--dark)'
              }}
              aria-label="Toggle Menu"
              className="show-mobile-only"
            >
              <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {/* Focus Mode Mobile Drawer */}
        {mobileOpen && (
          <div
            style={{
              position: 'fixed',
              top: '76px',
              right: 0,
              width: '290px',
              height: 'calc(100vh - 76px)',
              backgroundColor: 'var(--card-bg, #FFFFFF)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
              zIndex: 999,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              borderLeft: '1px solid var(--border-color)'
            }}
          >
            <a href="#menu" onClick={(e) => handleNavAnchor(e, 'menu')} className="nav-link-item active-dapur" style={{ padding: '0.8rem 1rem' }}>
              <i className="fas fa-utensils" style={{ width: '24px' }}></i> Menu
            </a>
            <a href="#faq" onClick={(e) => handleNavAnchor(e, 'faq')} className="nav-link-item" style={{ padding: '0.8rem 1rem' }}>
              <i className="fas fa-question-circle" style={{ width: '24px' }}></i> FAQ
            </a>
            <a href="#kontak" onClick={(e) => handleNavAnchor(e, 'kontak')} className="nav-link-item" style={{ padding: '0.8rem 1rem' }}>
              <i className="fas fa-phone-alt" style={{ width: '24px' }}></i> Kontak
            </a>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--dark)' }}>
                Mode Tampilan:
              </span>
              <button
                onClick={toggleTheme}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--card-bg, #F3F4F6)',
                  fontWeight: '800',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: isDark ? '#F59E0B' : '#4B5563'
                }}
              >
                <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>

            <a
              href="https://wa.me/6287812822400?text=Halo%20Dapur%20Rofi!%20Saya%20ingin%20memesan%20makanan."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-header"
              style={{ justifyContent: 'center', marginTop: '0.75rem' }}
            >
              <i className="fab fa-whatsapp"></i> Pesan via WhatsApp
            </a>
          </div>
        )}
      </header>
    );
  }

  // ===== NORMAL MODE: Full Rofi Store navbar =====
  return (
    <header className="site-header">
      <div className="app-container header-inner">
        {/* Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-logo-icon">
            <i className="fas fa-store"></i>
          </div>
          <div>
            <span>Rofi <span className="highlight">Store</span></span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <Link
            to="/"
            className={`nav-link-item ${isActive('/') ? 'active-home' : ''}`}
          >
            <i className="fas fa-home" style={{ marginRight: '6px', opacity: 0.8 }}></i>
            Beranda
          </Link>
          <Link
            to="/dapur-rofi"
            className={`nav-link-item ${isActive('/dapur-rofi') ? 'active-dapur' : ''}`}
          >
            <i className="fas fa-utensils" style={{ marginRight: '6px', opacity: 0.8 }}></i>
            Dapur Rofi
          </Link>
          <Link
            to="/rofi-design"
            className={`nav-link-item ${isActive('/rofi-design') ? 'active-design' : ''}`}
          >
            <i className="fas fa-palette" style={{ marginRight: '6px', opacity: 0.8 }}></i>
            Rofi Design
          </Link>
          <a
            href="#testimoni"
            onClick={(e) => handleNavAnchor(e, 'testimoni')}
            className="nav-link-item"
          >
            Testimoni
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavAnchor(e, 'faq')}
            className="nav-link-item"
          >
            FAQ
          </a>
          <a
            href="#kontak"
            onClick={(e) => handleNavAnchor(e, 'kontak')}
            className="nav-link-item"
          >
            Kontak
          </a>
        </nav>

        {/* Right Actions: Cart Icon, Dark Mode Toggle & WhatsApp CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart Icon Button */}
          <Link
            to="/dapur-rofi"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--dr-primary-light)',
              color: 'var(--dr-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Keranjang Pesanan Dapur Rofi"
            aria-label="Keranjang Pesanan"
          >
            <i className="fas fa-shopping-bag"></i>
          </Link>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--card-bg, rgba(243, 244, 246, 0.8))',
              color: isDark ? '#F59E0B' : '#4B5563',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              cursor: 'pointer',
              transition: 'var(--transition)',
              boxShadow: 'var(--shadow-sm)'
            }}
            title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <a
            href="https://wa.me/6287812822400?text=Halo%20Rofi%20Store!%20Saya%20ingin%20bertanya%20layanan%20Anda."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-header"
          >
            <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }}></i>
            <span className="hide-on-mobile">Hubungi Kami</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'var(--card-bg, #F3F4F6)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: 'var(--dark)'
            }}
            aria-label="Toggle Menu"
            className="show-mobile-only"
          >
            <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            right: 0,
            width: '290px',
            height: 'calc(100vh - 76px)',
            backgroundColor: 'var(--card-bg, #FFFFFF)',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
            zIndex: 999,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            borderLeft: '1px solid var(--border-color)'
          }}
        >
          <Link
            to="/"
            className={`nav-link-item ${isActive('/') ? 'active-home' : ''}`}
            style={{ padding: '0.8rem 1rem' }}
          >
            <i className="fas fa-home" style={{ width: '24px' }}></i> Beranda
          </Link>
          <Link
            to="/dapur-rofi"
            className={`nav-link-item ${isActive('/dapur-rofi') ? 'active-dapur' : ''}`}
            style={{ padding: '0.8rem 1rem' }}
          >
            <i className="fas fa-utensils" style={{ width: '24px' }}></i> Dapur Rofi
          </Link>
          <Link
            to="/rofi-design"
            className={`nav-link-item ${isActive('/rofi-design') ? 'active-design' : ''}`}
            style={{ padding: '0.8rem 1rem' }}
          >
            <i className="fas fa-palette" style={{ width: '24px' }}></i> Rofi Design
          </Link>

          <a
            href="#testimoni"
            onClick={(e) => handleNavAnchor(e, 'testimoni')}
            className="nav-link-item"
            style={{ padding: '0.8rem 1rem' }}
          >
            <i className="fas fa-star" style={{ width: '24px' }}></i> Testimoni
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavAnchor(e, 'faq')}
            className="nav-link-item"
            style={{ padding: '0.8rem 1rem' }}
          >
            <i className="fas fa-question-circle" style={{ width: '24px' }}></i> FAQ
          </a>
          <a
            href="#kontak"
            onClick={(e) => handleNavAnchor(e, 'kontak')}
            className="nav-link-item"
            style={{ padding: '0.8rem 1rem' }}
          >
            <i className="fas fa-phone-alt" style={{ width: '24px' }}></i> Kontak
          </a>

          {/* Theme Switcher in Mobile Drawer */}
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--dark)' }}>
              Mode Tampilan:
            </span>
            <button
              onClick={toggleTheme}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--card-bg, #F3F4F6)',
                fontWeight: '800',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: isDark ? '#F59E0B' : '#4B5563'
              }}
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          <a
            href="https://wa.me/6287812822400"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-header"
            style={{ justifyContent: 'center', marginTop: '0.75rem' }}
          >
            <i className="fab fa-whatsapp"></i> Chat WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
