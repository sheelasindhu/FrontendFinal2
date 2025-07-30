// pages/AdminDashboard.tsx
import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AllFeedbacks from '../components/AllFeedback';
import Analytics from '../components/Analytics'; // Create this if not already

const AdminDashboard = () => {
  const [view, setView] = useState<'all' | 'analytics'>('all');

  return (
    <div>
      <AdminNavbar onNavigate={setView} />
      {view === 'all' && <AllFeedbacks />}
      {view === 'analytics' && <Analytics />}
    </div>
  );
};

export default AdminDashboard;
