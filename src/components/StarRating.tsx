// src/components/StarRating.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, setRating }: { rating: number, setRating: (n: number) => void }) => {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} onClick={() => setRating(i + 1)} color={i < rating ? "#ffc107" : "#e4e5e9"} style={{ cursor: 'pointer' }} />
      ))}
    </div>
  );
};

export default StarRating;
