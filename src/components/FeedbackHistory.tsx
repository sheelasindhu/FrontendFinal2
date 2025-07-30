import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Feedback = {
  id: number;
  category: string;
  content: string;
  rating: number;
  date: string;
};

const FeedbackHistory: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchUserFeedback = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5285/api/feedback/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(res.data);
      } catch (error) {
        console.error('Failed to fetch feedback history', error);
      }
    };

    fetchUserFeedback();
  }, []);

  return (
    <div className="history-container">
      <h3>Feedback History</h3>

      {feedbacks.length === 0 ? (
        <p className="empty-message">No feedback submitted yet.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Feedback</th>
              <th>Rating</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id}>
                <td>{f.category}</td>
                <td>{f.content}</td>
                <td>{f.rating} ★</td>
                <td>{new Date(f.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackHistory;
