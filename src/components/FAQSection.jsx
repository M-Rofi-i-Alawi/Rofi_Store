import { useState } from 'react';

const faqData = [
  {
    q: "Bagaimana cara memesan makanan di Dapur Rofi?",
    a: "Anda dapat memilih menu favorit pada katalog Dapur Rofi, lalu klik tombol 'Pesan via WhatsApp'. Sistem akan memformat rincian pesanan Anda dan langsung membukanya di aplikasi WhatsApp."
  },
  {
    q: "Bagaimana cara memesan jasa desain di Rofi Design?",
    a: "Pilih jasa desain yang Anda butuhkan di halaman Rofi Design, lalu tekan tombol 'Konsultasi / Pesan via WA'. Anda bisa berkonsultasi mengenai brief desain dan estimasi pengerjaan."
  },
  {
    q: "Berapa lama estimasi pengerjaan desain?",
    a: "Waktu pengerjaan standar berkisar 1-5 hari kerja tergantung jenis layanan: Desain Logo (3-5 hari), Poster/Banner/Sertifikat (1-2 hari), Feed Instagram & Editing Foto (1 hari)."
  },
  {
    q: "Apakah produk makanan Dapur Rofi 100% Halal?",
    a: "Ya! Seluruh bahan makanan, bumbu rempah, dan proses pengolahan di Dapur Rofi dijamin 100% Halal, higienis, dan tanpa bahan pengawet sintetik."
  },
  {
    q: "Metode pembayaran apa saja yang didukung?",
    a: "Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BRI), E-Wallet (GoPay, OVO, ShopeePay, DANA), QRIS, serta Cash on Delivery (COD) khusus area Cianjur."
  },
  {
    q: "Apakah layanan desain grafis termasuk revisi?",
    a: "Tentu! Setiap pesanan desain sudah termasuk jatah revisi gratis (1-3x revisi) untuk memastikan hasil akhir sesuai dengan kebutuhan brand atau acara Anda."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" style={{ padding: '5rem 0' }}>
      <div className="app-container" style={{ maxWidth: '840px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="hero-badge" style={{ color: 'var(--rd-primary)', backgroundColor: 'var(--rd-primary-light)' }}>
            <i className="fas fa-question-circle"></i> Pertanyaan Umum
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '900', color: 'var(--dark)', marginTop: '0.5rem' }}>
            Frequently Asked <span className="rd-text">Questions</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                style={{
                  border: isOpen ? '1px solid var(--rd-primary)' : '1px solid var(--border-color)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                  backgroundColor: isOpen ? 'var(--rd-primary-light)' : 'var(--card-bg)'
                }}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: '800',
                    fontSize: '1rem',
                    color: 'var(--dark)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ color: 'var(--dark)' }}>{item.q}</span>
                  <i
                    className={`fas fa-chevron-down`}
                    style={{
                      color: 'var(--rd-primary)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      marginLeft: '1rem'
                    }}
                  ></i>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.7' }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
