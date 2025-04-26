import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";
import MedecinNavbar from "../components/MedecinNavBar";
import Sidebar from "../components/Sidebar";
import "../styles.css";

const PatientArrangements = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch authenticated user info
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("token");
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
                        setUserInfo(data);
                        // After getting user info, fetch reports
                        fetchReports(data.id);
                    } else {
                        console.error("Erreur lors de la récupération des informations utilisateur:", data);
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération des informations utilisateur:", error);
                }
            }
        };

        // Fetch reports for the authenticated Medecin
        const fetchReports = async (medecinId) => {
            try {
                const response = await fetch(`http://localhost:6060/api/reports/medecin`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setReports(data);
                } else {
                    console.error("Erreur lors de la récupération des rapports:", data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des rapports:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleDeleteReport = async (reportId) => {
        const token = localStorage.getItem("token"); // Or use sessionStorage

        if (!token) {
            alert("Vous devez être connecté pour effectuer cette action.");
            return;
        }

        // Confirm deletion
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rapport ?")) {
            try {
                // Optional: Show loading state
                setLoading(true);

                // Send the DELETE request to the backend
                const response = await axios.delete(`http://localhost:6060/api/reports/${reportId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // If successful (status 204 No Content)
                if (response.status === 204) {
                    // Update the state to remove the deleted report from the list
                    setReports(prevReports => prevReports.filter(report => report.id !== reportId));
                    alert("Rapport supprimé avec succès.");
                } else {
                    // Handle failure case
                    console.error('Échec de la suppression du rapport:', response);
                    alert("Échec de la suppression du rapport.");
                }
            } catch (error) {
                // Error handling
                console.error("Erreur lors de la suppression du rapport:", error);
                if (error.response && error.response.status === 404) {
                    alert("Rapport non trouvé.");
                } else if (error.response && error.response.status === 401) {
                    alert("Vous n'êtes pas autorisé à supprimer ce rapport.");
                } else {
                    alert("Une erreur est survenue lors de la suppression du rapport.");
                }
            } finally {
                // Optional: Hide loading state
                setLoading(false);
            }
        }
    };



    return (
        <>
            <Helmet>
                <title>Consultations - MediAi Care</title>
            </Helmet>
            <MedecinNavbar />
            <div className="container-fluid" style={{marginTop:"65px"}}>
                <div className="row">
                    <Sidebar />
                    <div className="col-sm p-3 min-vh-100" style={{margin: "10px"}}>
                        <h4 className="mb-4">Rendez-Vous</h4>
                        <div className="card shadow-sm my-2">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="text-dark">Rendez-Vous Pour {userInfo ? userInfo.firstName + " " + userInfo.lastName : "Loading..."}</h5>
                                    <Link to="/add-report" className="btn btn-primary">Ajouter Rendez-Vous</Link>

                                </div>
                                {/*<div className="d-flex justify-content-between my-2">*/}
                                {/*    <div className="container mt-4">*/}
                                {/*        <div className="row">*/}
                                {/*            <div className="col-12 d-flex justify-content-between align-items-center">*/}
                                {/*                /!* Search Bar *!/*/}
                                {/*                <div className="input-group" style={{flex: 1, maxWidth: '30%'}}>*/}
                                {/*                <span className="input-group-text" id="search-addon">*/}
                                {/*                  <i className="fas fa-search"></i>*/}
                                {/*                </span>*/}
                                {/*                    <input*/}
                                {/*                        type="text"*/}
                                {/*                        className="form-control"*/}
                                {/*                        placeholder="Recherche Nom"*/}
                                {/*                        aria-label="Search"*/}
                                {/*                        aria-describedby="search-addon"*/}
                                {/*                        value={searchTerm}*/}
                                {/*                        onChange={(e) => setSearchTerm(e.target.value)}*/}
                                {/*                    />*/}

                                {/*                </div>*/}

                                {/*                /!* Select Option *!/*/}
                                {/*                <div style={{flex: 0.3}}>*/}
                                {/*                    <select*/}
                                {/*                        className="form-select"*/}
                                {/*                        value={selectedRole}*/}
                                {/*                        onChange={(e) => setSelectedRole(e.target.value)}*/}
                                {/*                    >*/}
                                {/*                        <option value="">Sélectionner Role</option>*/}
                                {/*                        <option value="ADMIN">Admin</option>*/}
                                {/*                        <option value="MEDECIN">Medecin</option>*/}
                                {/*                    </select>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*</div>*/}
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col" className="text-secondary">#</th>
                                        <th scope="col" className="text-secondary">Médecin</th>
                                        <th scope="col" className="text-secondary">Date</th>
                                        <th scope="col" className="text-secondary">Durée</th>
                                        <th scope="col" className="text-secondary">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {reports.length > 0 ? (
                                        reports.map((report) => (
                                            <tr key={report.id}>
                                                <td>{report.id}</td>
                                                <td>{report.fileName}</td>
                                                <td>
                                                    <a href={report.fileUrl} target="_blank" rel="noopener noreferrer">
                                                        View Report
                                                    </a>
                                                </td>
                                                <td>
                                                    <div className="dropdown ms-3">
                                                        <button
                                                            className="btn btn-link p-0"
                                                            type="button"
                                                            id={`dropdownMenuButton-${report.id}`} // Unique ID for each user
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fas fa-ellipsis-v text-dark"></i> {/* Black icon */}
                                                        </button>
                                                        <ul
                                                            className="dropdown-menu dropdown-menu-end"
                                                            aria-labelledby={`dropdownMenuButton-${report.id}`}
                                                        >

                                                            {/* View Details Option */}
                                                            <li>
                                                                <Link className="dropdown-item border-bottom"
                                                                      to={`/user-details/${report.id}`}>
                                                                    <i className="fa-regular fa-eye me-2"></i>Détail
                                                                </Link>
                                                            </li>

                                                            {/* Delete Option */}
                                                            <li>
                                                                <a
                                                                    className="dropdown-item"
                                                                    href="#"
                                                                    // onClick={(e) => {
                                                                    //     e.preventDefault();
                                                                    //     handleDelete(report.id);
                                                                    // }}
                                                                >
                                                                    <i className="fa-regular fa-trash-can me-2"></i>Supprimer
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>{new Date(report.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td></td>
                                            <td colSpan="4" className="text-center">No reports found for this Medecin.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientArrangements;
