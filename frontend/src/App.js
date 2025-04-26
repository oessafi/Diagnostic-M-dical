import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './pages/AdminDashboard';
import MedecinDashboard from './pages/MedecinDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Arrangements from './pages/Arrangements';
import PatientArrangements from './pages/PatientArrangements';
import ViewReports from './pages/ViewReport';
import ManageUsers from './pages/ManageUsers';
import AddUser from './pages/AddUser';
import Reports from './pages/Reports';
import UserDetail from './pages/UserDetail';
import MedicalRecords from './pages/MedicalRecords';
import Main from "./components/Main";
import ChatBot from "./pages/ChatBot";
import CasUrgent from "./components/CasUrgent";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddReport from "./pages/AddReport";
import Profile from './components/Profile';

// PrivateRoute: A component to protect routes and check authentication
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // If token is not found, redirect to login page
    return token ? children : <Navigate to="/login" />;
};

// Main App component with all routes
function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route index element={<Main />} />
                <Route path="/casurgent" element={<CasUrgent />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
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
                    path="/reports"
                    element={
                        <PrivateRoute>
                            <Reports />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/add-report"
                    element={
                        <PrivateRoute>
                            <AddReport />
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
                            <Arrangements />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/appointments"
                    element={
                        <PrivateRoute>
                            <PatientArrangements />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/chatbot"
                    element={
                        <PrivateRoute>
                            <ChatBot />
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
                    path="/add-user"
                    element={
                        <PrivateRoute>
                            <AddUser />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/user-details/:id"
                    element={
                        <PrivateRoute>
                            <UserDetail />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/view-reports"
                    element={
                        <PrivateRoute>
                            <ViewReports />
                        </PrivateRoute>
                    }
                />
                <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
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

                {/* Catch-all route to redirect to login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
