import { useState, useEffect } from 'react';

const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: "Siti Rahmawati",
    service: "Dapur Rofi",
    role: "Pelanggan Setia",
    rating: 5,
    message: "Ayam Bakar Madu & Seblaknya beneran ketagihan banget! Bumbunya meresap sampai ke dalam dan pedasnya pas banget. Pengiriman via WA juga cepat sekali!",
    date: "2 hari yang lalu",
    avatarColor: "var(--dr-primary)",
    isOwn: false
  },
  {
    id: 2,
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
    id: 3,
    name: "Anisa Putri",
    service: "Dapur Rofi",
    role: "Mahasiswi",
    rating: 5,
    message: "Risol mayo lumernya juara banget! Crispy di luar dan mayo creamy di dalam. Es Teh Jumbonya juga segar banget nemenin nugas kuliah.",
    date: "2 minggu yang lalu",
    avatarColor: "var(--dr-secondary)",
    isOwn: false
  },
  {
    id: 4,
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
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('rofi_testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TESTIMONIALS;
      }
    }
    return INITIAL_TESTIMONIALS;
  });

  // Track IDs created by current user session/device
  const [myIds, setMyIds] = useState(() => {
    const savedIds = localStorage.getItem('rofi_my_testimonial_ids');
    if (savedIds) {
      try {
        return JSON.parse(savedIds);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Form State
  const [name, setName] = useState('');
  const [service, setService] = useState('Dapur Rofi');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    localStorage.setItem('rofi_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('rofi_my_testimonial_ids', JSON.stringify(myIds));
  }, [myIds]);

  const triggerToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setService(item.service);
    setRating(item.rating);
    setMessage(item.message);

    // Scroll smoothly to form
    const formElement = document.getElementById('testimoni-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setService('Dapur Rofi');
    setRating(5);
    setMessage('');
  };

  const handleDelete = (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus testimoni buatan Anda ini?')) {
      return;
    }
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    setMyIds(prev => prev.filter(item => item !== id));

    if (editingId === id) {
      handleCancelEdit();
    }

    triggerToast('Testimoni Anda berhasil dihapus.', 'danger');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      return alert('Mohon lengkapi Nama dan Pesan testimoni Anda!');
    }

    if (editingId !== null) {
      // Update existing testimonial
      const updated = testimonials.map(t => {
        if (t.id === editingId) {
          return {
            ...t,
            name: name.trim(),
            service: service,
            rating: Number(rating),
            message: message.trim(),
            date: 'Diedit baru saja',
            avatarColor: service === 'Dapur Rofi' ? 'var(--dr-primary)' : 'var(--rd-primary)'
          };
        }
        return t;
      });
      setTestimonials(updated);
      triggerToast('Testimoni Anda berhasil diperbarui!');
      handleCancelEdit();
    } else {
      // Add new testimonial owned by user
      const newId = Date.now();
      const newTestimonial = {
        id: newId,
        name: name.trim(),
        service: service,
        role: service === 'Dapur Rofi' ? 'Pecinta Kuliner' : 'Klien Desain',
        rating: Number(rating),
        message: message.trim(),
        date: 'Baru saja',
        avatarColor: service === 'Dapur Rofi' ? 'var(--dr-primary)' : 'var(--rd-primary)',
        isOwn: true
      };

      setTestimonials([newTestimonial, ...testimonials]);
      setMyIds(prev => [...prev, newId]);
      triggerToast('Terima kasih! Testimoni Anda berhasil ditambahkan.');
      handleCancelEdit();
    }
  };

  return (
    <section id="testimoni" style={{ padding: '5rem 0' }}>
      <div className="app-container">
        {/* Toast Alert */}
        {toast.show && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: toast.type === 'danger' ? '#EF4444' : '#10B981',
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
            <i className={`fas ${toast.type === 'danger' ? 'fa-trash-alt' : 'fa-check-circle'}`}></i>
            {toast.message}
          </div>
        )}

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ color: 'var(--dr-primary)', backgroundColor: 'var(--dr-primary-light)' }}>
            <i className="fas fa-comment-dots"></i> Testimoni Pelanggan
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '0.5rem', color: 'var(--dark)' }}>
            Apa Kata <span className="dr-text">Pelanggan Kami?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            Ulasan jujur dan pengalaman kepuasan dari pelanggan Dapur Rofi &amp; klien Rofi Design.
          </p>
        </div>

        {/* Testimonial Form */}
        <div
          id="testimoni-form"
          className="card-box"
          style={{
            maxWidth: '680px',
            margin: '0 auto 4rem',
            padding: '2rem',
            borderRadius: '24px',
            border: editingId !== null ? '2px solid var(--dr-primary)' : '1px solid var(--border-color)',
            transition: 'var(--transition)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className={`fas ${editingId !== null ? 'fa-edit' : 'fa-pen-square'}`} style={{ color: 'var(--dr-primary)' }}></i>
              {editingId !== null ? 'Edit Testimoni Anda' : 'Tulis Testimoni Anda'}
            </h3>
            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#EF4444',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-times"></i> Batal Edit
              </button>
            )}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {editingId !== null
              ? 'Ubah rincian ulasan testimoni Anda di bawah ini lalu tekan tombol Simpan Perubahan.'
              : 'Bagikan pengalaman Anda menikmati produk Dapur Rofi atau layanan Rofi Design!'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Field 1: Nama */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--dark)' }}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--card-bg, #FFF)',
                    color: 'var(--dark)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              {/* Field 2: Pilih Layanan */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--dark)' }}>
                  Pilih Layanan *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--card-bg, #FFF)',
                    color: 'var(--dark)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Dapur Rofi">Dapur Rofi (Kuliner)</option>
                  <option value="Rofi Design">Rofi Design (Jasa Desain)</option>
                </select>
              </div>
            </div>

            {/* Field 3: Rating Star Picker */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--dark)' }}>
                Rating Kepuasan ⭐
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '1.6rem',
                      cursor: 'pointer',
                      color: star <= rating ? '#FF8F00' : 'var(--border-color)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    ★
                  </button>
                ))}
                <span style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  ({rating} / 5 Bintang)
                </span>
              </div>
            </div>

            {/* Field 4: Pesan */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: 'var(--dark)' }}>
                Pesan Testimoni *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan pengalaman atau saran kesan Anda di sini..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--card-bg, #FFF)',
                  color: 'var(--dark)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Submit & Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="btn-hero-primary"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'none'
                  }}
                >
                  Batal
                </button>
              )}

              <button
                type="submit"
                className="btn-hero-primary btn-hero-dapur"
                style={{ flexGrow: 1, justifyContent: 'center' }}
              >
                <i className={`fas ${editingId !== null ? 'fa-save' : 'fa-paper-plane'}`}></i>
                {editingId !== null ? 'Simpan Perubahan' : 'Kirim Testimoni'}
              </button>
            </div>
          </form>
        </div>

        {/* Testimonial List Cards */}
        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((item) => {
            // Check if current user is the owner of this testimonial
            const isOwner = myIds.includes(item.id) || item.isOwn === true;

            return (
              <div key={item.id} className="card-box scale-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                <div>
                  {/* Header Card (Stars, Service Badge, and Owner Edit/Delete Buttons) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '2px', color: '#FF8F00', fontSize: '1rem' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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

                      {/* ONLY SHOW Edit & Delete if user is the OWNER of this testimonial */}
                      {isOwner && (
                        <>
                          <button
                            onClick={() => handleEdit(item)}
                            title="Edit Testimoni Anda"
                            style={{
                              background: 'rgba(99, 102, 241, 0.12)',
                              border: 'none',
                              color: 'var(--rd-primary)',
                              cursor: 'pointer',
                              padding: '4px 8px',
                              fontSize: '0.85rem',
                              borderRadius: '6px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Hapus Testimoni Anda"
                            style={{
                              background: 'rgba(239, 68, 68, 0.12)',
                              border: 'none',
                              color: '#EF4444',
                              cursor: 'pointer',
                              padding: '4px 8px',
                              fontSize: '0.85rem',
                              borderRadius: '6px',
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <i className="fas fa-trash-alt"></i> Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                    "{item.message}"
                  </p>
                </div>

                {/* Author Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '9999px',
                      backgroundColor: item.avatarColor || 'var(--dr-primary)',
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

                  {isOwner && (
                    <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '6px' }}>
                      Ulasan Anda
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
