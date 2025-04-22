import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { Card } from 'react-bootstrap';
import { FaRobot, FaUserMd, FaLock, FaBell } from "react-icons/fa";
import "../styles.css";
// Import Helmet for SEO optimization

const Main = () => {
    return (
        <>
            <Helmet>
                <title>Welcome to MediAi Care</title>
            </Helmet>
            <Navbar/>
            <div className="banner-container">
                <img src="/assets/img/banner.jpg" alt="Banner" className="banner-image"/>
                <div className="banner-text">
                    <h1>Welcome to MediAi Care</h1>
                    <p>Votre Santé, Notre Priorité</p>
                    <div className="d-flex justify-content-between">
                        <Link to="/login" className="btn btn-success1 btn-lg mt-3">
                            Commencez Maintenant
                        </Link>
                        <Link to="/login" className="btn btn-blue1 btn-lg mt-3">
                            Prendre un RDV
                        </Link>
                    </div>
                </div>
            </div>
            <section className="text-center py-10 mt-4 mb-4">
                <h2 className="text-2xl font-bold mb-6">Fonctionnalités Clés</h2>
                <div className="container mt-4 mb-4">
                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column p-6 text-center">
                                    <FaRobot className="mx-auto mb-4 icon"/>
                                    <h4 className="font-bold">Chatbot Médical IA</h4>
                                    <div className="mt-auto">
                                        <p className="text-wrap">Pré-diagnostic rapide et efficace.</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-3 mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column p-6 text-center">
                                    <FaUserMd className="icon mx-auto mb-4"/>
                                    <h4 className="font-bold">Consultation avec Médecin</h4>
                                    <div className="mt-auto">
                                        <p className="text-wrap">Messagerie sécurisée pour vos questions.</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-3 mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column p-6 text-center">
                                    <FaLock className="icon mx-auto mb-4"/>
                                    <h4 className="font-bold">Dossier Médical Sécurisé</h4>
                                    <div className="mt-auto">
                                        <p className="text-wrap">Stockage et accès aux données en toute sécurité.</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-3 mb-4">
                            <Card className="h-100">
                                <Card.Body className="d-flex flex-column p-6 text-center">
                                    <FaBell className="icon mx-auto mb-4"/>
                                    <h4 className="font-bold">Suivi & Notifications</h4>
                                    <div className="mt-auto">
                                        <p className="text-wrap">Traitements et rappels personnalisés.</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Main;