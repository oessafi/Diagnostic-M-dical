import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import MedecinNavbar from "../components/MedecinNavBar";
import Sidebar from "../components/Sidebar";
import "../styles.css";
import axios from "axios";

const AddReport = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [userRole, setUserRole] = useState(""); // Ajout pour savoir le rôle de l'utilisateur
    const [loading, setLoading] = useState(true); // Pour afficher le loading avant de vérifier

    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:6060/public/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    const roles = response.data.role;
                    if (roles && roles.length > 0) {
                        setUserRole(roles[0].authority); // exemple: "MEDECIN"
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du rôle utilisateur:", error);
                alert('Erreur d\'authentification');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userRole !== 'MEDECIN') {
            alert('Vous devez être un médecin pour ajouter un rapport.');
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Vous devez être connecté pour ajouter un rapport.');
            return;
        }

        if (!name || !file) {
            alert('Le nom du rapport et le fichier sont requis.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:6060/api/reports', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                alert('Rapport ajouté avec succès!');
                navigate('/medecin-dashboard');
            } else {
                alert('Erreur lors de l\'ajout du rapport.');
            }

        } catch (error) {
            console.error('Erreur lors de l\'ajout du rapport:', error);
            if (error.response && error.response.status === 403) {
                alert('Vous devez être un médecin pour ajouter un rapport.');
            } else {
                alert('Erreur serveur, veuillez réessayer.');
            }
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <Helmet>
                <title>Ajouter Rapport - MediAi Care</title>
            </Helmet>
            <MedecinNavbar />
            <div className="container-fluid" style={{ marginTop: "65px" }}>
                <div className="row">
                    <Sidebar />
                    <div className="col-sm p-3 min-vh-100" style={{ margin: "10px" }}>
                        <form onSubmit={handleSubmit}>
                            <div className="card shadow-sm my-4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="text-dark">Ajouter Rapport</h5>
                                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="file" className="form-label">
                                                Rapport
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="file"
                                                onChange={(e) => setFile(e.target.files[0])}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {file && (
                                        <div className="mt-2">
                                            <strong>Fichier sélectionné:</strong> {file.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddReport;
