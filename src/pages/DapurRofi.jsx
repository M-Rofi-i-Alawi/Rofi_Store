import { useState, useEffect } from 'react';
import { menuItems, MERCHANT_WA_NUMBER } from '../data/menuData';
import { useFocusMode } from '../context/FocusModeContext';
import ProdukPilihanSection from '../components/ProdukPilihanSection';
import TestimoniSection from '../components/TestimoniSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import MediaSosialSection from '../components/MediaSosialSection';
import CtaSection from '../components/CtaSection';

export default function DapurRofi() {
  const { isFokus } = useFocusMode();

  useEffect(() => {
    if (isFokus) {
      document.title = 'Dapur Rofi | Kuliner Otentik, Lezat & Bikin Ketagihan';
    }
    return () => {
      document.title = 'Rofi Store | Kuliner & Desain Grafis';
    };
  }, [isFokus]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [custName, setCustName] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custNotes, setCustNotes] = useState('');

  const categories = [
    { key: 'all', label: 'Semua Menu', icon: 'fa-utensils' },
    { key: 'makanan', label: 'Makanan Utama', icon: 'fa-drumstick-bite' },
    { key: 'camilan', label: 'Camilan & Snack', icon: 'fa-cookie' },
    { key: 'minuman', label: 'Minuman Segar', icon: 'fa-glass-cheers' },
  ];

  const filteredItems = activeFilter === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeFilter);

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    triggerToast(`"${item.name}" ditambahkan ke pesanan!`);
  };

  const updateQty = (id, change) => {
    setCart(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, qty: c.qty + change } : c);
      return updated.filter(c => c.qty > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const processCheckout = () => {
    if (cart.length === 0) return alert('Keranjang pesanan masih kosong!');
    const name = custName || 'Pelanggan';
    const address = custAddress || 'Ambil di Tempat';
    const notes = custNotes || '-';

    let msg = `*HALO DAPUR ROFI, SAYA INGIN MEMESAN!* 🍽️\n\n`;
    msg += `👤 *Nama:* ${name}\n📍 *Alamat:* ${address}\n\n📝 *Rincian Pesanan:*\n`;
    let total = 0;
    cart.forEach((item, i) => {
      const sub = item.price * item.qty;
      total += sub;
      msg += `${i + 1}. ${item.name} (${item.qty}x) = Rp ${sub.toLocaleString('id-ID')}\n`;
    });
    msg += `\n💰 *Total Pembayaran:* Rp ${total.toLocaleString('id-ID')}\n`;
    if (notes !== '-') msg += `💬 *Catatan:* ${notes}\n`;
    msg += `\nMohon diproses ya kak, terima kasih! 🙏`;

    window.open(`https://wa.me/${MERCHANT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--dr-bg)' }}>
      {/* =============== HERO =============== */}
      <section className="hero-section">
        <div className="app-container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
                <i className="fas fa-fire" style={{ color: 'var(--dr-secondary)' }}></i>
                <span>Garansi 100% Halal &amp; Higienis</span>
              </div>

              <h1 className="hero-title">
                Cita Rasa Kuliner<br />
                <span className="dr-text">Otentik</span> &amp; Lezat!
              </h1>

              <p className="hero-subtitle">
                Olahan resep warisan keluarga dari rempah-rempah pilihan. Dimasak segar setiap hari dan siap diantar hangat langsung ke tempat Anda.
              </p>

              <div className="hero-buttons">
                <button
                  onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-hero-primary btn-hero-dapur"
                >
                  <i className="fas fa-utensils"></i> Lihat Menu
                </button>
                <a
                  href={`https://wa.me/${MERCHANT_WA_NUMBER}?text=Halo%20Dapur%20Rofi!%20Saya%20ingin%20memesan.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-primary"
                  style={{ backgroundColor: 'var(--accent-wa)', textDecoration: 'none' }}
                >
                  <i className="fab fa-whatsapp"></i> Pesan via WA
                </a>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                <span><i className="fas fa-star" style={{ color: 'var(--dr-secondary)', marginRight: '6px' }}></i> 4.9/5 (1.2k+ Ulasan)</span>
                <span><i className="fas fa-shipping-fast" style={{ color: 'var(--dr-primary)', marginRight: '6px' }}></i> Kirim Cepat 30 Mnt</span>
              </div>
            </div>

            <div className="hero-img-box">
              <img src="/images/food_hero.png" alt="Dapur Rofi Hero" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== PRODUK PILIHAN =============== */}
      <ProdukPilihanSection onAddToCart={addToCart} />

      {/* =============== MENU CATALOG =============== */}
      <section id="menu" style={{ padding: '5rem 0' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
              <i className="fas fa-utensils"></i> Katalog Makanan &amp; Minuman
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark)', marginTop: '0.5rem' }}>
              Seluruh Menu <span className="dr-text">Dapur Rofi</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Pilih hidangan lezat dan camilan lumer favorit Anda. Tambahkan ke pesanan untuk dikirim via WhatsApp!
            </p>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)',
                  backgroundColor: activeFilter === cat.key ? 'var(--dr-primary)' : 'var(--card-bg, #F9FAFB)',
                  color: activeFilter === cat.key ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: activeFilter === cat.key ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <i className={`fas ${cat.icon}`} style={{ marginRight: '6px' }}></i>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {filteredItems.map((item) => (
              <div key={item.id} className="card-box scale-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {item.badge && (
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))', color: '#FFF', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>
                      {item.badge}
                    </span>
                  )}
                  <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#FF8F00', padding: '4px 10px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="fas fa-star"></i> {item.rating}
                  </span>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem', flexGrow: 1, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dr-primary)' }}>
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                      {item.oldPrice && (
                        <div style={{ textDecoration: 'line-through', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Rp {item.oldPrice.toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="btn-hero-primary btn-hero-dapur"
                      style={{ padding: '0.5rem 1.15rem', fontSize: '0.85rem' }}
                    >
                      <i className="fas fa-plus"></i> Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <button
          onClick={() => setShowCart(true)}
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '28px',
            zIndex: 4000,
            background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '999px',
            padding: '12px 24px',
            fontWeight: '800',
            fontSize: '0.95rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-shopping-bag" style={{ fontSize: '1.1rem' }}></i>
          <span>Keranjang Pesanan ({cartCount})</span>
          <span style={{ backgroundColor: '#FFFFFF', color: 'var(--dr-primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>
            Rp {cartTotal.toLocaleString('id-ID')}
          </span>
        </button>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          top: '90px',
          right: '24px',
          backgroundColor: '#10B981',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-md)',
          zIndex: 9999,
          fontWeight: '800',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-check-circle"></i> {toast.message}
        </div>
      )}

      {/* Cart Modal Drawer */}
      {showCart && (
        <div className="modal-overlay active" onClick={() => setShowCart(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dark)' }}>
                <i className="fas fa-shopping-bag" style={{ color: 'var(--dr-primary)', marginRight: '8px' }}></i>
                Keranjang Pesanan Dapur Rofi
              </h3>
              <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '55vh' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '2rem 0' }}>Keranjang pesanan masih kosong.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--dark)' }}>{item.name}</h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--dr-primary)', fontWeight: '700' }}>
                            Rp {item.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button onClick={() => updateQty(item.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--card-bg, #FFF)', fontWeight: '800', cursor: 'pointer' }}>-</button>
                        <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--card-bg, #FFF)', fontWeight: '800', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  ))}

                  {/* Customer Information Input */}
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--dark)' }}>Nama Anda:</label>
                      <input
                        type="text"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="Contoh: Budi"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg, #FFF)', color: 'inherit', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--dark)' }}>Alamat Pengiriman:</label>
                      <input
                        type="text"
                        value={custAddress}
                        onChange={(e) => setCustAddress(e.target.value)}
                        placeholder="Contoh: Jl. Merdeka No. 12"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg, #FFF)', color: 'inherit', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--dark)' }}>Catatan Pesanan:</label>
                      <input
                        type="text"
                        value={custNotes}
                        onChange={(e) => setCustNotes(e.target.value)}
                        placeholder="Contoh: Sambal dipisah"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--card-bg, #FFF)', color: 'inherit', outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Total Bayar:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--dr-primary)' }}>
                  Rp {cartTotal.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                onClick={processCheckout}
                className="btn-hero-primary btn-hero-dapur"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <i className="fab fa-whatsapp"></i> Checkout WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =============== TESTIMONI =============== */}
      <TestimoniSection />

      {/* =============== FAQ =============== */}
      <FAQSection />

      {/* =============== KONTAK =============== */}
      <ContactSection />

      {/* =============== MEDIA SOSIAL =============== */}
      <MediaSosialSection />

      {/* =============== CTA =============== */}
      <CtaSection />
    </div>
  );
}
