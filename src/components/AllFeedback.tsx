import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Feedback {
  id: number;
  category: string;
  content: string;
  rating: number;
  user: string;
  createdAt: string;
}

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5285/api/feedback', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
  <div className="all-feedback-container">
    <h3>All Feedbacks</h3>
    {/* <button className="export-btn">Export CSV</button> */}

    {feedbacks.length === 0 ? (
      <p className="empty-message">No feedbacks available.</p>
    ) : (
      <table className="all-feedback-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Content</th>
            <th>Rating</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.category}</td>
              <td>{f.content}</td>
              <td>{f.rating}</td>
              <td>{f.user || "Unknown"}</td>
              <td>{new Date(f.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

};

export default AllFeedbacks;
