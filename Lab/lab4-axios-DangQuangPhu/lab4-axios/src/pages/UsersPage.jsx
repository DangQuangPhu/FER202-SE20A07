import { useCallback, useEffect, useState } from 'react';
import { userApi } from '../api/userApi';
import { useAuth } from '../context/AuthContext';
import ConfirmDialog from '../components/ConfirmDialog';
import UserForm from '../components/UserForm';
import { Users, LogOut, Plus, RefreshCw, AlertTriangle, Search, Edit2, Trash2, CheckCircle2, XCircle } from 'lucide-react';

// ── Toast helper ─────────────────────────────────────────────────────────
function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{t.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ── Status / Role badges ──────────────────────────────────────────────────
function StatusBadge({ status, onClick, canChange }) {
  return (
    <span
      className={`badge ${status === 'active' ? 'badge-active' : 'badge-inactive'}`}
      style={{ cursor: canChange ? 'pointer' : 'default', userSelect: 'none' }}
      onClick={canChange ? onClick : undefined}
      title={canChange ? 'Click để đổi trạng thái' : ''}
    >
      {status === 'active' ? '● Active' : '○ Inactive'}
    </span>
  );
}

function RoleBadge({ role }) {
  return <span className={`badge badge-role ${role}`}>{role}</span>;
}

// ═════════════════════════════════════════════════════════════════════════
export default function UsersPage() {
  const { currentUser, logout } = useAuth();

  const [users,        setUsers]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [search,       setSearch]       = useState('');
  const [filterRole,   setFilterRole]   = useState('');
  const [showForm,     setShowForm]     = useState(false);
  const [editUser,     setEditUser]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading,  setFormLoading]  = useState(false);
  const [toasts,       setToasts]       = useState([]);

  const isAdmin   = currentUser?.role === 'Admin';
  const isManager = currentUser?.role === 'Manager';
  const canWrite  = isAdmin || isManager;

  // ── Toast ───────────────────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  // ── GET /users ──────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filterRole) params.role = filterRole;
      const { data } = await userApi.getAll(params);
      
      // Filter based on explicit role visibility
      const visibleRoles = {
        'Admin': ['Admin', 'Manager', 'User'],
        'Manager': ['User'],
        'User': ['User']
      };
      const allowedRoles = visibleRoles[currentUser?.role] || [];
      
      const allowedData = data.filter(u => allowedRoles.includes(u.role));
      setUsers(allowedData);
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  }, [filterRole, currentUser]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  // ── Client-side search ──────────────────────────────────────────────────
  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())    ||
    u.phone.includes(search)
  );

  // ── POST / PUT ───────────────────────────────────────────────────────────
  const handleFormSubmit = async formData => {
    setFormLoading(true);
    try {
      if (editUser) {
        await userApi.update(editUser.id, { ...editUser, ...formData });
        showToast('Cập nhật người dùng thành công!');
      } else {
        await userApi.create(formData);
        showToast('Thêm người dùng thành công!');
      }
      setShowForm(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      showToast(err.message || 'Có lỗi xảy ra.', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  // ── PATCH toggle status ─────────────────────────────────────────────────
  const handleToggleStatus = async user => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      await userApi.patch(user.id, { status: newStatus });
      // Optimistic update
      setUsers(prev =>
        prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u)
      );
      showToast(`Đã chuyển trạng thái sang "${newStatus}".`);
    } catch {
      showToast('Cập nhật trạng thái thất bại.', 'error');
    }
  };

  // ── DELETE ──────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    try {
      await userApi.remove(deleteTarget.id);
      showToast(`Đã xóa "${deleteTarget.fullName}" thành công.`);
      setDeleteTarget(null);
      fetchUsers();
    } catch {
      showToast('Xóa thất bại.', 'error');
      setDeleteTarget(null);
    }
  };

  // ── Open form ───────────────────────────────────────────────────────────
  const openAdd  = () => { setEditUser(null); setShowForm(true); };
  const openEdit = user => { setEditUser(user); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditUser(null); };

  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="users-page">
      <ToastContainer toasts={toasts} />

      {/* ── Topbar ── */}
      <header className="topbar">
        <div className="topbar-left">
          <span className="topbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={24} /> User Manager
          </span>
        </div>
        <div className="topbar-right">
          <span className="topbar-user">
            Xin chào, <span>{currentUser?.fullName}</span>{' '}
            <RoleBadge role={currentUser?.role} />
          </span>
          <button className="btn btn-secondary btn-sm" onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="page-content">
        <div className="page-header">
          <div>
            <h2>Quản lý người dùng</h2>
            <p className="page-header-sub">
              Danh sách tất cả người dùng trong hệ thống
            </p>
          </div>
          {canWrite && (
            <button className="btn btn-primary" onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} /> Thêm người dùng
            </button>
          )}
        </div>

        {/* ── Toolbar ── */}
        <div className="toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="Tìm theo tên, email, SĐT..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={filterRole}
            onChange={e => { setFilterRole(e.target.value); setSearch(''); }}
          >
            <option value="">Tất cả vai trò</option>
            {isAdmin && <option value="Admin">Admin</option>}
            {isAdmin && <option value="Manager">Manager</option>}
            <option value="User">User</option>
          </select>

          <button
            className="btn btn-secondary btn-sm toolbar-right"
            onClick={fetchUsers}
            title="Tải lại"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <RefreshCw size={16} /> Tải lại
          </button>
        </div>

        {/* ── Row count ── */}
        {!loading && !error && (
          <p className="row-count">
            Hiển thị {filtered.length} / {users.length} người dùng
          </p>
        )}

        {/* ── Table ── */}
        {loading ? (
          <div className="state-box">
            <div className="spinner" />
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="state-box">
            <span className="emoji" style={{ color: '#ef4444', marginBottom: '0.5rem' }}><AlertTriangle size={48} /></span>
            <p style={{ color: '#ef4444' }}>{error}</p>
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={fetchUsers}>
              Thử lại
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="state-box">
            <span className="emoji" style={{ color: '#9ca3af', marginBottom: '0.5rem' }}><Search size={48} /></span>
            <p>Không tìm thấy người dùng phù hợp.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, idx) => (
                  <tr key={user.id}>
                    <td style={{ color: '#9ca3af', fontWeight: 500 }}>{idx + 1}</td>
                    <td style={{ fontWeight: 600 }}>{user.fullName}</td>
                    <td style={{ color: '#6366f1' }}>{user.email}</td>
                    <td>{user.phone}</td>
                    <td><RoleBadge role={user.role} /></td>
                    <td>
                      <StatusBadge
                        status={user.status}
                        canChange={canWrite}
                        onClick={() => handleToggleStatus(user)}
                      />
                    </td>
                    <td style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
                      {user.createdAt}
                    </td>
                    <td>
                      <div className="td-actions">
                        {canWrite && (
                          <button
                            className="btn-icon"
                            title="Chỉnh sửa"
                            onClick={() => openEdit(user)}
                          >
                            <Edit2 size={16} color="#6366f1" />
                          </button>
                        )}
                        {isAdmin && (
                          <button
                            className="btn-icon"
                            title="Xóa"
                            style={{ borderColor: '#fca5a5' }}
                            onClick={() => setDeleteTarget(user)}
                          >
                            <Trash2 size={16} color="#ef4444" />
                          </button>
                        )}
                        {!canWrite && (
                          <span style={{ color: '#d1d5db', fontSize: '0.78rem' }}>
                            Chỉ xem
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ── Modals ── */}
      {showForm && (
        <UserForm
          user={editUser}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
          loading={formLoading}
        />
      )}

      <ConfirmDialog
        target={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
