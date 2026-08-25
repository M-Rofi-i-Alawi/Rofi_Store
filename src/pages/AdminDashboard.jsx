import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem('rofi_admin_auth') !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch orders & stock
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        const { data: stockData } = await supabase
          .from('stock')
          .select('*');

        if (ordersData) setOrders(ordersData);
        if (stockData) setStocks(stockData);
      } catch (err) {
        console.error('Gagal fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Real-time subscription for new orders
    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.eventType === 'INSERT' && payload.new) {
          setOrders(prev => [payload.new, ...prev]);
        }
        if (payload.eventType === 'UPDATE' && payload.new) {
          setOrders(prev => prev.map(o => o.id === payload.new.id ? payload.new : o));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stock' }, (payload) => {
        if (payload.new) {
          setStocks(prev => prev.map(s => s.product_id === payload.new.product_id ? payload.new : s));
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('rofi_admin_auth');
    navigate('/admin');
  };

  const toggleOrderStatus = async (order) => {
    const newStatus = order.status === 'pending' ? 'selesai' : 'pending';
    try {
      await supabase.from('orders').update({ status: newStatus }).eq('id', order.id);
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Gagal mengubah status: ' + err.message);
    }
  };

  const updateStock = async (productId, newQty) => {
    try {
      await supabase.from('stock').update({ quantity: newQty }).eq('product_id', productId);
      setStocks(prev => prev.map(s => s.product_id === productId ? { ...s, quantity: newQty } : s));
    } catch (err) {
      alert('Gagal update stok: ' + err.message);
    }
  };

  // Stats calculations
  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today);
  const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const cardStyle = {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94A3B8',
        fontSize: '1.1rem',
        fontFamily: "'Inter', sans-serif"
      }}>
        <i className="fas fa-spinner fa-spin" style={{ marginRight: '10px' }}></i> Memuat Dashboard...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: '#F1F5F9'
    }}>
      {/* Top Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #E64A19, #FF8F00)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            color: '#FFF'
          }}>
            <i className="fas fa-chart-line"></i>
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0 }}>
              Dashboard Admin
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0 }}>Dapur Rofi</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="/" style={{
            padding: '0.5rem 1rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: '#94A3B8',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: '700',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <i className="fas fa-store"></i> Lihat Web
          </a>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#FCA5A5',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { icon: 'fa-shopping-bag', label: 'Pesanan Hari Ini', value: todayOrders.length, color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
            { icon: 'fa-money-bill-wave', label: 'Pendapatan Hari Ini', value: `Rp ${todayRevenue.toLocaleString('id-ID')}`, color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
            { icon: 'fa-clock', label: 'Pesanan Pending', value: pendingCount, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
            { icon: 'fa-chart-bar', label: 'Total Pendapatan', value: `Rp ${totalRevenue.toLocaleString('id-ID')}`, color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
          ].map((stat, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.color,
                  fontSize: '1.1rem'
                }}>
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>{stat.label}</span>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#F8FAFC' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Stok Management */}
        {stocks.length > 0 && (
          <div style={{ ...cardStyle, marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fas fa-boxes" style={{ color: '#FF8F00' }}></i> Kelola Stok Produk
            </h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {stocks.map(s => (
                <div key={s.product_id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(15,23,42,0.5)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  flex: '1 1 250px'
                }}>
                  <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: '700', color: '#CBD5E1' }}>
                    {s.product_name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateStock(s.product_id, Math.max(0, s.quantity - 1))}
                      style={{
                        width: '30px', height: '30px', borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(239,68,68,0.15)',
                        color: '#FCA5A5', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '800'
                      }}
                    >−</button>
                    <span style={{
                      minWidth: '40px', textAlign: 'center', fontSize: '1.1rem',
                      fontWeight: '900', color: s.quantity > 0 ? '#10B981' : '#EF4444'
                    }}>
                      {s.quantity}
                    </span>
                    <button
                      onClick={() => updateStock(s.product_id, s.quantity + 1)}
                      style={{
                        width: '30px', height: '30px', borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(16,185,129,0.15)',
                        color: '#6EE7B7', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '800'
                      }}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Table */}
        <div style={cardStyle}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <i className="fas fa-receipt" style={{ color: '#3B82F6' }}></i> Daftar Pesanan ({filteredOrders.length})
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'pending', 'selesai'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: filterStatus === status ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: filterStatus === status
                      ? (status === 'pending' ? '#F59E0B' : status === 'selesai' ? '#10B981' : '#3B82F6')
                      : 'transparent',
                    color: filterStatus === status ? '#FFF' : '#94A3B8',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {status === 'all' ? 'Semua' : status}
                </button>
              ))}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#64748B'
            }}>
              <i className="fas fa-inbox" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}></i>
              <p style={{ fontWeight: '700', fontSize: '1rem' }}>Belum ada pesanan</p>
              <p style={{ fontSize: '0.85rem' }}>Pesanan akan muncul di sini secara otomatis saat pembeli melakukan checkout.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: '0 0.5rem',
                fontSize: '0.85rem'
              }}>
                <thead>
                  <tr style={{ color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', fontWeight: '700' }}>Waktu</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', fontWeight: '700' }}>Pemesan</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', fontWeight: '700' }}>Kelas</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', fontWeight: '700' }}>Pesanan</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontWeight: '700' }}>Total</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'center', fontWeight: '700' }}>Bayar</th>
                    <th style={{ padding: '0.5rem 0.75rem', textAlign: 'center', fontWeight: '700' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => {
                    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                    const isPending = order.status === 'pending';

                    return (
                      <tr
                        key={order.id}
                        style={{
                          backgroundColor: 'rgba(15,23,42,0.4)',
                          borderRadius: '12px',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <td style={{ padding: '0.85rem 0.75rem', borderRadius: '12px 0 0 12px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                          {formatTime(order.created_at)}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', fontWeight: '700', color: '#F1F5F9' }}>
                          {order.customer_name}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', color: '#94A3B8' }}>
                          {order.customer_class}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', color: '#CBD5E1' }}>
                          {Array.isArray(items) ? items.map((it, i) => (
                            <div key={i} style={{ fontSize: '0.82rem' }}>
                              {it.name} × {it.qty}
                            </div>
                          )) : '-'}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', textAlign: 'right', fontWeight: '800', color: '#10B981' }}>
                          Rp {(order.total_amount || 0).toLocaleString('id-ID')}
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center' }}>
                          <span style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: 'rgba(59,130,246,0.12)',
                            color: '#60A5FA'
                          }}>
                            {order.payment_method}
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem 0.75rem', textAlign: 'center', borderRadius: '0 12px 12px 0' }}>
                          <button
                            onClick={() => toggleOrderStatus(order)}
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: '8px',
                              border: 'none',
                              fontSize: '0.75rem',
                              fontWeight: '800',
                              cursor: 'pointer',
                              backgroundColor: isPending ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                              color: isPending ? '#FBBF24' : '#6EE7B7',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              transition: 'all 0.2s'
                            }}
                          >
                            <i className={`fas ${isPending ? 'fa-clock' : 'fa-check-circle'}`}></i>
                            {isPending ? 'Pending' : 'Selesai'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
