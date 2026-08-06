import { useState } from 'react';
import { menuItems } from '../data/menuData';
import ProductDetailModal from './ProductDetailModal';

export default function ProdukPilihanSection({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter the 7 specific items requested: Seblak Original, Seblak Ceker, Seblak Bakso, Mie Pedas, Es Teh, Thai Tea, Matcha
  const targetNames = [
    'Seblak Original',
    'Seblak Ceker',
    'Seblak Bakso',
    'Mie Pedas',
    'Es Teh',
    'Thai Tea',
    'Matcha'
  ];

  const produkPilihan = menuItems.filter(item => targetNames.includes(item.name));

  return (
    <section id="produk-pilihan" style={{ padding: '5rem 0' }}>
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
            <i className="fas fa-utensils"></i> Produk Pilihan Dapur Rofi
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.5rem' }}>
            Menu Favorit <span className="dr-text">Terlaris &amp; Otentik</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0.5rem auto 0' }}>
            Nikmati kelezatan seblak pedas gurih, mie khas, hingga minuman dingin menyegarkan racikan Dapur Rofi.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
          {produkPilihan.map((product) => (
            <div
              key={product.id}
              className="card-box scale-hover"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                position: 'relative'
              }}
            >
              {/* Product Image */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                {product.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))',
                    color: '#FFFFFF',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {product.badge}
                  </span>
                )}
                {/* Rating Badge */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#FF8F00',
                  backdropFilter: 'blur(6px)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <i className="fas fa-star"></i> {product.rating}
                </span>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--dark)' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flexGrow: 1, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.desc}
                </p>

                {/* Price and Action */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dr-primary)' }}>
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    {product.oldPrice && (
                      <div style={{ textDecoration: 'line-through', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Rp {product.oldPrice.toLocaleString('id-ID')}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="btn-hero-primary btn-hero-dapur"
                    style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
                  >
                    <i className="fas fa-eye"></i> Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
