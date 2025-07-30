import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './Analytics.css';

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

type Feedback = {
  id: number;
  category: string;
  content: string;
  rating: number;
  createdAt: string;
  user: string;
};

const Analytics: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchAllFeedback = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5285/api/feedback', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(res.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
      }
    };

    fetchAllFeedback();
  }, []);

  const categoryCount = feedbacks.reduce<Record<string, number>>((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(categoryCount).map(([key, value]) => ({
    name: key,
    value
  }));

  return (
    <div className="analytics-container">
      <h3>Feedback by Category</h3>
      {data.length === 0 ? (
        <p className="empty-message">No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Analytics;
