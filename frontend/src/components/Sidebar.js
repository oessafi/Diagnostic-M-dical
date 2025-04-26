import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  User, 
  FileText, 
  MessageSquare, 
  Users, 
  Bot,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch("http://localhost:6060/public/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setRole(data.roles[0].authority);
          }
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchUserInfo();
  }, []);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderSidebarItems = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    
    const isActive = (path) => {
      return location.pathname === path ? 'active' : '';
    };
    
    if (role === 'PATIENT') {
      return (
        <>
          <Link className={`sidebar-item ${isActive('/patient-dashboard')}`} to="/patient-dashboard">
            <Home size={18} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
            <Link className={`sidebar-item ${isActive('/chatbot')}`} to="/chatbot">
                <Bot size={18} />
                {!isCollapsed && <span>ChatBot</span>}
            </Link>
          <Link className={`sidebar-item ${isActive('/appointments')}`} to="/appointments">
            <Calendar size={18} />
            {!isCollapsed && <span>Rendez-Vous</span>}
          </Link>
          <Link className={`sidebar-item ${isActive('/profile')}`} to="/profile">
            <User size={18} />
            {!isCollapsed && <span>Profile</span>}
          </Link>
          <Link className={`sidebar-item ${isActive('/medical-records')}`} to="/medical-records">
            <FileText size={18} />
            {!isCollapsed && <span>Medical Records</span>}
          </Link>
          <Link className={`sidebar-item ${isActive('/chatbot')}`} to="/chatbot">
            <MessageSquare size={18} />
            {!isCollapsed && <span>Chat with Doctor</span>}
          </Link>
        </>
      );
    } else if (role === 'MEDECIN') {
      return (
        <>
          <Link className={`sidebar-item ${isActive('/medecin-dashboard')}`} to="/medecin-dashboard">
            <Home size={18} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link className={`sidebar-item ${isActive('/view-appointments')}`} to="/view-appointments">
            <Calendar size={18} />
            {!isCollapsed && <span>Consultations</span>}
          </Link>
          <Link className={`sidebar-item ${isActive('/reports')}`} to="/reports">
            <FileText size={18} />
            {!isCollapsed && <span>Rapports</span>}
          </Link>
        </>
      );
    } else if (role === 'ADMIN') {
      return (
        <>
          <Link className={`sidebar-item ${isActive('/admin-dashboard')}`} to="/admin-dashboard">
            <Home size={18} />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link className={`sidebar-item ${isActive('/manage-users')}`} to="/manage-users">
            <Users size={18} />
            {!isCollapsed && <span>Utilisateur</span>}
          </Link>
          <Link className={`sidebar-item ${isActive('/view-reports')}`} to="/view-reports">
            <FileText size={18} />
            {!isCollapsed && <span>Voir Rapports</span>}
          </Link>
        </>
      );
    } else {
      return (
        <div className="text-center text-muted p-3">
          {!isCollapsed && <p>Unknown role</p>}
        </div>
      );
    }
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="sidebar-title">
          </div>
        )}
        <button 
          className="collapse-btn" 
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="sidebar-content">
        {renderSidebarItems()}
      </div>
      <style jsx>{`
        .sidebar-container {
          height: 100vh;
          min-height: 500px;
          background: white;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          width: 250px;
          padding: 0;
          position: sticky;
          top: 0;
        }
        
        .sidebar-container.collapsed {
          width: 70px;
        }
        
        .sidebar-header {
          padding: 20px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .sidebar-title {
          font-size: 18px;
          font-weight: 600;
        }
        
        .collapse-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border-radius: 5px;
          transition: all 0.2s;
        }
        
        .collapse-btn:hover {
          background: #f8f9fa;
        }
        
        .sidebar-container.collapsed .collapse-btn {
          transform: rotate(180deg);
        }
        
        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 10px 0;
        }
        
        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #495057;
          text-decoration: none;
          transition: all 0.2s;
          margin: 5px 10px;
          border-radius: 8px;
          gap: 12px;
        }
        
        .sidebar-item:hover {
          background: #f8f9fa;
          color: #0d6efd;
        }
        
        .sidebar-item.active {
          background: #e9ecef;
          color: #0d6efd;
          font-weight: 500;
        }
        
        .sidebar-footer {
          padding: 10px 0;
          border-top: 1px solid #f0f0f0;
        }
        
        .logout {
          color: #dc3545;
        }
        
        .logout:hover {
          background: #fff5f5;
          color: #dc3545;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sidebar-container {
            position: fixed;
            z-index: 1000;
            left: 0;
            transform: translateX(-100%);
          }
          
          .sidebar-container.visible {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;