import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        // Redirect based on stored role if the token exists
        if (token && role) {
            if (role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (role === 'MEDECIN') {
                navigate('/medecin-dashboard');
            } else if (role === 'PATIENT') {
                navigate('/patient-dashboard');
            }
        }
    }, [navigate]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:6060/auth/signin', {
                email,
                password,
            });

            // Store the token and refresh token in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('role', response.data.role);

            // Redirect based on user role
            const ROLE = response.data.role;
            if (ROLE === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (ROLE === 'MEDECIN') {
                navigate('/medecin-dashboard');
            } else if (ROLE === 'PATIENT') {
                navigate('/patient-dashboard');
            } else {
                setError('Role not recognized.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Login failed. Please check your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - MediAi Care</title>
            </Helmet>
            <Navbar />
            <div className="login-container d-flex justify-content-center align-items-center vh-100">
                <div className="login-form bg-light p-4 rounded shadow">
                    <h4 className="mb-4 text-center">Welcome To MediAi Care</h4>
                    <div className="logo-container">
                        <img src="/assets/img/logo.png" alt="Logo" className="login-logo" />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button
                        className="btn btn-primary w-100 mb-3"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <p className="text-center">
                        Don't have an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
