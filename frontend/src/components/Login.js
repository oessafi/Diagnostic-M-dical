import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';  // 'Link' est retiré ici
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Import du fichier CSS
=======
import {Link, useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';// 'Link' est retiré ici
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Import du fichier CSS
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
>>>>>>> 77b9aa1 (Initial commit)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      // Stockage du token et du refresh token dans le localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userEmail', email);

      // Redirection en fonction du rôle de l'utilisateur
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
      console.error('Erreur lors de la connexion:', error);
      setError('Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-form bg-light p-4 rounded shadow">
        <h2 className="mb-4 text-center">Login</h2>
=======
      <>
        <Helmet>
          <title>Login - MediAi Care</title>
        </Helmet>
        <Navbar/>
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="login-form bg-light p-4 rounded shadow">
        <h4 className="mb-4 text-center">Welcome To</h4>
        <div className="logo-container">
        <img src="/assets/img/logo.png" alt="Logo" className="login-logo" />
        </div>
>>>>>>> 77b9aa1 (Initial commit)
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
<<<<<<< HEAD
          className="btn btn-primary w-100" 
=======
          className="btn btn-primary w-100 mb-3"
>>>>>>> 77b9aa1 (Initial commit)
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
<<<<<<< HEAD
      </div>
    </div>
=======
        <p className="text-center">
          Don't have an account? <Link to="/signup"className="text-decoration-none">Sign Up</Link>
        </p>
      </div>
    </div>
        <Footer/>
        </>
>>>>>>> 77b9aa1 (Initial commit)
  );
};

export default Login;
