import { useState } from 'react';
import { menuItems } from '../data/menuData';
import ProductDetailModal from './ProductDetailModal';

export default function ProdukPilihanSection({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="produk-pilihan" style={{ padding: '5rem 0' }}>
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
            <i className="fas fa-utensils"></i> Produk Pilihan Dapur Rofi
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.5rem' }}>
            Menu Spesial <span className="dr-text">Dapur Rofi</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0.5rem auto 0' }}>
            Nikmati kelezatan olahan Dessert Ubi Ungu lumer dan gurih khas Dapur Rofi!
          </p>
        </div>

        {/* Product Cards Grid */}
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          {menuItems.map((product) => (
            <div
              key={product.id}
              className="card-box scale-hover"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '24px',
                position: 'relative'
              }}
            >
              {/* Product Image */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
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
                    top: '14px',
                    left: '14px',
                    background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {product.badge}
                  </span>
                )}
                {/* Rating Badge */}
                <span style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: '#FF8F00',
                  backdropFilter: 'blur(6px)',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <i className="fas fa-star"></i> {product.rating}
                </span>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)' }}>
                    {product.name}
                  </h3>
                  <div>
                    <span style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--dr-primary)' }}>
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    {product.oldPrice && (
                      <div style={{ textDecoration: 'line-through', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                        Rp {product.oldPrice.toLocaleString('id-ID')}
                      </div>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {product.desc}
                </p>

                {/* Price and Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="btn-hero-primary"
                    style={{ backgroundColor: 'var(--card-bg)', color: 'var(--dr-primary)', border: '1px solid var(--dr-primary)', flexGrow: 1, justifyContent: 'center' }}
                  >
                    <i className="fas fa-eye"></i> Detail Produk
                  </button>

                  <button
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className="btn-hero-primary btn-hero-dapur"
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    <i className="fas fa-plus"></i> Pesan (6K)
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
