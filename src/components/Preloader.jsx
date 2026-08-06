import { useState, useEffect } from 'react';
import { useFocusMode } from '../context/FocusModeContext';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { isFokus, fokusBrand } = useFocusMode();

  useEffect(() => {
    let minTimePassed = false;
    let windowLoaded = document.readyState === 'complete';

    const triggerExit = () => {
      if (minTimePassed && windowLoaded) {
        setFadeOut(true);
        setTimeout(() => setLoading(false), 600); // smooth CSS fade-out transition
      }
    };

    // Minimum animation time for smooth visual experience (1.2s)
    const minTimer = setTimeout(() => {
      minTimePassed = true;
      triggerExit();
    }, 1200);

    // Event listener for real network asset loading
    const handleLoad = () => {
      windowLoaded = true;
      triggerExit();
    };

    if (!windowLoaded) {
      window.addEventListener('load', handleLoad);
    }

    // Safety fallback timer for slow connection (max 3.5s)
    const maxTimer = setTimeout(() => {
      windowLoaded = true;
      minTimePassed = true;
      triggerExit();
    }, 3500);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!loading) return null;

  const isDapurFokus = isFokus && fokusBrand === 'dapur';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto'
      }}
    >
      {/* Decorative Background Pulsing Glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: isDapurFokus
            ? 'radial-gradient(circle, rgba(230, 74, 25, 0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
          animation: 'splashPulse 2s infinite ease-in-out',
          pointerEvents: 'none'
        }}
      />

      {/* Main Logo Container */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Animated Icon Box */}
        <div
          style={{
            width: '90px',
            height: '90px',
            margin: '0 auto 1.5rem',
            borderRadius: '26px',
            background: isDapurFokus
              ? 'linear-gradient(135deg, #E64A19 0%, #FF8F00 100%)'
              : 'linear-gradient(135deg, #6366F1 0%, #E64A19 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.75rem',
            color: '#FFFFFF',
            boxShadow: isDapurFokus
              ? '0 16px 40px rgba(230, 74, 25, 0.45)'
              : '0 16px 40px rgba(99, 102, 241, 0.45)',
            animation: 'splashScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
          }}
        >
          <i className={`fas ${isDapurFokus ? 'fa-utensils' : 'fa-store'}`}></i>
        </div>

        {/* Animated Brand Title */}
        <h1
          style={{
            fontSize: '2.4rem',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            marginBottom: '0.4rem',
            color: '#FFFFFF',
            animation: 'splashFadeUp 0.9s ease forwards'
          }}
        >
          {isDapurFokus ? (
            <>
              Dapur <span style={{ color: '#FF8F00' }}>Rofi</span>
            </>
          ) : (
            <>
              Rofi <span style={{ color: '#E64A19' }}>Store</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '0.95rem',
            color: '#94A3B8',
            fontWeight: '600',
            letterSpacing: '0.04em',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            animation: 'splashFadeUp 1.1s ease forwards'
          }}
        >
          {isDapurFokus ? 'Kuliner Otentik & Lezat' : 'Kuliner & Desain Grafis'}
        </p>

        {/* Loading Progress Bar Indicator */}
        <div
          style={{
            width: '160px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '9999px',
            margin: '0 auto',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              background: isDapurFokus
                ? 'linear-gradient(90deg, #E64A19, #FF8F00)'
                : 'linear-gradient(90deg, #6366F1, #E64A19)',
              borderRadius: '9999px',
              animation: 'splashProgress 1.7s cubic-bezier(0.4, 0, 0.2, 1) infinite'
            }}
          />
        </div>
      </div>
    </div>
  );
}
