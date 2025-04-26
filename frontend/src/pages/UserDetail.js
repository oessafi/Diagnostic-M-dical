import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import AdminNavbar from "../components/AdminNavBar";
import Sidebar from "../components/Sidebar";
import "../styles.css";

const UserDetail = () => {
    const { id } = useParams(); // Assuming you're passing userId in the URL
    const [userData, setUserData] = useState(null); // Store the user data
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(""); // For error state

    const navigate = useNavigate();

    // Fetch user data by ID when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token"); // Or sessionStorage.getItem("token")

            if (!token) {
                setError("Utilisateur non authentifié.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:6060/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Erreur lors du chargement des données de l'utilisateur.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    // Conditional rendering of profile images based on the role
    const getUserProfileImage = (role) => {
        switch(role) {
            case "ADMIN":
                return "/assets/img/icon-admin.png";  // Admin's image
            case "MEDECIN":
                return "/assets/img/doctor.png"; // Medecin's image
            default:
                return "";  // Default user image
        }
    };

    return (
        <>
            <Helmet>
                <title>Profil Utilisateur - MediAi Care</title>
            </Helmet>
            <AdminNavbar />
            <div className="container-fluid" style={{ marginTop: "65px" }}>
                <div className="row">
                    <Sidebar />
                    <div className="col-sm p-3 min-vh-100" style={{ margin: "10px" }}>
                        <div className="card shadow-sm my-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="text-dark">Profil Utilisateur</h5>
                                    <div className="d-flex">
                                        <button
                                            onClick={() => navigate("/manage-users")}
                                            className="btn btn-secondary">Retour à la gestion des utilisateurs
                                        </button>
                                    </div>

                                </div>

                                <div className="row mt-4">
                                    {/* User Photo */}
                                    <div className="col-md-4 text-center">
                                        <img
                                            src={getUserProfileImage(userData.role)}  // Dynamically get the image based on the role
                                            alt="User Profile"
                                            className="img-fluid rounded-circle"
                                            style={{ width: "150px", height: "150px" }}
                                        />
                                    </div>

                                    {/* User Details */}
                                    <div className="col-md-8">
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <h5 className="text-dark">Nom: {userData.firstName} {userData.lastName}</h5>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <h5 className="text-dark">Email: {userData.email}</h5>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <h5 className="text-dark">Rôle: {userData.role.charAt(0) + userData.role.slice(1).toLowerCase()}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetail;
