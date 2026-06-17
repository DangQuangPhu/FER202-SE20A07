import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginForm({ username, setUsername, password, setPassword, onSubmit, loading, error }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <form onSubmit={onSubmit} noValidate>
      {error && <div className="login-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '0.375rem', marginBottom: '1rem', border: '1px solid #fecaca' }}>
        <span style={{ fontWeight: 'bold' }}>!</span> {error}
      </div>}

      <div className="form-group">
        <label htmlFor="username">Tên đăng nhập</label>
        <input
          id="username" type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="admin / manager / user1"
          autoFocus autoComplete="username"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <div style={{ position: 'relative' }}>
          <input
            id="password"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••"
            autoComplete="current-password"
            style={{ paddingRight: '2.5rem' }}
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            style={{
              position: 'absolute', right: '0.6rem', top: '50%',
              transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            aria-label={showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading || !username || !password} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
        {loading ? (
          <span>Đang đăng nhập...</span>
        ) : (
          <>
            <LogIn size={18} /> Đăng nhập
          </>
        )}
      </button>
    </form>
  );
}
