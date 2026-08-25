import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('rofi_admin_auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Username atau password salah!');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      padding: '1rem',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '3rem 2.5rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
      }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #E64A19, #FF8F00)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.75rem',
            color: '#FFF'
          }}>
            <i className="fas fa-lock"></i>
          </div>
          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: '900',
            color: '#F8FAFC',
            marginBottom: '0.4rem',
            letterSpacing: '-0.02em'
          }}>
            Admin Panel
          </h1>
          <p style={{
            fontSize: '0.9rem',
            color: '#94A3B8',
            fontWeight: '500'
          }}>
            Masuk ke Dashboard Dapur Rofi
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#94A3B8',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-user" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B',
                fontSize: '0.9rem'
              }}></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#F1F5F9',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E64A19'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#94A3B8',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-key" style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748B',
                fontSize: '0.9rem'
              }}></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                required
                style={{
                  width: '100%',
                  padding: '0.85rem 0.85rem 0.85rem 2.75rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#F1F5F9',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E64A19'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              color: '#FCA5A5',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: loading
                ? 'rgba(230, 74, 25, 0.5)'
                : 'linear-gradient(135deg, #E64A19, #FF8F00)',
              color: '#FFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '800',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              letterSpacing: '0.02em'
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Memproses...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Masuk Dashboard
              </>
            )}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          <a
            href="/"
            style={{
              color: '#64748B',
              fontSize: '0.85rem',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#E64A19'}
            onMouseLeave={(e) => e.target.style.color = '#64748B'}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: '6px' }}></i>
            Kembali ke Halaman Utama
          </a>
        </div>
      </div>
    </div>
  );
}
