import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllFeedbacks.css';

type Feedback = {
  id: number;
  category: string;
  content: string;
  rating: number;
  createdAt: string;
};

const AllFeedbacks: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5285/api/feedback/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="history-container">
      <h3>All Submitted Feedbacks</h3>
      {feedbacks.length === 0 ? (
        <p className="empty-message">No feedbacks available.</p>
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
                <td>{new Date(f.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllFeedbacks;
