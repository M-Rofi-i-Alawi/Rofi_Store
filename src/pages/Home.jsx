import { Link } from 'react-router-dom';
import storeHero from '../assets/images/store_hero.png';
import StatistikSection from '../components/StatistikSection';
import ProdukPilihanSection from '../components/ProdukPilihanSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimoniSection from '../components/TestimoniSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import MediaSosialSection from '../components/MediaSosialSection';
import CtaSection from '../components/CtaSection';

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* =============== HERO SECTION =============== */}
      <section className="hero-section">
        <div className="app-container">
          <div className="hero-grid">
            {/* Left Content */}
            <div>
              <div className="hero-badge">
                <i className="fas fa-store" style={{ color: 'var(--dr-primary)' }}></i>
                <span>Platform Bisnis Terpadu</span>
              </div>

              <h1 className="hero-title">
                Satu Platform,<br />
                <span className="dr-text">Kuliner Lezat</span> &amp;<br />
                <span className="rd-text">Desain Kreatif</span>
              </h1>

              <p className="hero-subtitle">
                Rofi Store menghadirkan dua layanan terbaik: sajian kuliner otentik dari{' '}
                <strong style={{ color: 'var(--dr-primary)' }}>Dapur Rofi</strong> dan jasa desain grafis profesional dari{' '}
                <strong style={{ color: 'var(--rd-primary)' }}>Rofi Design</strong>.
              </p>

              <div className="hero-buttons">
                <Link to="/dapur-rofi" className="btn-hero-primary btn-hero-dapur">
                  <i className="fas fa-utensils"></i>
                  <span>Dapur Rofi</span>
                </Link>
                <Link to="/rofi-design" className="btn-hero-primary btn-hero-design">
                  <i className="fas fa-palette"></i>
                  <span>Rofi Design</span>
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                <span><i className="fas fa-star" style={{ color: '#FF8F00', marginRight: '6px' }}></i> Rating 4.9/5</span>
                <span><i className="fas fa-shield-alt" style={{ color: '#25D366', marginRight: '6px' }}></i> Terpercaya &amp; Halal</span>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="hero-img-box">
              <img
                src={storeHero}
                alt="Rofi Store Showcase"
                style={{ width: '100%', borderRadius: '24px', boxShadow: 'var(--shadow-lg)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =============== STATISTIK COUNTER =============== */}
      <StatistikSection />

      {/* =============== PRODUK PILIHAN DAPUR ROFI =============== */}
      <ProdukPilihanSection />

      {/* =============== PORTOFOLIO ROFI DESIGN =============== */}
      <PortfolioSection />

      {/* =============== TENTANG KAMI =============== */}
      <section style={{ padding: '5rem 0' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
              <i className="fas fa-heart"></i> Mengenal Kami
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark)', marginTop: '0.5rem' }}>
              Cerita di Balik <span className="dr-text">Rofi Store</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Berawal dari passion terhadap kuliner otentik dan kreativitas visual, kami siap memberikan kualitas terbaik untuk Anda.
            </p>
          </div>

          <div className="grid-cards">
            <div className="card-box">
              <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: 'var(--dr-primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--dark)' }}>Visi Kami</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Menjadi brand lokal terdepan yang mengintegrasikan kenikmatan kuliner otentik dan kreativitas desain grafis secara profesional.
              </p>
            </div>

            <div className="card-box">
              <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: 'var(--rd-primary)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                <i className="fas fa-rocket"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--dark)' }}>Misi Kami</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Menyajikan makanan segar bernutrisi dan karya desain visual berkualitas tinggi dengan harga yang bersahabat.
              </p>
            </div>

            <div className="card-box">
              <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: 'var(--accent-wa)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                <i className="fas fa-gem"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--dark)' }}>Nilai Utama</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Bahan 100% Halal, estetika visual presisi, serta respon cepat via WhatsApp untuk kenyamanan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =============== DUA LINI BISNIS =============== */}
      <section style={{ padding: '5rem 0' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="hero-badge" style={{ color: 'var(--rd-primary)', backgroundColor: 'var(--rd-primary-light)' }}>
              <i className="fas fa-th-large"></i> Pilih Layanan
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark)', marginTop: '0.5rem' }}>
              Dua Lini Usaha <span className="rd-text">Rofi Store</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Dapur Rofi Card */}
            <Link to="/dapur-rofi" style={{ textDecoration: 'none' }}>
              <div className="card-box scale-hover" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--dr-primary), var(--dr-secondary))', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                    <i className="fas fa-utensils"></i>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--dr-primary)', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'var(--dr-primary-light)', padding: '4px 12px', borderRadius: '999px' }}>
                    Produk Makanan &amp; Minuman
                  </span>
                  <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--dark)', margin: '0.75rem 0 0.5rem' }}>
                    Dapur <span style={{ color: 'var(--dr-primary)' }}>Rofi</span>
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
                    Seblak Pedas, Mie Pedas, Ayam Bakar Madu, Risol Mayo, dan Minuman Segar. Olahan higienis, 100% Halal, siap antar hangat.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontWeight: '800', color: 'var(--dr-primary)' }}>
                  <span>Buka Katalog Menu &rarr;</span>
                </div>
              </div>
            </Link>

            {/* Rofi Design Card */}
            <Link to="/rofi-design" style={{ textDecoration: 'none' }}>
              <div className="card-box scale-hover" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--rd-primary), var(--rd-secondary))', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>
                    <i className="fas fa-palette"></i>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--rd-primary)', textTransform: 'uppercase', letterSpacing: '1px', backgroundColor: 'var(--rd-primary-light)', padding: '4px 12px', borderRadius: '999px' }}>
                    Jasa Desain Grafis
                  </span>
                  <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--dark)', margin: '0.75rem 0 0.5rem' }}>
                    Rofi <span style={{ color: 'var(--rd-primary)' }}>Design</span>
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
                    Layanan profesional untuk Desain Logo, Poster, Banner, Feed Instagram, Editing Foto, ID Card, dan Sertifikat.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontWeight: '800', color: 'var(--rd-primary)' }}>
                  <span>Buka Katalog Jasa &rarr;</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =============== TESTIMONI & FORM =============== */}
      <TestimoniSection />

      {/* =============== FAQ & KONTAK =============== */}
      <FAQSection />
      <ContactSection />

      {/* =============== MEDIA SOSIAL =============== */}
      <MediaSosialSection />

      {/* =============== CALL TO ACTION =============== */}
      <CtaSection />
    </div>
  );
}
