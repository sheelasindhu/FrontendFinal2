// src/components/Navbar.tsx
import './Navbar.css';
import React from 'react';

interface Props {
  onNavigate: (page: 'form' | 'history') => void;
}

const Navbar: React.FC<Props> = ({ onNavigate }) => {
  return (
    <nav>
      <div>SMARTFEEDBACK</div>
      <ul>
        <li onClick={() => onNavigate('form')}>Feedback Form</li>
        <li onClick={() => onNavigate('history')}>History</li>
        <li onClick={() => window.location.href = '/'}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
