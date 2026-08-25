import { useState } from 'react';
import designHero from '../assets/images/design_hero.png';
import { designServices, designCategories, MERCHANT_WA_NUMBER } from '../data/designData';
import PortfolioSection from '../components/PortfolioSection';
import TestimoniSection from '../components/TestimoniSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import MediaSosialSection from '../components/MediaSosialSection';
import CtaSection from '../components/CtaSection';

export default function RofiDesign() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = activeFilter === 'all'
    ? designServices
    : designServices.filter(s => s.category === activeFilter);

  const orderViaWA = (service) => {
    const msg = `Halo Rofi Design!\n\nSaya tertarik untuk memesan / konsultasi *${service.name}*.\n\nHarga: Rp ${service.price.toLocaleString('id-ID')}\nEstimasi: ${service.estimasi}\n\nMohon informasi lebih lanjut ya kang Rofi, terima kasih!`;
    window.open(`https://wa.me/${MERCHANT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const orderViaIG = () => {
    window.open('https://www.instagram.com/rofi_editz?igsh=MXIydXl6N3Q2cGNz', '_blank');
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--rd-bg)' }}>
      {/* =============== HERO =============== */}
      <section className="hero-section">
        <div className="app-container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge" style={{ color: 'var(--rd-primary)', backgroundColor: 'var(--rd-primary-light)' }}>
                <i className="fas fa-magic" style={{ color: 'var(--rd-secondary)' }}></i>
                <span>Studio Desain Grafis Profesional</span>
              </div>

              <h1 className="hero-title">
                Wujudkan Ide<br />
                <span className="rd-text">Kreatif</span> Menjadi Visual!
              </h1>

              <p className="hero-subtitle">
                Dari pembuatan Logo, Poster, Banner, Feed Instagram, hingga Editing Foto &amp; Sertifikat. Hasil berkualitas tinggi untuk menaikkan nilai brand Anda.
              </p>

              <div className="hero-buttons">
                <button
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-hero-primary btn-hero-design"
                >
                  <i className="fas fa-palette"></i> Lihat Layanan
                </button>
                <a
                  href={`https://wa.me/${MERCHANT_WA_NUMBER}?text=Halo%20Rofi%20Design!%20Saya%20ingin%20konsultasi%20desain.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-primary"
                  style={{ backgroundColor: 'var(--card-bg, #FFFFFF)', color: 'var(--rd-primary)', border: '2px solid var(--rd-primary)', textDecoration: 'none' }}
                >
                  <i className="fab fa-whatsapp"></i> Konsultasi Gratis
                </a>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                <span><i className="fas fa-check-circle" style={{ color: 'var(--rd-primary)', marginRight: '6px' }}></i> 500+ Proyek Selesai</span>
                <span><i className="fas fa-clock" style={{ color: 'var(--rd-secondary)', marginRight: '6px' }}></i> Pengerjaan 1-5 Hari</span>
              </div>
            </div>

            <div className="hero-img-box">
              <img src={designHero} alt="Rofi Design Studio" />
            </div>
          </div>
        </div>
      </section>

      {/* =============== SERVICES CATALOG =============== */}
      <section id="services" style={{ padding: '5rem 0' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="hero-badge" style={{ color: 'var(--rd-primary)', backgroundColor: 'var(--rd-primary-light)' }}>
              <i className="fas fa-th"></i> Katalog Layanan Desain
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark)', marginTop: '0.5rem' }}>
              Layanan Kreatif <span style={{ color: 'var(--rd-primary)' }}>Rofi Design</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Pilih layanan sesuai kebutuhan visual bisnis, organisasi, atau acara Anda.
            </p>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            {designCategories.map((cat) => (
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
                  backgroundColor: activeFilter === cat.key ? 'var(--rd-primary)' : 'var(--card-bg, #F9FAFB)',
                  color: activeFilter === cat.key ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: activeFilter === cat.key ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {filteredServices.map((service) => (
              <div key={service.id} className="card-box scale-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '2.5rem' }}>{service.icon}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', backgroundColor: 'var(--rd-primary-light)', color: 'var(--rd-primary)', padding: '4px 12px', borderRadius: '999px' }}>
                      ⏱️ {service.estimasi}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                    {service.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                    {service.desc}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Fitur Termasuk:
                    </span>
                    <ul style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {service.features.map((feat, idx) => (
                        <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fas fa-check" style={{ color: 'var(--rd-primary)', fontSize: '0.75rem' }}></i>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Mulai dari</span>
                    <span style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--rd-primary)' }}>
                      Rp {service.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setSelectedService(service)}
                      style={{ padding: '0.6rem 1rem', borderRadius: '999px', border: '1px solid var(--border-color)', background: 'var(--card-bg, #FFF)', color: 'var(--dark)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => orderViaWA(service)}
                      className="btn-hero-primary btn-hero-design"
                      style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== SECTION PORTOFOLIO ROFI DESIGN =============== */}
      <PortfolioSection />

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

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="modal-overlay active" onClick={() => setSelectedService(null)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dark)' }}>
                {selectedService.icon} {selectedService.name}
              </h3>
              <button onClick={() => setSelectedService(null)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>{selectedService.desc}</p>
              <div style={{ backgroundColor: 'var(--rd-primary-light)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--rd-primary)', display: 'block', marginBottom: '0.5rem' }}>Fasilitas Proyek:</span>
                {selectedService.features.map((f, i) => (
                  <div key={i} style={{ fontSize: '0.85rem', color: 'var(--dark)', marginBottom: '4px' }}>✓ {f}</div>
                ))}
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--rd-primary)' }}>
                Total: Rp {selectedService.price.toLocaleString('id-ID')}
              </div>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={orderViaIG}
                className="btn-hero-primary"
                style={{ background: 'linear-gradient(45deg, #f09433, #dc2743, #bc1888)', color: '#FFF', fontSize: '0.85rem', padding: '0.6rem 1rem' }}
              >
                <i className="fab fa-instagram"></i> DM IG (@rofi_editz)
              </button>
              <button onClick={() => orderViaWA(selectedService)} className="btn-hero-primary btn-hero-design" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
                <i className="fab fa-whatsapp"></i> Chat WA Desainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
