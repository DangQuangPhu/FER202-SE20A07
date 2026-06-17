import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { ShieldCheck, UserCircle, LogOut, Mail, Phone, Calendar, Shield } from 'lucide-react';

export default function LoginPage() {
  const { login, logout, loading, error, currentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // If already logged in and no modal is showing, redirect immediately
  useEffect(() => {
    if (currentUser && !showModal) {
      navigate('/users', { replace: true });
    }
  }, [currentUser, showModal, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await login(username.trim(), password);
    if (success) {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (currentUser) {
      navigate('/users', { replace: true });
    }
  };

  // If redirecting, don't show login form
  if (currentUser && !showModal) {
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <UserCircle size={32} /> User Manager
        </h1>
        <p>Đăng nhập để quản lý người dùng</p>

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />

        <div className="login-hint">
          <p style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Tài khoản mẫu:</p>
          <table>
            <thead>
              <tr><th>Username</th><th>Password</th><th>Vai trò</th></tr>
            </thead>
            <tbody>
              <tr><td>admin</td><td>123456</td><td>Admin</td></tr>
              <tr><td>manager</td><td>123456</td><td>Manager</td></tr>
              <tr><td>user1</td><td>123456</td><td>User</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {showModal && currentUser && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#10b981' }}>
              <ShieldCheck size={64} />
            </div>
            <h2>Đăng nhập thành công!</h2>
            <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
              Xin chào, <strong>{currentUser.fullName}</strong>
              <br />
              Vai trò: <span className={`badge badge-role ${currentUser.role}`}>{currentUser.role}</span>
            </p>
            <button className="btn btn-primary" onClick={handleCloseModal} style={{ width: '100%', marginTop: '1rem' }}>
              Tiếp tục
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
