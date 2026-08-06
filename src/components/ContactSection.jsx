import { useFocusMode } from '../context/FocusModeContext';

export default function ContactSection() {
  const { isFokus, fokusBrand } = useFocusMode();
  const isDapurMode = isFokus && fokusBrand === 'dapur';

  return (
    <section id="kontak" style={{ padding: '5rem 0' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="hero-badge" style={{ color: 'var(--accent-wa)', backgroundColor: 'rgba(37, 211, 102, 0.12)' }}>
            <i className="fab fa-whatsapp"></i> Hubungi Kami
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--dark)', marginTop: '0.5rem' }}>
            Kontak Resmi <span style={{ color: 'var(--accent-wa)' }}>{isDapurMode ? 'Dapur Rofi' : 'Rofi Store'}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            {isDapurMode
              ? 'Tim Dapur Rofi siap melayani pesanan Anda untuk area Smakzie Lokasi Bawah (LB).'
              : 'Tim kami siap membantu Anda dengan respon cepat. Silakan hubungi melalui kanal di bawah ini.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Card Info */}
          <div className="card-box" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--dark)' }}>
                Layanan Pelanggan
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(37, 211, 102, 0.15)', color: 'var(--accent-wa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--dark)' }}>WhatsApp Pemesanan</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>+62 878-1282-2400 (Respon Cepat)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--dr-primary-light)', color: 'var(--dr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    <i className="fas fa-school"></i>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--dark)' }}>Lokasi Antar Utama</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Smakzie Lokasi Bawah (LB)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255, 143, 0, 0.15)', color: '#FF8F00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h5 style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--dark)' }}>Waktu Pengantaran</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Jam Istirahat &amp; Pulang Sekolah</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/6287812822400?text=${encodeURIComponent(isDapurMode ? 'Halo Dapur Rofi! Saya ingin memesan Dessert Ubi Ungu di Smakzie LB.' : 'Halo Rofi Store! Saya ingin bertanya.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary"
              style={{ backgroundColor: 'var(--accent-wa)', width: '100%', textDecoration: 'none' }}
            >
              <i className="fab fa-whatsapp"></i>
              <span>Chat WhatsApp Pemesanan</span>
            </a>
          </div>

          {/* Card Area */}
          <div className="card-box" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dark)', marginBottom: '0.75rem' }}>
                Area Pengiriman &amp; Waktu Antar
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {isDapurMode
                  ? 'Dapur Rofi melayani pengiriman khusus di area Smakzie Lokasi Bawah (LB), diantar langsung pada jam istirahat atau jam pulang sekolah.'
                  : 'Dapur Rofi melayani pengiriman di area Smakzie Lokasi Bawah (LB), diantar saat jam istirahat / pulang sekolah.'}
              </p>
            </div>

            {isDapurMode ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
                <div style={{ backgroundColor: 'var(--dr-primary-light)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <i className="fas fa-map-marker-alt" style={{ fontSize: '1.5rem', color: 'var(--dr-primary)', marginBottom: '0.5rem', display: 'block' }}></i>
                  <h5 style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--dark)' }}>Area Pengiriman</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--dr-primary)', marginTop: '2px', fontWeight: '700' }}>Smakzie Lokasi Bawah (LB)</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 143, 0, 0.12)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <i className="fas fa-clock" style={{ fontSize: '1.5rem', color: '#FF8F00', marginBottom: '0.5rem', display: 'block' }}></i>
                  <h5 style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--dark)' }}>Waktu Antar</h5>
                  <p style={{ fontSize: '0.75rem', color: '#FF8F00', marginTop: '2px', fontWeight: '700' }}>Jam Istirahat / Pulang</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1rem 0' }}>
                <div style={{ backgroundColor: 'var(--dr-primary-light)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <i className="fas fa-utensils" style={{ fontSize: '1.5rem', color: 'var(--dr-primary)', marginBottom: '0.5rem', display: 'block' }}></i>
                  <h5 style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--dark)' }}>Dapur Rofi</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--dr-primary)', marginTop: '2px', fontWeight: '700' }}>Smakzie LB</p>
                </div>
                <div style={{ backgroundColor: 'var(--rd-primary-light)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <i className="fas fa-palette" style={{ fontSize: '1.5rem', color: 'var(--rd-primary)', marginBottom: '0.5rem', display: 'block' }}></i>
                  <h5 style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--dark)' }}>Rofi Design</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--rd-primary)', marginTop: '2px', fontWeight: '700' }}>Area Cianjur (Online)</p>
                </div>
              </div>
            )}

            <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.25rem', borderRadius: '16px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
              <i className="fas fa-shopping-bag" style={{ fontSize: '1.5rem', color: 'var(--dr-primary)', marginBottom: '0.25rem', display: 'block' }}></i>
              <h5 style={{ fontWeight: '800', fontSize: '0.875rem', color: 'var(--dark)' }}>Pengantaran Langsung Smakzie LB</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Siap antar tepat saat jam istirahat &amp; pulang sekolah</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
