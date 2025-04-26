import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";
import MedecinNavbar from "../components/MedecinNavBar";
import "../styles.css";
import Sidebar from "../components/Sidebar";
import {Bell, Calendar, Clock} from "lucide-react";

const MedecinDashboard = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);      // All users from backend
  const [users, setUsers] = useState([]);            // Filtered users shown in table
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientCount, setPatientCount] = useState(0);

  const token = localStorage.getItem("token");

  // Fetch all users on mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found — skipping fetch.");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get("http://localhost:6060/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter only ADMIN, MEDECIN, PATIENT
        const filteredUsers = response.data.filter(user =>
            user.role === "ADMIN" || user.role === "MEDECIN" || user.role === "PATIENT"
        );

        setAllUsers(filteredUsers);
        setUsers(filteredUsers);

        const patientCount = filteredUsers.filter(user => user.role === "PATIENT").length;
        setPatientCount(patientCount);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);


  // Filter users by role when selectedRole changes
  useEffect(() => {
    let filtered = allUsers;

    // Filter by role if selected
    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    // Filter by name (case-insensitive)
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
          user.firstName.toLowerCase().includes(lowerSearch)
      );
    }

    // Set users for the table
    setUsers(filtered.filter(user => user.role === "ADMIN" || user.role === "MEDECIN"));
  }, [searchTerm, selectedRole, allUsers]);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token"); // Or use sessionStorage

    if (!token) {
      alert("Vous devez être connecté pour effectuer cette action.");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const response = await axios.delete(`http://localhost:6060/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 204) {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          alert('Utilisateur supprimé avec succès');
        } else {
          console.error('Échec de la suppression:', response);
          alert("Échec de la suppression de l'utilisateur.");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };
  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Smith", speciality: "Cardiologist", date: "April 24, 2025", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Johnson", speciality: "Dermatologist", date: "April 29, 2025", time: "2:30 PM" }
  ];

  const notifications = [
    { id: 1, message: "Your prescription is ready for pickup", time: "1 hour ago" },
    { id: 2, message: "Dr. Smith has confirmed your appointment", time: "Yesterday" },
    { id: 3, message: "Your lab results are available", time: "2 days ago" }
  ];
  return (
      <>
        <Helmet>
          <title>Admin Dashboard - MediAi Care</title>
        </Helmet>
        <MedecinNavbar/>
        <div className="container-fluid" style={{marginTop: "65px"}}>
          <div className="row">
            <Sidebar/>
            <div className="col-sm p-3 min-vh-100" style={{margin: "10px"}}>
              <h4>Dashboard</h4>
              <div className="d-flex flex-wrap justify-content-between mt-3">
                <div className="card shadow-sm mb-4" style={{flex: "0 0 23%", minWidth: "200px"}}>
                  <div className="card-body">
                    <div className="float-end mt-4">
                      <i className="fas fa-user-injured fs-2 text-primary"></i>
                    </div>
                    <h5 className="text-muted fw-normal mt-0">Patients</h5>
                    <h3 className="mt-3">{patientCount}</h3>
                  </div>
                </div>
                <div className="card shadow-sm mb-4" style={{flex: "0 0 23%", minWidth: "200px"}}>
                  <div className="card-body">
                    <div className="float-end mt-4">
                      <i className="fas fa-calendar-check fs-2 text-warning"></i>
                    </div>
                    <h5 className="text-muted fw-normal mt-0">Arrangements</h5>
                    <h3 className="mt-3 mb-3">36,254</h3>
                  </div>
                </div>


                <div className="card shadow-sm mb-4" style={{flex: "0 0 23%", minWidth: "200px"}}>
                  <div className="card-body">
                    <div className="float-end mt-4">
                      <i className="fa-regular fa-money-bill-1 fs-2 text-success"></i>
                    </div>
                    <h5 className="text-muted fw-normal mt-0">Paiements</h5>
                    <h3 className="mt-3 mb-3">36,254</h3>
                  </div>
                </div>
              </div>

              <div className="dashboard-cards">
                <div className="card dashboard-card">
                  <div className="card-body">
                    <h5 className="card-title">Prochains Rendez-vous</h5>
                    {upcomingAppointments.length > 0 ? (
                        <div className="appointments-list">
                          {upcomingAppointments.map(appointment => (
                              <div className="appointment-item" key={appointment.id}>
                                <div className="appointment-icon">
                                  <Calendar size={20}/>
                                </div>
                                <div className="appointment-details">
                                  <h6>{appointment.doctor}</h6>
                                  <p className="text-muted">{appointment.speciality}</p>
                                  <div className="appointment-time">
                                    <Clock size={14}/>
                                    <span>{appointment.date} at {appointment.time}</span>
                                  </div>
                                </div>
                                <button className="btn btn-sm btn-outline-primary">Details</button>
                              </div>
                          ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted mt-4">No rendez-vous</p>
                    )}
                    <div className="text-center mt-3">
                      <button
                          className="btn btn-primary"
                          onClick={() => navigate('/view-appointments')}
                      >
                        Voir Consultations
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card dashboard-card">
                  <div className="card-body">
                    <h5 className="card-title">Notifications</h5>
                    {notifications.length > 0 ? (
                        <div className="notifications-list">
                          {notifications.map(notification => (
                              <div className="notification-item" key={notification.id}>
                                <div className="notification-icon">
                                  <Bell size={18}/>
                                </div>
                                <div className="notification-content">
                                  <p>{notification.message}</p>
                                  <small className="text-muted">{notification.time}</small>
                                </div>
                              </div>
                          ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted mt-4">No new notifications</p>
                    )}
                    <div className="text-center mt-3">
                      <button className="btn btn-outline-secondary btn-sm">View All</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .dashboard-layout {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .dashboard-container {
            display: flex;
            flex: 1;
            padding-top: 70px; /* Adjust based on navbar height */
          }

          .dashboard-content {
            flex: 1;
            padding: 25px;
            background-color: #f9f9f9;
          }

          .dashboard-header {
            margin-bottom: 25px;
          }

          .dashboard-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
          }

          .dashboard-card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            height: 100%;
          }

          .appointments-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .appointment-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 8px;
            background-color: #f8f9fa;
            gap: 15px;
          }

          .appointment-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #e9ecef;
            color: #0d6efd;
          }

          .appointment-details {
            flex: 1;
          }

          .appointment-time {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 5px;
            font-size: 0.85rem;
          }

          .notifications-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .notification-item {
            display: flex;
            gap: 10px;
            padding: 10px;
            border-radius: 8px;
            background-color: #f8f9fa;
            align-items: flex-start;
          }

          .notification-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0d6efd;
          }

          .notification-content {
            flex: 1;
          }

          .notification-content p {
            margin-bottom: 0;
          }

          .quick-access-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          @media (max-width: 768px) {
            .dashboard-container {
              flex-direction: column;
            }

            .dashboard-cards {
              grid-template-columns: 1fr;
            }

            .quick-access-buttons {
              justify-content: center;
            }
          }
        `}</style>
      </>
  );
};

export default MedecinDashboard;
