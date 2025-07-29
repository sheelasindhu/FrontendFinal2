import React from 'react';
import './Navbar.css'; // same styles as user navbar

interface Props {
  onNavigate: (view: 'all' | 'analytics') => void;
}

const AdminNavbar: React.FC<Props> = ({ onNavigate }) => {
  return (
    <nav>
      <div>SMARTFEEDBACK</div>
      <ul>
        <li onClick={() => onNavigate('all')}>All Feedbacks</li>
        <li onClick={() => onNavigate('analytics')}>Analytics</li>
        <li onClick={() => window.location.href = '/'}>Logout</li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
