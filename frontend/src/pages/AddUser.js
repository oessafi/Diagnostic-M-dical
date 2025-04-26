import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from "react-helmet";
import AdminNavbar from "../components/AdminNavBar";
import Sidebar from "../components/Sidebar";
import "../styles.css";

const AddUser = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName:"",
        email: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:6060/auth/signup", formData);
            alert("Utilisateur créé avec succès !");
            navigate("/manage-users");
            // Optionally reset form
            setFormData({ firstName: "",lastName:"", email: "", password: "", role: "" });
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création de l'utilisateur.");
        }
    };
    return (
        <>
            <Helmet>
                <title>Ajouter Utilisateur - MediAi Care</title>
            </Helmet>
            <AdminNavbar />
            <div className="container-fluid" style={{marginTop:"65px"}}>
                <div className="row">
                    <Sidebar />
                    <div className="col-sm p-3 min-vh-100" style={{margin: "10px"}}>
                        <form onSubmit={handleSubmit}>
                            <div className="card shadow-sm my-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="text-dark">Ajouter Utilisateur</h5>
                                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Prénom
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Nom De Famille
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="email" className="form-label">
                                                Adresse Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Second Row (Password & Role) */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="password" className="form-label">
                                                Mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="role" className="form-label">
                                                Rôle
                                            </label>
                                            <select
                                                className="form-select"
                                                id="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Sélectionner un rôle</option>
                                                <option value="ADMIN">Admin</option>
                                                <option value="MEDECIN">Medecin</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;
