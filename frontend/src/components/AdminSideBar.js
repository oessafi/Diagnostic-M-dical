import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of 'a'
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faFile } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
    return (
        <div className="col-sm-auto sticky-top" style={{ backgroundColor: '#313a46' }}>
            <div
                className="d-flex flex-column flex-shrink-0 p-1 mt-4"
                style={{ width: '240px', height: '100vh', backgroundColor: '#313a46' }}
            >
                <hr className="mb-3" />

                {/* Nav Items */}
                <ul className="nav nav-pills flex-column mb-auto" style={{ width: '100%' }}>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/admin-dashboard"
                            className="nav-link link-light fw-bolder"
                            activeClassName="active"
                            aria-current="page"
                        >
                            <FontAwesomeIcon icon={faHome} className="me-2" /> Accueil
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/manage-users" // Replace with your actual route for users
                            className="nav-link link-light fw-bolder"
                            activeClassName="active"
                        >
                            <FontAwesomeIcon icon={faUser} className="me-2" /> Utilisateurs
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink
                            to="/view-reports" // Replace with your actual route for reports
                            className="nav-link link-light fw-bolder"
                            activeClassName="active"
                        >
                            <FontAwesomeIcon icon={faFile} className="me-2" /> Voir Rapports
                        </NavLink>
                    </li>
                    <hr />
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
