import { MERCHANT_WA_NUMBER } from '../data/designData';

export default function PortfolioModal({ item, onClose }) {
  if (!item) return null;

  const handleWAOrder = () => {
    const msg = `Halo Rofi Design! 🎨\n\nSaya tertarik dengan portofolio *${item.title}* (${item.category}).\n\nSaya ingin memesan / konsultasi proyek serupa. Mohon info detailnya ya kak! 🙏`;
    window.open(`https://wa.me/${MERCHANT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleIGOrder = () => {
    window.open('https://www.instagram.com/rofi_editz?igsh=MXIydXl6N3Q2cGNz', '_blank');
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div
        className="cart-modal glass-card"
        style={{ maxWidth: '680px', width: '92%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--rd-primary)', letterSpacing: '0.05em' }}>
              {item.badge}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dark)' }}>
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '70vh' }}>
          <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', maxHeight: '380px', objectFit: 'cover' }}
            />
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            {item.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--rd-primary-light)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Client / Proyek</span>
              <p style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--dark)' }}>{item.client || 'Klien Rofi Design'}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Software / Tools</span>
              <p style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--dark)' }}>{item.tools || 'Adobe Creative Suite'}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            onClick={handleIGOrder}
            className="btn-hero-primary"
            style={{ background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', color: '#FFF', fontSize: '0.85rem', padding: '0.6rem 1rem' }}
          >
            <i className="fab fa-instagram"></i> DM IG (@rofi_editz)
          </button>
          <button
            onClick={handleWAOrder}
            className="btn-hero-primary btn-hero-design"
            style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
          >
            <i className="fab fa-whatsapp"></i> Pesan via WA
          </button>
        </div>
      </div>
    </div>
  );
}
