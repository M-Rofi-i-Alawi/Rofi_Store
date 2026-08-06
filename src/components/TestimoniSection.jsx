import { useState } from 'react';
import { useFocusMode } from '../context/FocusModeContext';

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Budi Santoso",
    service: "Rofi Design",
    role: "Pemilik UMKM Kopi",
    rating: 5,
    message: "Pesan desain logo & banner toko di Rofi Design hasilnya super profesional! Pengerjaannya cepat 2 hari selesai dan revisinya komunikatif ramah.",
    date: "1 minggu yang lalu",
    avatarColor: "var(--rd-primary)",
    isOwn: false
  },
  {
    id: 2,
    name: "Dimas Firmansyah",
    service: "Rofi Design",
    role: "Ketua Event Panitia",
    rating: 5,
    message: "Poster acara dan Sertifikat dari Rofi Design bikin event kampus kami terlihat mewah dan resmi. Terima kasih banyak Rofi Design!",
    date: "3 minggu yang lalu",
    avatarColor: "var(--rd-secondary)",
    isOwn: false
  }
];

export default function TestimoniSection() {
  const { isFokus, fokusBrand } = useFocusMode();
  const [testimonials] = useState(INITIAL_TESTIMONIALS);

  // Filter testimonials: if in Dapur Rofi mode, only show Dapur Rofi ones (currently empty for Dapur Rofi)
  const isDapurMode = isFokus && fokusBrand === 'dapur';
  const displayTestimonials = isDapurMode
    ? testimonials.filter(t => t.service === 'Dapur Rofi')
    : testimonials;

  return (
    <section id="testimoni" style={{ padding: '5rem 0' }}>
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
            <i className="fas fa-comment-dots"></i> Testimoni Pelanggan
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.5rem', color: 'var(--dark)' }}>
            Apa Kata <span className="dr-text">Pelanggan Kami?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            Ulasan jujur dan pengalaman kepuasan dari pelanggan kami.
          </p>
        </div>

        {/* Testimonial List Cards */}
        {displayTestimonials.length === 0 ? (
          <div
            className="card-box"
            style={{
              textAlign: 'center',
              padding: '3rem 1.5rem',
              maxWidth: '560px',
              margin: '0 auto',
              borderRadius: '24px'
            }}
          >
            <i className="fas fa-star" style={{ fontSize: '3rem', color: '#FF8F00', marginBottom: '1rem', opacity: 0.8 }}></i>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>
              Belum Ada Ulasan Dapur Rofi
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Ditunggu ulasan pertama Anda! Stay tuned terus untuk mendapatkan produk baru selanjutnya ✨
            </p>
          </div>
        ) : (
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {displayTestimonials.map((item) => (
              <div key={item.id} className="card-box scale-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#FF8F00', fontSize: '1rem' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>

                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      backgroundColor: item.service === 'Dapur Rofi' ? 'var(--dr-primary-light)' : 'var(--rd-primary-light)',
                      color: item.service === 'Dapur Rofi' ? 'var(--dr-primary)' : 'var(--rd-primary)'
                    }}>
                      {item.service}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    "{item.message}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '9999px',
                    backgroundColor: item.avatarColor || 'var(--rd-primary)',
                    color: '#FFFFFF',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--dark)', margin: 0 }}>{item.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.role || 'Pelanggan'} &bull; {item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
