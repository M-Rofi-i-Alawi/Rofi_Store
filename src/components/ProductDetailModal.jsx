import { useState } from 'react';
import { MERCHANT_WA_NUMBER } from '../data/menuData';

export default function ProductDetailModal({ item, onClose }) {
  const [qty, setQty] = useState(1);
  const [custName, setCustName] = useState('');
  const [custClass, setCustClass] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [notes, setNotes] = useState('');

  if (!item) return null;

  const handleWAOrderDirect = () => {
    if (!custName.trim()) return alert('Mohon isi Nama Pemesan terlebih dahulu!');
    if (!custClass.trim()) return alert('Mohon isi Kelas Anda terlebih dahulu!');

    const totalPrice = item.price * qty;
    let msg = `*HALO DAPUR ROFI, SAYA INGIN MEMESAN!*\n\n`;
    msg += `*Nama:* ${custName.trim()}\n`;
    msg += `*Kelas:* ${custClass.trim()}\n`;
    msg += `*Metode Pembayaran:* ${paymentMethod}\n\n`;
    msg += `*Rincian Pesanan:*\n`;
    msg += `1. ${item.name} (${qty}x) = Rp ${totalPrice.toLocaleString('id-ID')}\n\n`;
    msg += `*Total Pembayaran:* Rp ${totalPrice.toLocaleString('id-ID')}\n`;
    if (notes.trim()) msg += `*Catatan:* ${notes.trim()}\n`;
    msg += `\nDitunggu pesanan aku ya kang rofi, terima kasih!`;

    window.open(`https://wa.me/${MERCHANT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleIGDM = () => {
    window.open('https://www.instagram.com/rofiialawi?igsh=Z2ZqYm5naWo2N3ly', '_blank');
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div
        className="cart-modal glass-card"
        style={{ maxWidth: '580px', width: '92%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ backgroundColor: 'var(--dr-primary-light)', color: 'var(--dr-primary)', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '800' }}>
              Spesial Dapur Rofi
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dark)' }}>
              {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '70vh' }}>
          <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', maxHeight: '280px', objectFit: 'cover' }}
            />
            {item.badge && (
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))',
                color: '#FFF',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '800'
              }}>
                {item.badge}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--dr-primary)' }}>
                Rp {item.price.toLocaleString('id-ID')}
              </span>
              {item.oldPrice && (
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', marginLeft: '8px', fontSize: '0.9rem' }}>
                  Rp {item.oldPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255, 143, 0, 0.15)', padding: '4px 10px', borderRadius: '8px', fontWeight: '800', color: '#FF8F00' }}>
              <i className="fas fa-star"></i> {item.rating}
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            {item.desc}
          </p>

          {/* Form Pemesanan: Qty, Nama, Kelas, Pembayaran */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--dr-bg-alt)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--dark)' }}>Jumlah Porsi:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setQty(prev => Math.max(1, prev - 1))}
                  style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--dark)', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  -
                </button>
                <span style={{ fontWeight: '900', fontSize: '1.1rem', color: 'var(--dark)', minWidth: '24px', textAlign: 'center' }}>{qty}</span>
                <button
                  onClick={() => setQty(prev => prev + 1)}
                  style={{ width: '36px', height: '36px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--dark)', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px', color: 'var(--dark)' }}>
                Nama Pemesan *
              </label>
              <input
                type="text"
                required
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                placeholder="Masukkan nama Anda"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--dark)', outline: 'none', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px', color: 'var(--dark)' }}>
                Kelas *
              </label>
              <input
                type="text"
                required
                value={custClass}
                onChange={(e) => setCustClass(e.target.value)}
                placeholder="Contoh: XII Digital Marketing 1"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)', color: 'var(--dark)', outline: 'none', fontSize: '0.9rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px', color: 'var(--dark)' }}>
                Metode Pembayaran *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('QRIS')}
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    border: paymentMethod === 'QRIS' ? '2px solid var(--dr-primary)' : '1px solid var(--border-color)',
                    backgroundColor: paymentMethod === 'QRIS' ? 'var(--dr-primary-light)' : 'var(--card-bg)',
                    color: paymentMethod === 'QRIS' ? 'var(--dr-primary)' : 'var(--dark)',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fas fa-qrcode"></i> QRIS
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash')}
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    border: paymentMethod === 'Cash' ? '2px solid var(--dr-primary)' : '1px solid var(--border-color)',
                    backgroundColor: paymentMethod === 'Cash' ? 'var(--dr-primary-light)' : 'var(--card-bg)',
                    color: paymentMethod === 'Cash' ? 'var(--dr-primary)' : 'var(--dark)',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fas fa-money-bill-wave"></i> Cash
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px', color: 'var(--dark)' }}>
                Catatan Pesanan (opsional):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Keju parut agak dipisah"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--dark)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            onClick={handleIGDM}
            className="btn-hero-primary"
            style={{ background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', color: '#FFF', fontSize: '0.85rem', padding: '0.6rem 1rem' }}
          >
            <i className="fab fa-instagram"></i> DM IG Official (@rofiialawi)
          </button>
          <button
            onClick={handleWAOrderDirect}
            className="btn-hero-primary btn-hero-dapur"
            style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
          >
            <i className="fab fa-whatsapp"></i> Pesan WA (Rp {(item.price * qty).toLocaleString('id-ID')})
          </button>
        </div>
      </div>
    </div>
  );
}
