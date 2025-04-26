import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";
import AdminNavbar from "../components/AdminNavBar";
import Sidebar from "../components/Sidebar";
import "../styles.css";

const AdminDashboard = () => {
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


    return (
      <>
        <Helmet>
          <title>Admin Dashboard - MediAi Care</title>
        </Helmet>
        <AdminNavbar />
        <div className="container-fluid" style={{marginTop:"65px"}}>
            <div className="row">
            <Sidebar />
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
                                    <i className="fas fa-calendar-check fs-2 text-success"></i>
                                </div>
                                <h5 className="text-muted fw-normal mt-0">Arrangements</h5>
                                <h3 className="mt-3 mb-3">36,254</h3>
                            </div>
                        </div>


                        <div className="card shadow-sm mb-4" style={{flex: "0 0 23%", minWidth: "200px"}}>
                            <div className="card-body">
                                <div className="float-end mt-4">
                                    <i className="fas fa-notes-medical fs-2 text-danger"></i>
                                </div>
                                <h5 className="text-muted fw-normal mt-0">Visites Totales</h5>
                                <h3 className="mt-3 mb-3">36,254</h3>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm my-2">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="text-dark">Tableau d'Utilisateur</h5>
                                <Link to="/manage-users" className="btn btn-primary">Voir Plus</Link>
                            </div>
                            <div className="d-flex justify-content-between my-2">
                                <div className="container mt-4">
                                    <div className="row">
                                        <div className="col-12 d-flex justify-content-between align-items-center">
                                            {/* Search Bar */}
                                            <div className="input-group" style={{flex: 1, maxWidth: '30%'}}>
                                                <span className="input-group-text" id="search-addon">
                                                  <i className="fas fa-search"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Recherche Nom"
                                                    aria-label="Search"
                                                    aria-describedby="search-addon"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />

                                            </div>

                                            {/* Select Option */}
                                            <div style={{flex: 0.3}}>
                                            <select
                                                    className="form-select"
                                                    value={selectedRole}
                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                >
                                                    <option value="">Sélectionner Role</option>
                                                    <option value="ADMIN">Admin</option>
                                                    <option value="MEDECIN">Medecin</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col" className="text-secondary">#</th>
                                    <th scope="col" className="text-secondary">Full Name</th>
                                    <th scope="col" className="text-secondary">Email</th>
                                    <th scope="col" className="text-secondary">Role</th>
                                    <th scope="col" className="text-secondary">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.charAt(0) + user.role.slice(1).toLowerCase()}</td>
                                        <td>
                                        <div className="dropdown ms-3">
                                                <button
                                                    className="btn btn-link p-0"
                                                    type="button"
                                                    id="dropdownMenuButton"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fas fa-ellipsis-v text-dark"></i> {/* Black icon */}
                                                </button>
                                            <ul className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="dropdownMenuButton">
                                                <li>
                                                    <Link className="dropdown-item border-bottom"
                                                          to={`/user-details/${user.id}`}>
                                                        <i className="fa-regular fa-eye me-2"></i>Détail
                                                    </Link>
                                                </li>

                                                {/* Delete Option */}
                                                <li>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDelete(user.id);
                                                        }}
                                                    >
                                                        <i className="fa-regular fa-trash-can me-2"></i>Supprimer
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        </td>
                                    </tr>
                                ))}
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

export default AdminDashboard;
