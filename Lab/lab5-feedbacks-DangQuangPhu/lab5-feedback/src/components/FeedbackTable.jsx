import api from '../api/api';
import { formatDate } from '../utils/formatDate';

const FeedbackTable = ({ feedbacks, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Delete this feedback?')) {
      try {
        await api.delete(`/feedbacks/${id}`);
        onDelete(id);
      } catch (err) {
        alert('Failed to delete feedback');
      }
    }
  };

  const getRatingBadgeClass = (rating) => {
    const num = parseInt(rating);
    if (num >= 4) return 'bg-success';
    if (num === 3) return 'bg-warning text-dark';
    return 'bg-danger';
  };

  return (
    <div className="dashboard-card border rounded p-4 h-100 bg-white">
      <h5 className="fw-bold mb-4 text-dark">Feedback Management</h5>
      {feedbacks.length === 0 ? (
        <div className="alert alert-info text-center py-4">
          No feedbacks found. Add one above!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle border">
            <thead className="table-light">
              <tr>
                <th className="fw-semibold text-secondary">Course</th>
                <th className="fw-semibold text-secondary">Topic</th>
                <th className="fw-semibold text-secondary">Rating</th>
                <th className="fw-semibold text-secondary">Comment</th>
                <th className="fw-semibold text-secondary">Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb.id}>
                  <td>{fb.course}</td>
                  <td>{fb.topic}</td>
                  <td>{fb.rating}</td>
                  <td>{fb.comment}</td>
                  <td className="text-muted">{formatDate(fb.date)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm text-dark border-0 rounded"
                        onClick={() => onEdit(fb)}
                        style={{ width: '60px', backgroundColor: '#ffc107' }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm text-white border-0 rounded"
                        onClick={() => handleDelete(fb.id)}
                        style={{ width: '65px', backgroundColor: '#dc3545' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;