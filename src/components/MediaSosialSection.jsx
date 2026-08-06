export default function MediaSosialSection() {
  const socials = [
    {
      name: 'TikTok',
      handle: '@rofi_editz',
      icon: 'fab fa-tiktok',
      color: 'linear-gradient(135deg, #000000 0%, #25F4EE 50%, #FE2C55 100%)',
      link: 'https://www.tiktok.com/@rofi_editz?_r=1&_t=ZS-98ZG8RlHiHo'
    },
    {
      name: 'Instagram',
      handle: '@rofi_editz',
      icon: 'fab fa-instagram',
      color: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      link: 'https://www.instagram.com/rofi_editz?igsh=MXIydXl6N3Q2cGNz'
    }
  ];

  return (
    <section id="media-sosial" style={{ padding: '4.5rem 0' }}>
      <div className="app-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ color: 'var(--rd-primary)', backgroundColor: 'var(--rd-primary-light)' }}>
            <i className="fas fa-share-alt"></i> Terhubung Bersama Kami
          </span>
          <h2 style={{ fontSize: '2.35rem', fontWeight: '900', marginTop: '0.5rem', color: 'var(--dark)' }}>
            Ikuti Media Sosial <span className="rd-text">Rofi Store</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0.5rem auto 0' }}>
            Dapatkan update menu terbaru Dapur Rofi dan inspirasi desain kreatif dari Rofi Design setiap hari.
          </p>
        </div>

        {/* Social Grid - Exactly 3 Platforms */}
        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem', maxWidth: '960px', margin: '0 auto' }}>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-box scale-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1.5rem',
                textDecoration: 'none',
                borderRadius: '24px',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '20px',
                  background: social.color,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '1.25rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }}
              >
                <i className={social.icon}></i>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '4px' }}>
                {social.name}
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {social.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
