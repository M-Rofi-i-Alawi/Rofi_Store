import { Link } from 'react-router-dom';
import { useFocusMode } from '../context/FocusModeContext';

export default function Footer() {
  const { isFokus, fokusBrand } = useFocusMode();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== FOCUS MODE: Dapur Rofi standalone footer =====
  if (isFokus && fokusBrand === 'dapur') {
    return (
      <footer
        style={{
          backgroundColor: 'var(--footer-bg, #111827)',
          color: '#9CA3AF',
          paddingTop: '4.5rem',
          paddingBottom: '2.5rem',
          borderTop: '1px solid var(--border-color)',
          transition: 'var(--transition)'
        }}
      >
        <div className="app-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3.5rem'
            }}
          >
            {/* Kolom 1: Dapur Rofi Brand */}
            <div style={{ gridColumn: 'span 2' }}>
              <div className="brand-logo" style={{ marginBottom: '1rem', color: '#FFFFFF', cursor: 'default' }}>
                <div className="brand-logo-icon" style={{ background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))' }}>
                  <i className="fas fa-utensils"></i>
                </div>
                <div>
                  <span>Dapur <span className="highlight" style={{ color: 'var(--dr-primary)' }}>Rofi</span></span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: '#9CA3AF', maxWidth: '340px', marginBottom: '1.25rem' }}>
                Sajian kuliner otentik dengan bumbu rempah pilihan. Lezat, higienis, dan siap menemani kehangatan santap keluarga Anda.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(230, 74, 25, 0.15)', color: 'var(--dr-primary)' }}>
                  Halal &amp; Higienis
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(255, 143, 0, 0.15)', color: '#FF8F00' }}>
                  Fresh Made-to-Order
                </span>
              </div>
            </div>

            {/* Kolom 2: Navigasi (only section anchors) */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
                Navigasi
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
                <li>
                  <a href="#menu" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                    <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> Katalog Menu
                  </a>
                </li>
                <li>
                  <a href="#testimoni" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                    <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> Testimoni Pelanggan
                  </a>
                </li>
                <li>
                  <a href="#faq" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                    <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> FAQ &amp; Bantuan
                  </a>
                </li>
                <li>
                  <a href="#kontak" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                    <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> Kontak
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Media Sosial */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
                Media Sosial
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <li>
                  <a href="https://www.tiktok.com/@ropiew?_r=1&_t=ZS-98ZGL08EV18" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fab fa-tiktok" style={{ color: '#25F4EE', fontSize: '1rem' }}></i> TikTok: @ropiew
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/rofiialawi?igsh=Z2ZqYm5naWo2N3ly" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fab fa-instagram" style={{ color: '#E1306C', fontSize: '1rem' }}></i> IG: @rofiialawi
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom 4: Kontak */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
                Hubungi Kami
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: 'var(--dr-primary)', marginTop: '3px' }}></i>
                  <span>Jl. Otista Iskandar Dinata 1, Cianjur</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <i className="fab fa-whatsapp" style={{ color: '#25D366', marginTop: '3px' }}></i>
                  <span>+62 878-1282-2400</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <i className="fas fa-clock" style={{ color: '#FF8F00', marginTop: '3px' }}></i>
                  <span>Setiap Hari: 09.00 - 21.00 WIB</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.85rem'
            }}
          >
            <p style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} <strong>Dapur Rofi</strong>. Seluruh Hak Cipta Dilindungi.
            </p>

            <button
              onClick={scrollToTop}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '6px 16px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            >
              <i className="fas fa-arrow-up"></i> Kembali ke Atas
            </button>
          </div>
        </div>
      </footer>
    );
  }

  // ===== NORMAL MODE: Full Rofi Store footer =====
  return (
    <footer
      style={{
        backgroundColor: 'var(--footer-bg, #111827)',
        color: '#9CA3AF',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid var(--border-color)',
        transition: 'var(--transition)'
      }}
    >
      <div className="app-container">
        {/* Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Kolom 1: Logo & Deskripsi */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem', color: '#FFFFFF' }}>
              <div className="brand-logo-icon">
                <i className="fas fa-store"></i>
              </div>
              <div>
                <span>Rofi <span className="highlight">Store</span></span>
              </div>
            </Link>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: '#9CA3AF', maxWidth: '340px', marginBottom: '1.25rem' }}>
              Platform terpadu penyedia sajian kuliner otentik dari <strong>Dapur Rofi</strong> dan jasa studio desain grafis profesional dari <strong>Rofi Design</strong>.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(230, 74, 25, 0.15)', color: 'var(--dr-primary)' }}>
                Halal &amp; Higienis
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '4px 10px', borderRadius: '8px', backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--rd-primary)' }}>
                100% Desain Kreatif
              </span>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Navigasi Halaman
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                  <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> Beranda
                </Link>
              </li>
              <li>
                <Link to="/dapur-rofi" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                  <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> Dapur Rofi
                </Link>
              </li>
              <li>
                <Link to="/rofi-design" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                  <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> Rofi Design
                </Link>
              </li>
              <li>
                <a href="#testimoni" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                  <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> Testimoni Pelanggan
                </a>
              </li>
              <li>
                <a href="#faq" style={{ color: 'inherit', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#FFFFFF'} onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}>
                  <i className="fas fa-angle-right" style={{ marginRight: '6px', fontSize: '0.75rem' }}></i> FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Layanan Utama
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li><span style={{ color: '#E5E7EB' }}>Kuliner Makanan Pedas</span></li>
              <li><span style={{ color: '#E5E7EB' }}>Minuman Segar Racikan</span></li>
              <li><span style={{ color: '#E5E7EB' }}>Desain Logo &amp; Branding</span></li>
              <li><span style={{ color: '#E5E7EB' }}>Desain Banner &amp; Poster</span></li>
              <li><span style={{ color: '#E5E7EB' }}>Feed Instagram &amp; Editing</span></li>
            </ul>
          </div>

          {/* Kolom 4: Media Sosial */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Media Sosial Resmi
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <li>
                <a href="https://www.tiktok.com/@ropiew?_r=1&_t=ZS-98ZGL08EV18" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fab fa-tiktok" style={{ color: '#25F4EE', fontSize: '1rem' }}></i> TikTok: @ropiew (Official)
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@rofi_editz?_r=1&_t=ZS-98ZG8RlHiHo" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fab fa-tiktok" style={{ color: '#FE2C55', fontSize: '1rem' }}></i> TikTok: @rofi_editz (Editing)
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/rofiialawi?igsh=Z2ZqYm5naWo2N3ly" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fab fa-instagram" style={{ color: '#E1306C', fontSize: '1rem' }}></i> IG: @rofiialawi (Official)
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/rofi_editz?igsh=MXIydXl6N3Q2cGNz" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fab fa-instagram" style={{ color: '#C13584', fontSize: '1rem' }}></i> IG: @rofi_editz (Desain)
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 5: Kontak */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.02em' }}>
              Hubungi Kami
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li style={{ display: 'flex', gap: '8px' }}>
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--dr-primary)', marginTop: '3px' }}></i>
                <span>Jl. Otista Iskandar Dinata 1, Cianjur</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <i className="fab fa-whatsapp" style={{ color: '#25D366', marginTop: '3px' }}></i>
                <span>+62 878-1282-2400</span>
              </li>
              <li style={{ display: 'flex', gap: '8px' }}>
                <i className="fas fa-clock" style={{ color: '#FF8F00', marginTop: '3px' }}></i>
                <span>Setiap Hari: 09.00 - 21.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem'
          }}
        >
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} <strong>Rofi Store</strong>. Seluruh Hak Cipta Dilindungi. Tugas Digital Marketing Bu Dewi.
          </p>

          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            <i className="fas fa-arrow-up"></i> Kembali ke Atas
          </button>
        </div>
      </div>
    </footer>
  );
}
