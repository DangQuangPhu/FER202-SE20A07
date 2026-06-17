export default function ConfirmDialog({ target, onConfirm, onCancel }) {
  if (!target) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box sm" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">🗑️</div>
        <p className="confirm-msg">
          Bạn có chắc muốn xóa người dùng{' '}
          <strong>"{target.fullName}"</strong> không?
          <br />
          <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
            Hành động này không thể hoàn tác.
          </span>
        </p>
        <div className="confirm-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
