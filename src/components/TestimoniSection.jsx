import { useState, useEffect } from 'react';
import { useFocusMode } from '../context/FocusModeContext';
import { supabase } from '../lib/supabase';

// Warna avatar berdasarkan huruf pertama nama
const AVATAR_COLORS = [
  '#E64A19', '#FF8F00', '#7C3AED', '#059669', '#EC4899',
  '#6366F1', '#0EA5E9', '#D97706', '#DC2626', '#8B5CF6'
];

function getAvatarColor(name) {
  const charCode = (name || 'A').charCodeAt(0);
  return AVATAR_COLORS[charCode % AVATAR_COLORS.length];
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari yang lalu`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)} minggu yang lalu`;
  return `${Math.floor(diff / 2592000)} bulan yang lalu`;
}

export default function TestimoniSection() {
  const { isFokus, fokusBrand } = useFocusMode();
  const isDapurMode = isFokus && fokusBrand === 'dapur';

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formClass, setFormClass] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formMessage, setFormMessage] = useState('');
  const [formProduct, setFormProduct] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch reviews from Supabase
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter by service/brand
      const filtered = isDapurMode
        ? (data || []).filter(r => r.service === 'Dapur Rofi')
        : (data || []);

      setReviews(filtered);
    } catch (err) {
      console.error('Gagal memuat ulasan:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [isDapurMode]);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formMessage.trim()) {
      return alert('Mohon isi Nama dan Ulasan Anda!');
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('reviews').insert({
        name: formName.trim(),
        role: formClass.trim() || 'Pelanggan',
        rating: formRating,
        message: formMessage.trim(),
        product: formProduct.trim() || null,
        service: 'Dapur Rofi'
      });

      if (error) throw error;

      setSubmitSuccess(true);
      setFormName('');
      setFormClass('');
      setFormRating(5);
      setFormMessage('');
      setFormProduct('');
      setShowForm(false);

      // Refresh reviews
      await fetchReviews();

      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal mengirim ulasan:', err);
      alert('Gagal mengirim ulasan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate stats
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  const totalReviews = reviews.length;
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const fiveStarPercent = totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 0;

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--dark)',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--dark)',
    marginBottom: '0.35rem'
  };

  return (
    <section id="testimoni" style={{ padding: '5rem 0' }}>
      <div className="app-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="hero-badge" style={{ color: isDapurMode ? 'var(--dr-primary)' : 'var(--rd-primary)', backgroundColor: isDapurMode ? 'var(--dr-primary-light)' : 'var(--rd-primary-light)' }}>
            <i className="fas fa-star"></i> Ulasan & Rating Pelanggan
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.5rem', color: 'var(--dark)' }}>
            Apa Kata <span className={isDapurMode ? 'dr-text' : 'rd-text'}>Pelanggan Kami?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            Ulasan jujur dari pelanggan yang sudah memesan dan merasakan langsung produk kami.
          </p>
        </div>

        {/* Rating Summary Stats */}
        {totalReviews > 0 && (
          <div
            className="card-box"
            style={{
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              padding: '1.5rem 2rem',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              background: isDapurMode
                ? 'linear-gradient(135deg, rgba(230, 74, 25, 0.06) 0%, rgba(255, 143, 0, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(230, 74, 25, 0.1) 100%)',
              border: `1px solid ${isDapurMode ? 'rgba(230, 74, 25, 0.15)' : 'rgba(99, 102, 241, 0.15)'}`
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: '900', color: isDapurMode ? 'var(--dr-primary)' : 'var(--rd-primary)', lineHeight: 1 }}>
                {avgRating}
              </div>
              <div style={{ display: 'flex', gap: '2px', color: '#FF8F00', fontSize: '1.1rem', justifyContent: 'center', margin: '4px 0' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ opacity: i < Math.round(parseFloat(avgRating)) ? 1 : 0.25 }}>★</span>
                ))}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                {totalReviews} ulasan
              </div>
            </div>

            <div style={{ height: '60px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#059669', lineHeight: 1 }}>
                {fiveStarPercent}%
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>
                Rating Bintang 5
              </div>
            </div>

            <div style={{ height: '60px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#FF8F00', lineHeight: 1 }}>
                {totalReviews}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>
                Total Ulasan
              </div>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {submitSuccess && (
          <div style={{
            maxWidth: '500px',
            margin: '0 auto 1.5rem',
            padding: '0.85rem 1.25rem',
            borderRadius: '14px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#065F46',
            fontWeight: '700',
            fontSize: '0.9rem',
            textAlign: 'center',
            animation: 'fadeInUp 0.4s ease'
          }}>
            <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i>
            Terima kasih! Ulasan Anda berhasil dikirim.
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--dr-primary)', marginBottom: '1rem' }}></i>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Memuat ulasan...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div
            className="card-box"
            style={{
              textAlign: 'center',
              padding: '3rem 1.5rem',
              maxWidth: '560px',
              margin: '0 auto 2rem',
              borderRadius: '24px'
            }}
          >
            <i className="fas fa-star" style={{ fontSize: '3rem', color: '#FF8F00', marginBottom: '1rem', opacity: 0.8 }}></i>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>
              Belum Ada Ulasan
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Jadilah yang pertama memberikan ulasan! Klik tombol di bawah untuk menulis ulasan Anda.
            </p>
          </div>
        ) : (
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {reviews.map((item) => (
              <div key={item.id} className="card-box scale-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#FF8F00', fontSize: '1rem' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                      {[...Array(5 - item.rating)].map((_, i) => (
                        <span key={`empty-${i}`} style={{ opacity: 0.2 }}>★</span>
                      ))}
                    </div>

                    {item.product && (
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: 'var(--dr-primary-light)',
                        color: 'var(--dr-primary)'
                      }}>
                        {item.product}
                      </span>
                    )}
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
                    backgroundColor: getAvatarColor(item.name),
                    color: '#FFFFFF',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0
                  }}>
                    {(item.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--dark)', margin: 0 }}>{item.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.role || 'Pelanggan'} &bull; {timeAgo(item.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Write Review Button / Form */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="btn-hero-primary btn-hero-dapur"
              style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
            >
              <i className="fas fa-pen"></i> Tulis Ulasan
            </button>
          ) : (
            <div
              className="card-box"
              style={{
                maxWidth: '580px',
                margin: '0 auto',
                padding: '2rem',
                borderRadius: '24px',
                textAlign: 'left',
                border: '2px solid var(--dr-primary)',
                background: 'linear-gradient(135deg, rgba(230, 74, 25, 0.03) 0%, rgba(255, 143, 0, 0.06) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--dark)', margin: 0 }}>
                  <i className="fas fa-pen" style={{ color: 'var(--dr-primary)', marginRight: '8px' }}></i>
                  Tulis Ulasan Anda
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 }}
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Nama *</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Nama kamu"
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Kelas / Jabatan</label>
                    <input
                      type="text"
                      value={formClass}
                      onChange={(e) => setFormClass(e.target.value)}
                      placeholder="Contoh: RPL 2"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Produk yang Diulas</label>
                  <select
                    value={formProduct}
                    onChange={(e) => setFormProduct(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">-- Pilih Produk --</option>
                    <option value="Cicos Bumbu Seblak">Cicos Bumbu Seblak</option>
                    <option value="Dessert Ubi Ungu Keju">Dessert Ubi Ungu Keju</option>
                    <option value="Pisang Coklat">Pisang Coklat</option>
                    <option value="Pisang Matcha">Pisang Matcha</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Rating *</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1.8rem',
                          cursor: 'pointer',
                          color: star <= formRating ? '#FF8F00' : '#D1D5DB',
                          transition: 'transform 0.15s, color 0.15s',
                          transform: star <= formRating ? 'scale(1.15)' : 'scale(1)',
                          padding: '2px'
                        }}
                      >
                        ★
                      </button>
                    ))}
                    <span style={{ alignSelf: 'center', marginLeft: '8px', fontWeight: '800', color: 'var(--dr-primary)', fontSize: '0.95rem' }}>
                      {formRating}/5
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Ulasan *</label>
                  <textarea
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Ceritakan pengalaman kamu memesan dan mencoba produk Dapur Rofi..."
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-hero-primary btn-hero-dapur"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.9rem',
                    fontSize: '1rem',
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Mengirim...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Kirim Ulasan</>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
