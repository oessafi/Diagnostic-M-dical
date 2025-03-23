import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MedecinDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token de connexion
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <div className="container mt-5">
      <h2>Médecin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action" onClick={() => navigate('/view-patients')}>View Patients</button>
            <button className="list-group-item list-group-item-action" onClick={() => navigate('/manage-appointments')}>Manage Appointments</button>
            <button className="list-group-item list-group-item-action" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="content">
            <h4>Welcome, Médecin</h4>
            <p>This is your dashboard. You can view patients, manage appointments, and logout from here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedecinDashboard;
