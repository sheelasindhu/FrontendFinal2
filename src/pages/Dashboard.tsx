// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StarRating from '../components/StarRating';
import FeedbackHistory from '../components/FeedbackHistory';

const Dashboard = () => {
  const [view, setView] = useState<'form' | 'history'>('form');
  const [category, setCategory] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !feedback) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5285/api/feedback',
        {
          category,
          content: feedback,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || 'Feedback submitted successfully!');
      setCategory('');
      setFeedback('');
      setRating(0);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Error submitting feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar onNavigate={setView} />
      <div className="container">
        {view === 'form' ? (
          <>
            <h3>Feedback Form</h3>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option>Service</option>
              <option>Product</option>
              <option>Website</option>
            </select>
            <textarea
              placeholder="Enter feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <StarRating rating={rating} setRating={setRating} />
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </>
        ) : (
          <FeedbackHistory />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
