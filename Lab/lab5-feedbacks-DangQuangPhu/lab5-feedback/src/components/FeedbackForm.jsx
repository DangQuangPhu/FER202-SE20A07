import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import { parseDateForInput } from '../utils/formatDate';

const FeedbackForm = ({ onFeedbackAdded, editingFeedback, onFeedbackEdited, setEditingFeedback }) => {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState('');
  const [topic, setTopic] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingFeedback) {
      setCourse(editingFeedback.course);
      setTopic(editingFeedback.topic);
      setRating(editingFeedback.rating);
      setComment(editingFeedback.comment);
      setDate(parseDateForInput(editingFeedback.date));
    } else {
      resetForm();
    }
  }, [editingFeedback]);

  const resetForm = () => {
    setCourse('');
    setTopic('');
    setRating('5');
    setComment('');
    setDate('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!course.trim()) {
      setError('Course is required');
      return;
    }

    if (!topic.trim()) {
      setError('Topic is required');
      return;
    }

    const ratingNum = parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }

    // Automatically get current date in DD-MM-YYYY format if not editing, or preserve if editing
    let finalDateStr = '';
    if (editingFeedback) {
      finalDateStr = editingFeedback.date;
    } else {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      finalDateStr = `${day}-${month}-${year}`;
    }

    const payload = {
      userId: user.id,
      course,
      topic,
      rating: ratingNum,
      comment,
      date: finalDateStr,
    };

    try {
      if (editingFeedback) {
        const res = await api.put(`/feedbacks/${editingFeedback.id}`, payload);
        onFeedbackEdited(res.data);
        setEditingFeedback(null);
      } else {
        const res = await api.post('/feedbacks', payload);
        onFeedbackAdded(res.data);
      }
      resetForm();
    } catch (err) {
      setError('Failed to save feedback');
    }
  };

  const handleCancel = () => {
    setEditingFeedback(null);
    resetForm();
  }

  return (
    <div className="dashboard-card border rounded p-4 h-100 bg-white">
      <h5 className="fw-bold mb-4 text-dark">
        {editingFeedback ? 'Edit Feedback' : 'Add Feedback'}
      </h5>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-secondary small mb-1">Course</label>
          <input
            type="text"
            className="form-control"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary small mb-1">Topic</label>
          <input
            type="text"
            className="form-control"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary small mb-1">Rating</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="form-label text-secondary small mb-1">Comment</label>
          <textarea
            className="form-control"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="btn btn-primary px-4">
            {editingFeedback ? 'Update Feedback' : 'Add Feedback'}
          </button>
          {editingFeedback && (
            <button type="button" className="btn btn-light border ms-2" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;