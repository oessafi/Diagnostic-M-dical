import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token de connexion
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action" onClick={() => navigate('/manage-users')}>Manage Users</button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate('/view-reports')}>View Reports</button>
            <button className="list-group-item list-group-item-action" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="content">
            <h4>Welcome, Admin</h4>
            <p>This is your dashboard. You can manage users, view reports, and logout from here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
