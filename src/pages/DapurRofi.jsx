import { useState, useEffect } from 'react';
import { menuItems, MERCHANT_WA_NUMBER } from '../data/menuData';
import { useFocusMode } from '../context/FocusModeContext';
import { supabase } from '../lib/supabase';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import MediaSosialSection from '../components/MediaSosialSection';
import CtaSection from '../components/CtaSection';

export default function DapurRofi() {
  const { isFokus } = useFocusMode();

  useEffect(() => {
    if (isFokus) {
      document.title = 'Dapur Rofi | Dessert Ubi Ungu';
    }
    return () => {
      document.title = 'Rofi Store | Kuliner & Desain Grafis';
    };
  }, [isFokus]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Form State for Checkout
  const [custName, setCustName] = useState('');
  const [custClass, setCustClass] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3500);
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
      const existing = prev.find(c => c.id === id);
      if (!existing) return prev;
      const newQty = existing.qty + change;
      const updated = prev.map(c => c.id === id ? { ...c, qty: newQty } : c);
      return updated.filter(c => c.qty > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const processCheckout = async () => {
    if (cart.length === 0) return alert('Keranjang pesanan masih kosong!');
    if (!custName.trim()) return alert('Mohon isi Nama Pemesan terlebih dahulu!');
    if (!custClass.trim()) return alert('Mohon isi Kelas Anda terlebih dahulu!');

    const name = custName.trim();
    const kelas = custClass.trim();
    const payment = paymentMethod;

    let msg = `*HALO DAPUR ROFI, SAYA INGIN MEMESAN!* 🍧\n\n`;
    msg += `👤 *Nama:* ${name}\n`;
    msg += `🏫 *Kelas:* ${kelas}\n`;
    msg += `💳 *Metode Pembayaran:* ${payment}\n`;
    msg += `📍 *Lokasi Antar:* Smakzie Lokasi Bawah (LB)\n`;
    msg += `⏰ *Waktu Antar:* Jam Istirahat / Pulang Sekolah\n\n`;
    msg += `📝 *Rincian Pesanan:*\n`;
    let total = 0;
    cart.forEach((item, i) => {
      const sub = item.price * item.qty;
      total += sub;
      msg += `${i + 1}. ${item.name} (${item.qty}x) = Rp ${sub.toLocaleString('id-ID')}\n`;
    });
    msg += `\n💰 *Total Pembayaran:* Rp ${total.toLocaleString('id-ID')}\n`;
    msg += `\nMohon diproses ya kak, terima kasih! 🙏`;

    // Simpan data pesanan ke tabel 'orders' di Supabase (untuk admin dashboard)
    try {
      await supabase.from('orders').insert({
        customer_name: name,
        customer_class: kelas,
        payment_method: payment,
        items: cart.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
        total_amount: total,
        status: 'pending'
      });
    } catch (err) {
      console.error('Gagal menyimpan pesanan ke Supabase:', err);
    }

    setCart([]);
    setShowCart(false);
    triggerToast('Pesanan terkirim via WhatsApp!');

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
                <i className="fas fa-school" style={{ color: 'var(--dr-secondary)' }}></i>
                <span>Khusus Smakzie Lokasi Bawah (LB)</span>
              </div>

              <h1 className="hero-title">
                Sajian Lezat<br />
                <span className="dr-text">Dapur Rofi</span>
              </h1>

              <p className="hero-subtitle">
                Cicos bumbu seblak pedas gurih & Dessert ubi ungu keju lumer homemade. Diantar langsung saat jam istirahat atau pulang sekolah!
              </p>

              <div className="hero-buttons">
                <button
                  onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-hero-primary btn-hero-dapur"
                >
                  <i className="fas fa-utensils"></i> Pilih Varian (3K &amp; 6K)
                </button>
                <a
                  href={`https://wa.me/${MERCHANT_WA_NUMBER}?text=Halo%20Dapur%20Rofi!%20Saya%20ingin%20memesan%20Dessert%20Ubi%20Ungu.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-primary"
                  style={{ backgroundColor: 'var(--accent-wa)', textDecoration: 'none' }}
                >
                  <i className="fab fa-whatsapp"></i> Chat via WA
                </a>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                <span><i className="fas fa-clock" style={{ color: 'var(--dr-secondary)', marginRight: '6px' }}></i> Antar Jam Istirahat / Pulang</span>
                <span><i className="fas fa-wallet" style={{ color: 'var(--dr-primary)', marginRight: '6px' }}></i> QRIS / Cash</span>
              </div>
            </div>

            <div className="hero-img-box">
              <img src={menuItems[0]?.image || '/images/cicos.jpeg'} alt="Dapur Rofi" style={{ borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* =============== MENU CATALOG =============== */}
      <section id="menu" style={{ padding: '4rem 0' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
              <i className="fas fa-cookie-bite"></i> Menu &amp; Varian Dapur Rofi
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark)', marginTop: '0.5rem' }}>
              Varian <span className="dr-text">Dessert Ubi Ungu</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Pilih porsi favorit Anda! Siap antar di Smakzie LB.
            </p>

            {isAdmin && (
              <div style={{ margin: '1.5rem auto 0', padding: '1rem', background: '#FFF3CD', border: '1px solid #FFEBAA', borderRadius: '16px', textAlign: 'center', maxWidth: '500px' }}>
                <p style={{ fontWeight: 'bold', color: '#856404', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  ⚙️ Admin Mode (Database Supabase Active)
                </p>
                <button
                  onClick={handleAdminReset}
                  style={{ padding: '8px 16px', background: '#DC3545', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                >
                  Reset Stok Database ke Initial (Mini: 4, Medium: 11)
                </button>
              </div>
            )}
          </div>

          {/* Product Grid / Empty State */}
          {menuItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--card-bg)', borderRadius: '24px', border: '1px dashed var(--border-color)', maxWidth: '600px', margin: '0 auto' }}>
              <i className="fas fa-box-open" style={{ fontSize: '3.5rem', color: 'var(--dr-primary)', marginBottom: '1.25rem' }}></i>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Belum Ada Produk Dapur Rofi</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Semua produk Dapur Rofi saat ini belum tersedia atau sedang dalam pembaruan menu. Silakan periksa kembali nanti!
              </p>
            </div>
          ) : (
            <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '840px', margin: '0 auto' }}>
              {menuItems.map((item) => (
                <div key={item.id} className="card-box scale-hover" style={{ padding: 0, overflow: 'hidden', borderRadius: '24px', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '240px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))', color: '#FFF', padding: '6px 14px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '800' }}>
                      {item.badge}
                    </span>
                    <span style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#FF8F00', padding: '6px 12px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <i className="fas fa-star"></i> {item.rating}
                    </span>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--dark)' }}>
                        {item.name}
                      </h3>
                      <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--dr-primary)' }}>
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                        {item.oldPrice && (
                          <div style={{ textDecoration: 'line-through', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                            Rp {item.oldPrice.toLocaleString('id-ID')}
                          </div>
                        )}
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                      {item.desc}
                    </p>

                    <button
                      onClick={() => addToCart(item)}
                      className="btn-hero-primary btn-hero-dapur"
                      style={{ width: '100%', justifyContent: 'center', padding: '0.85rem 1.25rem', fontSize: '0.95rem' }}
                    >
                      <i className="fas fa-plus-circle"></i> Pesan Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STAY TUNED BANNER FOR FUTURE PRODUCTS */}
          <div
            className="card-box"
            style={{
              maxWidth: '840px',
              margin: '2.5rem auto 0',
              padding: '1.75rem',
              borderRadius: '24px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(230, 74, 25, 0.08) 0%, rgba(255, 143, 0, 0.12) 100%)',
              border: '2px dashed var(--dr-primary)'
            }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>✨ 🎁 ✨</div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dr-primary)', marginBottom: '0.5rem' }}>
              Ditunggu Produk Selanjutnya!
            </h4>
            <p style={{ color: 'var(--dark)', fontWeight: '700', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Stay tuned terus untuk mendapatkan produk baru selanjutnya dari Dapur Rofi 💖
            </p>
          </div>
        </div>
      </section>

      {/* =============== FAQ =============== */}
      <FAQSection />

      {/* =============== KONTAK =============== */}
      <ContactSection />

      {/* =============== MEDIA SOSIAL =============== */}
      <MediaSosialSection />

      {/* =============== CTA BANNER =============== */}
      <CtaSection />

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
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <i className="fas fa-shopping-basket" style={{ fontSize: '1.2rem' }}></i>
          <span>Pesanan ({cartCount}) &bull; Rp {cartTotal.toLocaleString('id-ID')}</span>
        </button>
      )}

      {/* Cart & Checkout Modal */}
      {showCart && (
        <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && setShowCart(false)}>
          <div className="cart-modal">
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                <i className="fas fa-shopping-basket" style={{ color: 'var(--dr-primary)' }}></i> Keranjang Pesanan
              </h3>
              <button
                onClick={() => setShowCart(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', maxHeight: '60vh' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>Keranjang pesanan masih kosong.</p>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '12px', backgroundColor: 'var(--dr-bg-alt)' }}>
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--dark)', margin: 0 }}>{item.name}</h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--dr-primary)', fontWeight: '700' }}>
                            Rp {item.price.toLocaleString('id-ID')} x {item.qty} = Rp {(item.price * item.qty).toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button onClick={() => updateQty(item.id, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'var(--card-bg)', cursor: 'pointer', fontWeight: '800' }}>-</button>
                          <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'var(--card-bg)', cursor: 'pointer', fontWeight: '800' }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Form Pemesanan: Nama, Kelas, Pembayaran (QRIS / Cash) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--dark)', margin: 0 }}>
                      📋 Data Pemesan (Antar ke Smakzie LB):
                    </h4>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px', color: 'var(--dark)' }}>
                        Nama Pemesan *
                      </label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="Contoh: Rofi Alawi"
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
                        placeholder="Contoh: XII RPL 2"
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
                  </div>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--dr-bg-alt)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '800', fontSize: '1.1rem' }}>
                  <span>Total Pembayaran:</span>
                  <span style={{ color: 'var(--dr-primary)', fontSize: '1.25rem' }}>Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <button
                  onClick={processCheckout}
                  className="btn-hero-primary"
                  style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--accent-wa)', padding: '0.85rem' }}
                >
                  <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Kirim Pesanan via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#10B981',
          color: '#FFFFFF',
          padding: '12px 22px',
          borderRadius: '14px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: '800',
          fontSize: '0.9rem'
        }}>
          <i className="fas fa-check-circle"></i>
          {toast.message}
        </div>
      )}
    </div>
  );
}
