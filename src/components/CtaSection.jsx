import { MERCHANT_WA_NUMBER } from '../data/menuData';
import { useFocusMode } from '../context/FocusModeContext';

export default function CtaSection() {
  const { isFokus, fokusBrand } = useFocusMode();
  const isDapurMode = isFokus && fokusBrand === 'dapur';

  const handleWA = () => {
    const msg = isDapurMode
      ? `Halo Dapur Rofi!\n\nSaya ingin memesan Dessert Ubi Ungu (Rp 3.000). Mohon informasinya ya kang Rofi, terima kasih!`
      : `Halo Rofi Store!\n\nSaya ingin berkonsultasi mengenai pesanan makanan Dapur Rofi / jasa Rofi Design. Mohon bantuannya ya kang Rofi, terima kasih!`;
    window.open(`https://wa.me/${MERCHANT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleIGOfficial = () => {
    window.open('https://www.instagram.com/rofiialawi?igsh=Z2ZqYm5naWo2N3ly', '_blank');
  };

  const handleIGDesign = () => {
    window.open('https://www.instagram.com/rofi_editz?igsh=MXIydXl6N3Q2cGNz', '_blank');
  };

  return (
    <section id="cta" style={{ padding: '4.5rem 0' }}>
      <div className="app-container">
        <div
          style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            color: '#FFFFFF',
            borderRadius: '28px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Decorative Background Effects */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230, 74, 25, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 143, 0, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#FF8F00',
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '800',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(8px)'
            }}>
              <i className="fas fa-comments"></i> Konsultasi &amp; Pemesanan Cepat
            </span>

            <h2 style={{ fontSize: '2.75rem', fontWeight: '900', color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Mau Pesan Langsung?
            </h2>

            <p style={{ fontSize: '1.1rem', color: '#94A3B8', marginBottom: '2.25rem', lineHeight: '1.6' }}>
              {isDapurMode
                ? 'Pesan Dessert Ubi Ungu favoritmu sekarang via WhatsApp atau hubungi Instagram Official kami!'
                : 'Konsultasikan kebutuhanmu sekarang melalui WhatsApp atau pilih DM Instagram Official & Rofi Design.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {/* WhatsApp Button */}
              <button
                onClick={handleWA}
                className="btn-hero-primary"
                style={{
                  backgroundColor: 'var(--accent-wa)',
                  color: '#FFFFFF',
                  fontSize: '0.925rem',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '9999px',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)'
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.15rem' }}></i> Chat via WhatsApp
              </button>

              {/* Official IG DM Button */}
              <button
                onClick={handleIGOfficial}
                className="btn-hero-primary"
                style={{
                  background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))',
                  color: '#FFFFFF',
                  fontSize: '0.925rem',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '9999px',
                  boxShadow: '0 8px 24px rgba(230, 74, 25, 0.35)'
                }}
              >
                <i className="fab fa-instagram" style={{ fontSize: '1.15rem' }}></i> DM IG Official (@rofiialawi)
              </button>

              {/* Show Rofi Design IG DM Button ONLY in normal mode */}
              {!isDapurMode && (
                <button
                  onClick={handleIGDesign}
                  className="btn-hero-primary"
                  style={{
                    background: 'linear-gradient(135deg, var(--rd-primary), var(--rd-secondary))',
                    color: '#FFFFFF',
                    fontSize: '0.925rem',
                    padding: '0.85rem 1.6rem',
                    borderRadius: '9999px',
                    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)'
                  }}
                >
                  <i className="fab fa-instagram" style={{ fontSize: '1.15rem' }}></i> DM IG Rofi Design (@rofi_editz)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
