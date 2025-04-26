import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import PatientNavbar from "../components/PatientNavBar";
import Sidebar from "../components/Sidebar";
import { Calendar, Clock, Bell } from 'lucide-react';

const PatientDashboard = () => {
  const navigate = useNavigate();
  
  // Sample data for the dashboard
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
    <div className="dashboard-layout">
      <Helmet>
        <title>Patient Dashboard - MediAi Care</title>
      </Helmet>
      
      <PatientNavbar />
      
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          <div className="dashboard-header">
            <h2>Patient Dashboard</h2>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Accès Rapide</h5>
                  <div className="container py-5">
                    <div className="row row-cols-2 g-4">
                      <div className="col">
                        <Link to="/chatbot" className="text-decoration-none">
                          <div className="card h-100 text-center card-hover">
                            <div className="card-body">
                              <img src="/assets/img/nurse.png" alt="ChatBox" className="card-img-top mb-3"/>
                              <p className="card-text text-dark">Essayez MediAi ChatBot</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col">
                        <Link to="/appointments" className="text-decoration-none">
                          <div className="card h-100 text-center card-hover">
                            <div className="card-body">
                              <img src="/assets/img/conversation.png" alt="ChatDoctor" className="card-img-top mb-3"/>
                              <p className="card-text text-dark">Communiter Avec Le Médecin</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col">
                        <Link to="/appointment" className="text-decoration-none">
                          <div className="card h-100 text-center card-hover">
                            <div className="card-body">
                              <img src="/assets/img/appointment.png" alt="Appointment" className="card-img-top mb-3"/>
                              <p className="card-text text-dark">Réserver Votre Rendez-vous à Nos Médecins</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="col">
                        <Link to="/profile" className="text-decoration-none">
                          <div className="card h-100 text-center card-hover">
                            <div className="card-body">
                              <img src="/assets/img/profile.png" alt="Profile" className="card-img-top mb-3"/>
                              <p className="card-text text-dark">Personnaliser Votre Profile</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-cards mt-4">
            <div className="card dashboard-card">
              <div className="card-body">
                <h5 className="card-title">Upcoming Appointments</h5>
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
                            <button className="btn btn-sm btn-outline-primary">Reschedule</button>
                          </div>
                      ))}
                    </div>
                ) : (
                    <p className="text-center text-muted mt-4">No upcoming appointments</p>
                )}
                <div className="text-center mt-3">
                  <button
                      className="btn btn-primary"
                      onClick={() => navigate('/book-appointment')}
                  >
                    Book New Appointment
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

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .card-img-top {
          width: 80px;  /* Set the width of the icon */
          height: 80px; /* Set the height of the icon */
          object-fit: cover; /* Makes sure the image fits nicely */
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

        .card-hover {
          transition: background-color 0.3s, color 0.3s;
        }

        .card-hover:hover {
          background-color: #28a745; /* green hover */
        }

        .card-hover:hover .card-text {
          color: white;
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
    </div>
  );
};

export default PatientDashboard;