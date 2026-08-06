import { useState } from 'react';
import { portfolioItems, portfolioCategories } from '../data/portfolioData';
import PortfolioModal from './PortfolioModal';

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeCategory === 'Semua'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" style={{ padding: '5rem 0' }}>
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ color: 'var(--rd-primary)', backgroundColor: 'var(--rd-primary-light)' }}>
            <i className="fas fa-images"></i> Portofolio Karya
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.5rem' }}>
            Galeri Hasil Desain <span className="rd-text">Rofi Design</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0.5rem auto 0' }}>
            Kumpulan hasil pengerjaan visual kreatif mulai dari Poster, Logo, Spanduk Banner, Feed Instagram, Editing Foto, ID Card, hingga Sertifikat.
          </p>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  border: '1px solid var(--border-color)',
                  backgroundColor: activeCategory === cat ? 'var(--rd-primary)' : 'var(--card-bg, #FFFFFF)',
                  color: activeCategory === cat ? '#FFFFFF' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  boxShadow: activeCategory === cat ? '0 4px 14px rgba(99, 102, 241, 0.35)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="card-box scale-hover"
              onClick={() => setSelectedItem(item)}
              style={{
                cursor: 'pointer',
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px'
              }}
            >
              {/* Image Container */}
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px', width: '100%' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(17, 24, 39, 0.75)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '800'
                }}>
                  {item.category}
                </div>

                {/* Hover overlay hint */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <span style={{
                    backgroundColor: '#FFFFFF',
                    color: 'var(--dark)',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    <i className="fas fa-search-plus" style={{ marginRight: '6px' }}></i> Lihat Preview
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--dark)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.description}
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700', color: 'var(--rd-primary)' }}>
                  <span><i className="fas fa-check-circle" style={{ marginRight: '4px' }}></i> {item.badge}</span>
                  <span>Detail &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Large Image Modal */}
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
