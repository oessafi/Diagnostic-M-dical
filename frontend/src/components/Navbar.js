import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; // Ensure this file exists

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
            <div className="w-100 d-flex justify-content-between align-items-center px-4">
                {/* Left: Logo */}
                <Link className="navbar-brand" to="/">
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
                        <li className="nav-item">
                            <Link className="btn btn-danger ms-3" to="/casurgent">Cas D'Urgence</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-primary ms-3" to="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
