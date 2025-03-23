import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Supprimez "Link" ici
import Login from './components/Login';
import Signup from './components/Signup';  
import AdminDashboard from './pages/AdminDashboard';
import MedecinDashboard from './pages/MedecinDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ViewAppointments from './pages/ViewAppointments';
import ManageUsers from './pages/ManageUsers';
import MedicalRecords from './pages/MedicalRecords';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route 
                    path="/admin-dashboard" 
                    element={
                        <PrivateRoute>
                            <AdminDashboard />
                        </PrivateRoute>
                    } 
                />
                
                <Route 
                    path="/medecin-dashboard" 
                    element={
                        <PrivateRoute>
                            <MedecinDashboard />
                        </PrivateRoute>
                    } 
                />
                
                <Route 
                    path="/patient-dashboard" 
                    element={
                        <PrivateRoute>
                            <PatientDashboard />
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/view-appointments" 
                    element={
                        <PrivateRoute>
                            <ViewAppointments />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/manage-users" 
                    element={
                        <PrivateRoute>
                            <ManageUsers />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/medical-records" 
                    element={
                        <PrivateRoute>
                            <MedicalRecords />
                        </PrivateRoute>
                    } 
                />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
