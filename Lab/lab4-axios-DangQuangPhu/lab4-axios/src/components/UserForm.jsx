import { useEffect, useState } from 'react';
import { UserPlus, Edit3, X, Save, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  role: 'User',
  status: 'active',
};

function validate(form) {
  const e = {};

  if (!form.fullName.trim())
    e.fullName = 'Họ tên không được để trống.';
  else if (form.fullName.trim().length < 3)
    e.fullName = 'Họ tên phải có ít nhất 3 ký tự.';

  if (!form.email.trim())
    e.email = 'Email không được để trống.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'Email không hợp lệ.';

  if (!form.phone.trim())
    e.phone = 'Số điện thoại không được để trống.';
  else if (!/^0\d{9}$/.test(form.phone))
    e.phone = 'Số điện thoại phải 10 chữ số, bắt đầu bằng 0.';

  return e;
}

export default function UserForm({ user, onSubmit, onClose, loading }) {
  const [form, setForm]     = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Điền data khi chỉnh sửa, reset khi thêm mới
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName,
        email:    user.email,
        phone:    user.phone,
        role:     user.role,
        status:   user.status,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Xóa lỗi khi user gõ lại
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit(form);
  };

  const isEdit = Boolean(user);

  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'Admin';
  const isManager = currentUser?.role === 'Manager';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {isEdit ? <><Edit3 size={24} /> Chỉnh sửa người dùng</> : <><UserPlus size={24} /> Thêm người dùng mới</>}
          </h2>
          <button className="modal-close" onClick={onClose} disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên *</label>
            <input
              id="fullName" name="fullName" type="text"
              value={form.fullName} onChange={handleChange}
              className={errors.fullName ? 'has-error' : ''}
              placeholder="Nguyễn Văn A"
              autoFocus
            />
            {errors.fullName && <p className="form-error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email" name="email" type="email"
              value={form.email} onChange={handleChange}
              className={errors.email ? 'has-error' : ''}
              placeholder="example@email.com"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại *</label>
            <input
              id="phone" name="phone" type="tel"
              value={form.phone} onChange={handleChange}
              className={errors.phone ? 'has-error' : ''}
              placeholder="0912345678"
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Vai trò</label>
              <select id="role" name="role" value={form.role} onChange={handleChange}>
                {isAdmin && <option value="Admin">Admin</option>}
                {isAdmin && <option value="Manager">Manager</option>}
                <option value="User">User</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Trạng thái</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {loading ? '⏳ Đang lưu...' : (isEdit ? <><Save size={18} /> Cập nhật</> : <><Plus size={18} /> Thêm mới</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
