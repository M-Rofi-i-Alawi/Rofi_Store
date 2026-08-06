import { useState, useEffect, useRef } from 'react';

export default function StatistikSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      id: 1,
      target: 250,
      suffix: "+",
      label: "Pesanan Produk",
      subtext: "Hidangan lezat terkirim",
      icon: "fa-shopping-bag",
      color: "var(--dr-primary)",
      bg: "rgba(230, 74, 25, 0.1)"
    },
    {
      id: 2,
      target: 120,
      suffix: "+",
      label: "Project Desain",
      subtext: "Desain visual terselesaikan",
      icon: "fa-palette",
      color: "var(--rd-primary)",
      bg: "rgba(99, 102, 241, 0.1)"
    },
    {
      id: 3,
      target: 4.9,
      suffix: "",
      decimals: 1,
      label: "Rating Pelanggan",
      subtext: "Berdasarkan 300+ ulasan",
      icon: "fa-star",
      color: "#FF8F00",
      bg: "rgba(255, 143, 0, 0.1)"
    },
    {
      id: 4,
      target: 98,
      suffix: "%",
      label: "Customer Puas",
      subtext: "Tingkat kepuasan layanan",
      icon: "fa-smile-beam",
      color: "#25D366",
      bg: "rgba(37, 211, 102, 0.1)"
    }
  ];

  return (
    <section ref={sectionRef} className="statistik-section" style={{ padding: '4.5rem 0' }}>
      <div className="app-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ color: 'var(--dr-primary)' }}>
            <i className="fas fa-chart-line"></i> Rekam Jejak
          </span>
          <h2 style={{ fontSize: '2.35rem', fontWeight: '900', marginTop: '0.5rem' }}>
            Pencapaian &amp; Performa <span className="dr-text">Rofi Store</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            Kepercayaan pelanggan adalah kebanggaan kami. Berikut adalah ringkasan dampak dan layanan yang telah kami berikan.
          </p>
        </div>

        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="card-box scale-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem 1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: stat.bg,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '1.25rem'
                }}
              >
                <i className={`fas ${stat.icon}`}></i>
              </div>

              <CounterNumber
                target={stat.target}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
                isVisible={isVisible}
                color={stat.color}
              />

              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginTop: '0.35rem', marginBottom: '0.25rem' }}>
                {stat.label}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterNumber({ target, suffix, decimals, isVisible, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1800; // 1.8 seconds
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div style={{ fontSize: '2.75rem', fontWeight: '900', color: color || 'inherit', lineHeight: 1 }}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </div>
  );
}
