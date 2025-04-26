import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; // Assure-toi que ce fichier existe

const PatientNavbar = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Appel API pour récupérer les informations de l'utilisateur
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Requête API vers l'URL avec le port 6060
                    const response = await fetch("http://localhost:6060/public/me", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUserInfo(data);
                    } else {
                        console.error("Erreur lors de la récupération des informations utilisateur:", data);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des informations utilisateur:", error);
                }
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token de connexion
        navigate('/login'); // Rediriger vers la page de connexion
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
            <div className="w-100 d-flex justify-content-between align-items-center px-4">
                {/* Left: Logo */}
                <Link className="navbar-brand" to="/patient-dashboard">
                    <img src="/assets/img/logo.png" alt="Logo" className="navbar-logo" />
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Right: Navigation Links */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* Profile Dropdown */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link d-flex align-items-center"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="/assets/img/medical.png" // Remplace par l'URL de l'image réelle
                                    alt="Profile"
                                    className="rounded-circle me-2"
                                    width="40"
                                    height="40"
                                />
                                <span className="d-lg-flex flex-column gap-1 d-none">
                                    <h6 className="my-0">{userInfo ? userInfo.firstName + ' ' + userInfo.lastName : 'Utilisateur'}</h6>
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default PatientNavbar;
