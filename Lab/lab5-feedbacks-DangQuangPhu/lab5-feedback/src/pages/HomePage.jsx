import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackTable from '../components/FeedbackTable';
import api from '../api/api';
import '../styles/home.css';

const HomePage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchFeedbacks();
    }
  }, [user]);

  const fetchFeedbacks = async () => {
    try {
      const response = await api.get(`/feedbacks?userId=${user.id}`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Failed to fetch feedbacks', error);
    }
  };

  const handleFeedbackAdded = (newFeedback) => {
    setFeedbacks([...feedbacks, newFeedback]);
  };

  const handleFeedbackEdited = (updatedFeedback) => {
    setFeedbacks(
      feedbacks.map((fb) => (fb.id === updatedFeedback.id ? updatedFeedback : fb))
    );
  };

  const handleFeedbackDeleted = (id) => {
    setFeedbacks(feedbacks.filter((fb) => fb.id !== id));
  };

  return (
    <div className="home-container">
      <Header />
      <main className="container-fluid px-4 my-4 flex-grow-1">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <FeedbackForm 
              onFeedbackAdded={handleFeedbackAdded} 
              editingFeedback={editingFeedback}
              onFeedbackEdited={handleFeedbackEdited}
              setEditingFeedback={setEditingFeedback}
            />
          </div>
          <div className="col-md-8">
            <FeedbackTable 
              feedbacks={feedbacks} 
              onEdit={setEditingFeedback}
              onDelete={handleFeedbackDeleted}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;